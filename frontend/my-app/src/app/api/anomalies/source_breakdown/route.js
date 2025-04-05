
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Sample data for location/order type breakdown
    const sourceBreakdown = [
      {
        "Order_Type": "Dine In",
        "Suspicious Discounts": 12,
        "Tax Mismatch": 8,
        "Inconsistent Totals": 5,
        "Service Charge on Complimentary": 3
      },
      {
        "Order_Type": "Takeaway",
        "Suspicious Discounts": 4,
        "Tax Mismatch": 7,
        "Inconsistent Totals": 2,
        "Manual Modification Detected": 6
      },
      {
        "Order_Type": "Delivery",
        "Suspicious Discounts": 2,
        "Tax Mismatch": 3,
        "Inconsistent Totals": 9,
        "Negative/Zero Quantity": 5
      },
      {
        "Order_Type": "Drive Thru",
        "Suspicious Discounts": 3,
        "Tax Mismatch": 4,
        "Inconsistent Totals": 2,
        "Manual Modification Detected": 3
      },
      {
        "Order_Type": "Catering",
        "Suspicious Discounts": 1,
        "Tax Mismatch": 2,
        "Inconsistent Totals": 4,
        "Service Charge on Complimentary": 2
      }
    ];

    return NextResponse.json(sourceBreakdown);
  } catch (error) {
    console.error("Error in anomalies source breakdown API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch anomaly source breakdown data" },
      { status: 500 }
    );
  }
}