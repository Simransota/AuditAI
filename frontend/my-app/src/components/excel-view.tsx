// "use client"

// import { useState } from "react"
// import { Card } from "@/components/ui/card"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { Badge } from "@/components/ui/badge"
// import { ChatWidget } from "@/components/chat-widget"

// // Restaurant sales data with anomalies
// const salesData = [
//   {
//     "Invoice_No": 1001,
//     "Date": "2024-08-01",
//     "Item_Name": "Butter Naan",
//     "Qty_": 10,
//     "Price": 40,
//     "Sub_Total": 400,
//     "Discount": 0,
//     "Tax": 20,
//     "Final_Total": 420,
//     "Payment_Type": "Cash",
//     "Order_Type": "Dine In",
//     "Detailed_Description": "The Quantity is unusually high for a single item (10 units of Butter Naan), possibly indicating a bulk order without any discount applied, which is uncommon in Dine In settings.",
//     "Crux_Summary": "High quantity without discount for dine-in order.",
//     "Anomaly_Type": "Order Time Anomaly, Discount Fraud",
//     "Severity_Label": "Low"
//   },
//   {
//     "Invoice_No": 1002,
//     "Date": "2024-08-01",
//     "Item_Name": "Paneer Tikka",
//     "Qty_": 2,
//     "Price": 250,
//     "Sub_Total": 500,
//     "Discount": 100,
//     "Tax": 20,
//     "Final_Total": 420,
//     "Payment_Type": "CARD",
//     "Order_Type": "Pick Up",
//     "Detailed_Description": "A flat ₹100 discount applied to a low-volume pickup order seems suspicious, potentially suggesting unauthorized manual discounting.",
//     "Crux_Summary": "Unusually high discount on low-volume pickup order.",
//     "Anomaly_Type": "Suspicious Discount Application",
//     "Severity_Label": "High"
//   },
//   {
//     "Invoice_No": 1003,
//     "Date": "2024-08-02",
//     "Item_Name": "Veg Biryani",
//     "Qty_": 1,
//     "Price": 180,
//     "Sub_Total": 180,
//     "Discount": 0,
//     "Tax": 18,
//     "Final_Total": 198,
//     "Payment_Type": "Cash",
//     "Order_Type": "Delivery",
//     "Detailed_Description": "No service charge or delivery fee recorded for a Delivery order, leading to revenue leakage.",
//     "Crux_Summary": "Missing delivery charges in delivery order.",
//     "Anomaly_Type": "Revenue Leakage, Delivery Time Manipulation",
//     "Severity_Label": "Low"
//   },
//   {
//     "Invoice_No": 1004,
//     "Date": "2024-08-04",
//     "Item_Name": "Dal Makhani",
//     "Qty_": 1,
//     "Price": 220,
//     "Sub_Total": 220,
//     "Discount": 0,
//     "Tax": 11,
//     "Final_Total": 231,
//     "Payment_Type": "UPI",
//     "Order_Type": "Dine In",
//     "Detailed_Description": "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
//     "Crux_Summary": "Repeated high-priced orders without discount/service charges.",
//     "Anomaly_Type": "Suspicious Manual Modification, Price Anomaly",
//     "Severity_Label": "High"
//   },
//   {
//     "Invoice_No": 1005,
//     "Date": "2024-08-05",
//     "Item_Name": "Dal Makhani",
//     "Qty_": 1,
//     "Price": 220,
//     "Sub_Total": 220,
//     "Discount": 0,
//     "Tax": 11,
//     "Final_Total": 231,
//     "Payment_Type": "CARD",
//     "Order_Type": "Dine In",
//     "Detailed_Description": "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
//     "Crux_Summary": "Repeated high-priced orders without discount/service charges.",
//     "Anomaly_Type": "Suspicious Manual Modification, Price Anomaly",
//     "Severity_Label": "Medium"
//   },
//   {
//     "Invoice_No": 1006,
//     "Date": "2024-08-06",
//     "Item_Name": "Dal Makhani",
//     "Qty_": 1,
//     "Price": 220,
//     "Sub_Total": 220,
//     "Discount": 0,
//     "Tax": 11,
//     "Final_Total": 231,
//     "Payment_Type": "UPI",
//     "Order_Type": "Pick Up",
//     "Detailed_Description": "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
//     "Crux_Summary": "Repeated high-priced orders without discount/service charges.",
//     "Anomaly_Type": "Suspicious Manual Modification, Price Anomaly",
//     "Severity_Label": "Medium"
//   },
//   {
//     "Invoice_No": 1007,
//     "Date": "2024-08-07",
//     "Item_Name": "Dal Makhani",
//     "Qty_": 1,
//     "Price": 220,
//     "Sub_Total": 220,
//     "Discount": 0,
//     "Tax": 11,
//     "Final_Total": 231,
//     "Payment_Type": "CARD",
//     "Order_Type": "Dine In",
//     "Detailed_Description": "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
//     "Crux_Summary": "Repeated high-priced orders without discount/service charges.",
//     "Anomaly_Type": "Suspicious Manual Modification, Price Anomaly",
//     "Severity_Label": "Low"
//   },
//   {
//     "Invoice_No": 1008,
//     "Date": "2024-08-08",
//     "Item_Name": "Dal Makhani",
//     "Qty_": 1,
//     "Price": 220,
//     "Sub_Total": 220,
//     "Discount": 0,
//     "Tax": 11,
//     "Final_Total": 231,
//     "Payment_Type": "UPI",
//     "Order_Type": "Dine In",
//     "Detailed_Description": "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
//     "Crux_Summary": "Repeated high-priced orders without discount/service charges.",
//     "Anomaly_Type": "Suspicious Manual Modification, Price Anomaly",
//     "Severity_Label": "High"
//   },
//   {
//     "Invoice_No": 1009,
//     "Date": "2024-08-09",
//     "Item_Name": "Dal Makhani",
//     "Qty_": 1,
//     "Price": 220,
//     "Sub_Total": 220,
//     "Discount": 0,
//     "Tax": 11,
//     "Final_Total": 231,
//     "Payment_Type": "CARD",
//     "Order_Type": "Pick Up",
//     "Detailed_Description": "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
//     "Crux_Summary": "Repeated high-priced orders without discount/service charges.",
//     "Anomaly_Type": "Suspicious Manual Modification, Price Anomaly",
//     "Severity_Label": "Low"
//   },
//   {
//     "Invoice_No": 1010,
//     "Date": "2024-08-10",
//     "Item_Name": "Dal Makhani",
//     "Qty_": 1,
//     "Price": 220,
//     "Sub_Total": 220,
//     "Discount": 0,
//     "Tax": 11,
//     "Final_Total": 231,
//     "Payment_Type": "UPI",
//     "Order_Type": "Dine In",
//     "Detailed_Description": "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
//     "Crux_Summary": "Repeated high-priced orders without discount/service charges.",
//     "Anomaly_Type": "Suspicious Manual Modification, Price Anomaly",
//     "Severity_Label": "Medium"
//   }
// ]

// export function ExcelView() {
//   const [selectedRow, setSelectedRow] = useState<number | null>(null)
  
//   const getSeverityColor = (severity: string) => {
//     switch (severity.toLowerCase()) {
//       case "low": return "bg-yellow-50 text-yellow-800 border-yellow-200"
//       case "medium": return "bg-orange-50 text-orange-800 border-orange-200"
//       case "high": return "bg-red-50 text-red-800 border-red-200"
//       default: return "bg-transparent"
//     }
//   }
  
//   const getAnomalyBadge = (type: string) => {
//     if (type.includes("Discount")) {
//       return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">Discount</Badge>
//     } else if (type.includes("Revenue")) {
//       return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">Revenue</Badge>
//     } else if (type.includes("Price")) {
//       return <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">Price</Badge>
//     } else if (type.includes("Order")) {
//       return <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">Order</Badge>
//     } else {
//       return <Badge variant="outline" className="bg-gray-50 text-gray-800 border-gray-200">Other</Badge>
//     }
//   }

//   return (
//     <div className="flex gap-4">
//       <Card className="flex-1 overflow-hidden border">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-muted/50 border-b">
//                 <th className="px-4 py-3 text-left font-medium">Invoice</th>
//                 <th className="px-4 py-3 text-left font-medium">Date</th>
//                 <th className="px-4 py-3 text-left font-medium">Item</th>
//                 <th className="px-4 py-3 text-right font-medium">Qty</th>
//                 <th className="px-4 py-3 text-right font-medium">Price</th>
//                 <th className="px-4 py-3 text-right font-medium">Subtotal</th>
//                 <th className="px-4 py-3 text-right font-medium">Discount</th>
//                 <th className="px-4 py-3 text-right font-medium">Tax</th>
//                 <th className="px-4 py-3 text-right font-medium">Total</th>
//                 <th className="px-4 py-3 text-left font-medium">Payment</th>
//                 <th className="px-4 py-3 text-left font-medium">Order Type</th>
//                 <th className="px-4 py-3 text-left font-medium">Anomaly</th>
//               </tr>
//             </thead>
//             <tbody>
//               {salesData.map((row) => (
//                 <TooltipProvider key={row.Invoice_No}>
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <tr 
//                         className={`border-b hover:bg-muted/30 cursor-pointer transition-colors ${
//                           getSeverityColor(row.Severity_Label)
//                         } ${selectedRow === row.Invoice_No ? "bg-primary/5" : ""}`}
//                         onClick={() => setSelectedRow(row.Invoice_No)}
//                       >
//                         <td className="px-4 py-3">{row.Invoice_No}</td>
//                         <td className="px-4 py-3">{row.Date}</td>
//                         <td className="px-4 py-3">{row.Item_Name}</td>
//                         <td className="px-4 py-3 text-right">{row.Qty_}</td>
//                         <td className="px-4 py-3 text-right">₹{row.Price}</td>
//                         <td className="px-4 py-3 text-right">₹{row.Sub_Total}</td>
//                         <td className="px-4 py-3 text-right">₹{row.Discount}</td>
//                         <td className="px-4 py-3 text-right">₹{row.Tax}</td>
//                         <td className="px-4 py-3 text-right">₹{row.Final_Total}</td>
//                         <td className="px-4 py-3">{row.Payment_Type}</td>
//                         <td className="px-4 py-3">{row.Order_Type}</td>
//                         <td className="px-4 py-3">
//                           {getAnomalyBadge(row.Anomaly_Type)}
//                         </td>
//                       </tr>
//                     </TooltipTrigger>
//                     <TooltipContent side="top" className="max-w-sm">
//                       <div className="p-1">
//                         <div className="flex items-center gap-2 mb-1">
//                           <span className="font-medium">{row.Crux_Summary}</span>
//                           <Badge variant={row.Severity_Label.toLowerCase() === "high" ? "destructive" : 
//                                          row.Severity_Label.toLowerCase() === "medium" ? "default" : "outline"}>
//                             {row.Severity_Label}
//                           </Badge>
//                         </div>
//                         <p className="text-sm">{row.Detailed_Description}</p>
//                         <p className="text-xs text-muted-foreground mt-1">
//                           Click to select this row and ask the AI about this anomaly.
//                         </p>
//                       </div>
//                     </TooltipContent>
//                   </Tooltip>
//                 </TooltipProvider>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </Card>
      
//       <ChatWidget selectedRowId={selectedRow} />
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ChatWidget } from "@/components/chat-widget"

// Define the type for transaction data
interface TransactionData {
  Invoice_No: number;
  Date: string;
  Item_Name: string;
  Qty_: number;
  Price: number;
  Sub_Total: number;
  Discount: number;
  Tax: number;
  Final_Total: number;
  Payment_Type: string;
  Order_Type: string;
  Detailed_Description: string;
  Crux_Summary: string;
  Anomaly_Type: string;
  Severity_Label: string;
}

export function ExcelView() {
  const [salesData, setSalesData] = useState<TransactionData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [verifiedAnomalies, setVerifiedAnomalies] = useState<number[]>([])

const toggleVerification = (invoiceNo: number) => {
  setVerifiedAnomalies((prev) =>
    prev.includes(invoiceNo)
      ? prev.filter((id) => id !== invoiceNo)
      : [...prev, invoiceNo]
  )
}

const isVerified = (invoiceNo: number) => verifiedAnomalies.includes(invoiceNo)

  useEffect(() => {
    // Fetch data from the existing Flask API endpoint
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:8000/data') 
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        
        const data = await response.json()
        setSalesData(data as TransactionData[])
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setLoading(false)
        console.error("Error fetching data:", err)
      }
    }
    
    fetchData()
  }, [])
  
  const getSeverityColor = (severity: string | undefined) => {
    switch (severity?.toLowerCase()) {
      case "low": return "bg-yellow-50 text-yellow-800 border-yellow-200"
      case "medium": return "bg-orange-50 text-orange-800 border-orange-200"
      case "high": return "bg-red-50 text-red-800 border-red-200"
      default: return "bg-transparent"
    }
  }
  
  const getAnomalyBadge = (type: string | undefined) => {
    if (!type) return null;
    
    if (type.includes("Discount")) {
      return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">Discount</Badge>
    } else if (type.includes("Revenue")) {
      return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">Revenue</Badge>
    } else if (type.includes("Price")) {
      return <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">Price</Badge>
    } else if (type.includes("Order")) {
      return <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">Order</Badge>
    } else {
      return <Badge variant="outline" className="bg-gray-50 text-gray-800 border-gray-200">Other</Badge>
    }
  }

  if (loading) {
    return (
      <Card className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading transaction data...</p>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error loading data: {error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </Card>
    )
  }

  if (salesData.length === 0) {
    return (
      <Card className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No transaction data available</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="flex gap-4">
      <Card className="flex-1 overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="px-4 py-3 text-left font-medium">Invoice</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Item</th>
                <th className="px-4 py-3 text-right font-medium">Qty</th>
                <th className="px-4 py-3 text-right font-medium">Price</th>
                <th className="px-4 py-3 text-right font-medium">Subtotal</th>
                <th className="px-4 py-3 text-right font-medium">Discount</th>
                <th className="px-4 py-3 text-right font-medium">Tax</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
                <th className="px-4 py-3 text-left font-medium">Payment</th>
                <th className="px-4 py-3 text-left font-medium">Order Type</th>
                <th className="px-4 py-3 text-left font-medium">Anomaly</th>
                <th className="px-4 py-3 text-left font-medium">Verified</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((row) => (
                <TooltipProvider key={row.Invoice_No}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                    <tr 
  className={`border-b hover:bg-muted/30 cursor-pointer transition-colors
    ${selectedRow === row.Invoice_No ? "bg-primary/5" : ""}
    ${!isVerified(row.Invoice_No) ? getSeverityColor(row.Severity_Label) : ""}
  `}
  onClick={() => setSelectedRow(row.Invoice_No)}
>

                        <td className="px-4 py-3">{row.Invoice_No}</td>
                        <td className="px-4 py-3">{row.Date}</td>
                        <td className="px-4 py-3">{row.Item_Name}</td>
                        <td className="px-4 py-3 text-right">{row.Qty_}</td>
                        <td className="px-4 py-3 text-right">₹{row.Price}</td>
                        <td className="px-4 py-3 text-right">₹{row.Sub_Total}</td>
                        <td className="px-4 py-3 text-right">₹{row.Discount}</td>
                        <td className="px-4 py-3 text-right">₹{row.Tax}</td>
                        <td className="px-4 py-3 text-right">₹{row.Final_Total}</td>
                        <td className="px-4 py-3">{row.Payment_Type}</td>
                        <td className="px-4 py-3">{row.Order_Type}</td>
                        <td className="px-4 py-3">
                          {getAnomalyBadge(row.Anomaly_Type)}
                        </td>
                        <td className="px-4 py-3">
  <button 
    onClick={(e) => {
      e.stopPropagation()
      toggleVerification(row.Invoice_No)
    }}
    className={`text-xs px-2 py-1 rounded 
      ${isVerified(row.Invoice_No) 
        ? "bg-green-100 text-green-800" 
        : "bg-gray-100 text-gray-700"}`}
  >
    {isVerified(row.Invoice_No) ? "Not Anomaly" : "Mark as Not Anomaly"}
  </button>
</td>

                  
                      </tr>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-sm">
                      <div className="p-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{row.Crux_Summary}</span>
                          <Badge variant={row.Severity_Label?.toLowerCase() === "high" ? "destructive" : 
                                         row.Severity_Label?.toLowerCase() === "medium" ? "default" : "outline"}>
                            {row.Severity_Label}
                          </Badge>
                        </div>
                        <p className="text-sm">{row.Detailed_Description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Click to select this row and ask the AI about this anomaly.
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <ChatWidget selectedRowId={selectedRow} />
    </div>
  )
}