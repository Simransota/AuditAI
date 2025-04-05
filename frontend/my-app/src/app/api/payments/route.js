
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real application, you would fetch this data from your database
    // This is sample data that matches the structure expected by the frontend
    const paymentData = [
      { id: "Cash", label: "Cash", value: 35, color: "hsl(56, 70%, 50%)" },
      { id: "Card", label: "Card", value: 25, color: "hsl(30, 70%, 50%)" },
      { id: "UPI", label: "UPI", value: 20, color: "hsl(300, 70%, 50%)" },
      { id: "Online", label: "Online", value: 15, color: "hsl(270, 70%, 50%)" },
      { id: "Other [AMEX]", label: "Other [AMEX]", value: 3, color: "hsl(0, 70%, 50%)" },
      { id: "Other [Paytm]", label: "Other [Paytm]", value: 2, color: "hsl(120, 70%, 50%)" }
    ];

    return NextResponse.json(paymentData);
  } catch (error) {
    console.error("Error in payment API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment data" },
      { status: 500 }
    );
  }
}