from fastapi import APIRouter
import pandas as pd
from collections import Counter
from collections import defaultdict
from typing import List, Dict

router = APIRouter()
df = pd.read_csv("suspicious_cases_augmented.csv", parse_dates=["timestamp"])

@router.get("/anomalies/by_type")
def get_anomalies_by_type():
    counts = df["Anomaly_Type"].value_counts()
    color_map = {
        "Suspicious Content": "#f97316",
        "Unusual Access": "#ef4444",
        "Modification": "#84cc16",
        "Duplication": "#3b82f6",
        "Missing Data": "#a855f7"
    }
    result = [{"type": k, "count": v, "color": color_map.get(k, "#ccc")} for k, v in counts.items()]
    return result

@router.get("/anomalies/trend")
def get_anomaly_trend():
    df["date"] = df["timestamp"].dt.to_period("15D").dt.to_timestamp()
    trend = df.groupby("date").size().reset_index(name="anomalies")
    return [{"date": row["date"].strftime("%b %d"), "anomalies": int(row["anomalies"])} for _, row in trend.iterrows()]

@router.get("/anomalies/risk_distribution")
def get_risk_distribution():
    color_map = {
        2: ("Critical", "#ef4444"),
        1: ("High", "#f97316"),
        0: ("Medium", "#facc15"),
        -1: ("Low", "#84cc16")  # fallback if you added -1s
    }
    severity_counts = df["Severity_Label"].value_counts()
    output = []
    for label, count in severity_counts.items():
        name, color = color_map.get(label, ("Unknown", "#ccc"))
        output.append({"name": name, "value": int(count), "color": color})
    return output

def anomaly_source_breakdown(filepath="anomaly_records_og.csv"):
    import pandas as pd
    from collections import defaultdict

    df = pd.read_csv(filepath)

    # Fill missing values
    df.fillna(0, inplace=True)

    def detect_anomalies(row):
        anomalies = []

        if row["Status"] == "Success" and row["Discount"] > 100:
            anomalies.append("Suspicious Discounts")

        if row["Sub_Total"] > 0 and row["Tax"] == 0:
            anomalies.append("Tax Mismatch")

        if row["Final_Total"] == 0 and row["Service_Charge_Amount"] > 0:
            anomalies.append("Service Charge on Complimentary")

        calculated_total = round(row["Sub_Total"] - row["Discount"] + row["Tax"], 2)
        if abs(calculated_total - row["Final_Total"]) > 1:
            anomalies.append("Inconsistent Totals")

        if row["Qty_"] <= 0:
            anomalies.append("Negative/Zero Quantity")

        if "modification_delta" in df.columns and row["modification_delta"] > 0:
            anomalies.append("Manual Modification Detected")

        return anomalies

    # Apply detection
    df["Detected_Anomalies"] = df.apply(detect_anomalies, axis=1)

    # Flatten anomaly sources by Order_Type and anomaly type
    breakdown = defaultdict(lambda: defaultdict(int))

    for _, row in df.iterrows():
        order_type = row.get("Order_Type", "Unknown")
        for anomaly in row["Detected_Anomalies"]:
            breakdown[order_type][anomaly] += 1

    # Format for frontend (list of objects with order_type and anomaly counts)
    result = []
    for order_type, anomaly_counts in breakdown.items():
        entry = {"Order_Type": order_type}
        entry.update(anomaly_counts)
        result.append(entry)

    return result

@router.get("/anomalies/source_breakdown")
def get_source_breakdown():
    return anomaly_source_breakdown()

def load_cleaned_data(filepath="anomaly_records_og.csv"):
    df = pd.read_csv(filepath)

    # Drop rows with NaNs
    df = df.dropna(subset=["amount_from", "amount_to"])

    # Calculate modification delta
    df["modification_delta"] = df["amount_from"] - df["amount_to"]

    return df

@router.get("/anomalies/modification_histogram")
def get_modification_histogram():
    df = load_cleaned_data()
    hist_data = df["modification_delta"].dropna().tolist()
    return {"modification_delta": hist_data}

@router.get("/anomalies/modification_boxplot/{group_by}")
def get_modification_boxplot(group_by: str):
    df = load_cleaned_data()
    
    if group_by not in df.columns:
        return {"error": f"'{group_by}' is not a valid column. Try 'Payment_Type', 'Order_Type', or 'Status'."}
    
    result = defaultdict(list)

    for name, group in df.groupby(group_by):
        clean_values = group["modification_delta"].dropna().tolist()
        if clean_values:
            result[name] = clean_values

    return result

anomaly_data = pd.read_csv("anomaly_records_og.csv")

@router.get("/payments")
def get_payment_breakdown():
    # Fill missing payment types
    anomaly_data["Payment_Type"] = anomaly_data["Payment_Type"].fillna("Unknown")

    # Predefined payment types to include even if count is 0
    payment_types = [
        "Other [Paytm]",
        "CARD",
        "Cash",
        "Other [AMEX]",
        "Due Payment",
        "Other [ZOMATO PAY]",
        "Part Payment",
        "Online"
    ]

    # Assign consistent colors
    color_map = {
        "Other [Paytm]": "hsl(300, 70%, 50%)",
        "CARD": "hsl(30, 70%, 50%)",
        "Cash": "hsl(56, 70%, 50%)",
        "Other [AMEX]": "hsl(0, 70%, 50%)",
        "Due Payment": "hsl(200, 70%, 50%)",
        "Other [ZOMATO PAY]": "hsl(120, 70%, 50%)",
        "Part Payment": "hsl(45, 70%, 50%)",
        "Online": "hsl(270, 70%, 50%)"
    }

    # Count occurrences of each payment type
    payment_counts = anomaly_data["Payment_Type"].value_counts().to_dict()

    # Build output list
    payment_summary = [
        {
            "id": payment_type,
            "label": payment_type,
            "value": payment_counts.get(payment_type, 0),
            "color": color_map.get(payment_type, "hsl(0, 0%, 70%)")
        }
        for payment_type in payment_types
    ]

    return payment_summary

@router.get("/sales-funnel", response_model=List[Dict])
def sales_funnel_data():
    funnel = []

    # Step 1: Orders Placed
    orders_placed = anomaly_data["Order_ID_z"].nunique()
    funnel.append({"id": "Orders Placed", "value": orders_placed, "label": "Orders Placed"})

    # Step 2: Orders Accepted
    accepted = anomaly_data["Accepted_Time_z"].dropna().nunique()
    funnel.append({"id": "Accepted", "value": accepted, "label": "Accepted"})

    # Step 3: Orders Marked Ready
    ready = anomaly_data["Mark_Ready_Time_z"].dropna().nunique()
    funnel.append({"id": "Ready", "value": ready, "label": "Ready"})

    # Step 4: Picked Up
    picked = anomaly_data["Picked_up_Time_z"].dropna().nunique()
    funnel.append({"id": "Picked Up", "value": picked, "label": "Picked Up"})

    # Step 5: Delivered
    delivered = anomaly_data["Delivered_Time_z"].dropna().nunique()
    funnel.append({"id": "Delivered", "value": delivered, "label": "Delivered"})

    # Step 6: Cancelled
    cancelled = anomaly_data["Cancelled_Time_z"].dropna().nunique()
    funnel.append({"id": "Cancelled", "value": cancelled, "label": "Cancelled"})

    return funnel