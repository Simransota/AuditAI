from fastapi import APIRouter
import pandas as pd
from collections import Counter

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
