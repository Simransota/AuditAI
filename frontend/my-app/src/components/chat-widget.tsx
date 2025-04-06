// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Send, Bot, User, AlertTriangle } from "lucide-react"
// import { Badge } from "@/components/ui/badge"

// interface ChatWidgetProps {
//   selectedRowId: number | null
// }

// interface Message {
//   role: "user" | "assistant"
//   content: string
// }

// // Restaurant sales data with anomalies - just the data we need for the chat
// const anomalyData = [
//   {
//     Invoice_No: 1001,
//     Item_Name: "Butter Naan",
//     Detailed_Description:
//       "The Quantity is unusually high for a single item (10 units of Butter Naan), possibly indicating a bulk order without any discount applied, which is uncommon in Dine In settings.",
//     Crux_Summary: "High quantity without discount for dine-in order.",
//     Anomaly_Type: "Order Time Anomaly, Discount Fraud",
//     Severity_Label: "Low",
//   },
//   {
//     Invoice_No: 1002,
//     Item_Name: "Paneer Tikka",
//     Detailed_Description:
//       "A flat ₹100 discount applied to a low-volume pickup order seems suspicious, potentially suggesting unauthorized manual discounting.",
//     Crux_Summary: "Unusually high discount on low-volume pickup order.",
//     Anomaly_Type: "Suspicious Discount Application",
//     Severity_Label: "High",
//   },
//   {
//     Invoice_No: 1003,
//     Item_Name: "Veg Biryani",
//     Detailed_Description:
//       "No service charge or delivery fee recorded for a Delivery order, leading to revenue leakage.",
//     Crux_Summary: "Missing delivery charges in delivery order.",
//     Anomaly_Type: "Revenue Leakage, Delivery Time Manipulation",
//     Severity_Label: "Low",
//   },
//   {
//     Invoice_No: 1004,
//     Item_Name: "Dal Makhani",
//     Detailed_Description:
//       "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
//     Crux_Summary: "Repeated high-priced orders without discount/service charges.",
//     Anomaly_Type: "Suspicious Manual Modification, Price Anomaly",
//     Severity_Label: "High",
//   },
//   {
//     Invoice_No: 1005,
//     Item_Name: "Dal Makhani",
//     Detailed_Description:
//       "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
//     Crux_Summary: "Repeated high-priced orders without discount/service charges.",
//     Anomaly_Type: "Suspicious Manual Modification, Price Anomaly",
//     Severity_Label: "Medium",
//   },
//   {
//     Invoice_No: 1006,
//     Item_Name: "Dal Makhani",
//     Detailed_Description:
//       "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
//     Crux_Summary: "Repeated high-priced orders without discount/service charges.",
//     Anomaly_Type: "Suspicious Manual Modification, Price Anomaly",
//     Severity_Label: "Medium",
//   },
//   {
//     Invoice_No: 1007,
//     Item_Name: "Dal Makhani",
//     Detailed_Description:
//       "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
//     Crux_Summary: "Repeated high-priced orders without discount/service charges.",
//     Anomaly_Type: "Suspicious Manual Modification, Price Anomaly",
//     Severity_Label: "Low",
//   },
//   {
//     Invoice_No: 1008,
//     Item_Name: "Dal Makhani",
//     Detailed_Description:
//       "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
//     Crux_Summary: "Repeated high-priced orders without discount/service charges.",
//     Anomaly_Type: "Suspicious Manual Modification, Price Anomaly",
//     Severity_Label: "High",
//   },
//   {
//     Invoice_No: 1009,
//     Item_Name: "Dal Makhani",
//     Detailed_Description:
//       "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
//     Crux_Summary: "Repeated high-priced orders without discount/service charges.",
//     Anomaly_Type: "Suspicious Manual Modification, Price Anomaly",
//     Severity_Label: "Low",
//   },
//   {
//     Invoice_No: 1010,
//     Item_Name: "Dal Makhani",
//     Detailed_Description:
//       "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
//     Crux_Summary: "Repeated high-priced orders without discount/service charges.",
//     Anomaly_Type: "Suspicious Manual Modification, Price Anomaly",
//     Severity_Label: "Medium",
//   },
// ]

// export function ChatWidget({ selectedRowId }: ChatWidgetProps) {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: "assistant",
//       content:
//         "Hello! I can help you understand the anomalies in your restaurant sales data. Select a row with an anomaly or ask me a question.",
//     },
//   ])
//   const [input, setInput] = useState("")
//   const [selectedAnomaly, setSelectedAnomaly] = useState<any>(null)

//   // Update selected anomaly when row changes
//   useEffect(() => {
//     if (selectedRowId) {
//       const anomaly = anomalyData.find((a) => a.Invoice_No === selectedRowId)
//       setSelectedAnomaly(anomaly)

//       if (anomaly && messages.length === 1) {
//         // Add a message about the selected anomaly
//         setMessages((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content: `You've selected invoice #${anomaly.Invoice_No} for ${anomaly.Item_Name}. This has a ${anomaly.Severity_Label.toLowerCase()} severity anomaly: ${anomaly.Crux_Summary} What would you like to know about it?`,
//           },
//         ])
//       }
//     }
//   }, [selectedRowId])

//   const handleSend = () => {
//     if (!input.trim()) return

//     // Add user message
//     const userMessage: Message = {
//       role: "user",
//       content: input,
//     }
//     setMessages([...messages, userMessage])
//     setInput("")

//     // Simulate AI response based on the question and selected anomaly
//     setTimeout(() => {
//       let response = ""

//       if (selectedAnomaly) {
//         if (input.toLowerCase().includes("why") || input.toLowerCase().includes("explain")) {
//           response = selectedAnomaly.Detailed_Description
//         } else if (input.toLowerCase().includes("fix") || input.toLowerCase().includes("resolve")) {
//           if (selectedAnomaly.Anomaly_Type.includes("Discount")) {
//             response =
//               "To fix this discount anomaly, you should:\n1. Review your discount policy\n2. Implement approval workflows for discounts over a certain threshold\n3. Train staff on proper discount application procedures\n4. Consider implementing system controls that prevent unauthorized discounts"
//           } else if (selectedAnomaly.Anomaly_Type.includes("Revenue")) {
//             response =
//               "To address this revenue leakage issue:\n1. Update your POS system to automatically add delivery fees\n2. Create a checklist for staff to verify all charges are applied\n3. Conduct regular audits of delivery orders\n4. Consider implementing automated alerts for missing charges"
//           } else if (selectedAnomaly.Anomaly_Type.includes("Price")) {
//             response =
//               "To resolve this pricing anomaly:\n1. Investigate the pattern of identical orders\n2. Check for system issues that might be causing price overrides\n3. Review employee access to price modification features\n4. Implement additional authorization for price changes"
//           } else {
//             response =
//               "To address this anomaly:\n1. Review your policies and procedures\n2. Provide additional training to staff\n3. Implement system controls to prevent similar issues\n4. Conduct regular audits to catch these issues early"
//           }
//         } else if (input.toLowerCase().includes("similar") || input.toLowerCase().includes("pattern")) {
//           if (selectedAnomaly.Item_Name === "Dal Makhani") {
//             response =
//               "I've detected a significant pattern of identical Dal Makhani orders with the same price (₹220), tax (₹11), and total (₹231) across multiple days. This unusual repetition suggests potential manipulation or system issues. There are 7 other similar transactions in the dataset."
//           } else {
//             response =
//               "I don't see many similar anomalies to this one in the current dataset. This appears to be a relatively isolated incident, but it's still worth investigating."
//           }
//         } else {
//           response = `This ${selectedAnomaly.Severity_Label.toLowerCase()} severity anomaly involves ${selectedAnomaly.Item_Name} and is classified as "${selectedAnomaly.Anomaly_Type}". ${selectedAnomaly.Detailed_Description}`
//         }
//       } else if (input.toLowerCase().includes("discount")) {
//         response =
//           "I found 2 discount-related anomalies in your data:\n1. A high severity issue with Paneer Tikka where a ₹100 discount was applied to a low-volume pickup order\n2. A low severity issue with Butter Naan where a high quantity order had no discount applied\n\nWould you like me to explain either of these in more detail?"
//       } else if (input.toLowerCase().includes("dal makhani") || input.toLowerCase().includes("pattern")) {
//         response =
//           "I've identified a concerning pattern with Dal Makhani orders. There are multiple identical transactions with the same price (₹220), tax (₹11), and total (₹231) across different days and payment methods. This repetitive pattern suggests potential price manipulation or system issues that should be investigated."
//       } else if (input.toLowerCase().includes("high severity") || input.toLowerCase().includes("critical")) {
//         response =
//           "There are 3 high severity anomalies in the current dataset:\n1. Invoice #1002: Suspicious discount on Paneer Tikka\n2. Invoice #1004: Price anomaly with Dal Makhani\n3. Invoice #1008: Price anomaly with Dal Makhani\n\nThese should be prioritized for investigation."
//       } else {
//         response =
//           "I've analyzed your restaurant sales data and found several anomalies:\n• Multiple identical Dal Makhani orders with suspicious pricing patterns\n• Unusual discounts that don't align with expected policies\n• Missing delivery charges leading to revenue leakage\n• High quantity orders without appropriate discounts\n\nWould you like me to explain any of these in more detail?"
//       }

//       const assistantMessage: Message = {
//         role: "assistant",
//         content: response,
//       }

//       setMessages((prev) => [...prev, assistantMessage])
//     }, 1000)
//   }

//   const getSuggestions = () => {
//     if (selectedAnomaly) {
//       if (selectedAnomaly.Anomaly_Type.includes("Discount")) {
//         return [
//           "Why was this discount flagged?",
//           "How can we fix this discount issue?",
//           "Are there similar discount anomalies?",
//         ]
//       } else if (selectedAnomaly.Anomaly_Type.includes("Revenue")) {
//         return ["Explain this revenue leakage", "How to prevent revenue loss?", "What's the financial impact?"]
//       } else if (selectedAnomaly.Anomaly_Type.includes("Price")) {
//         return ["Why is this price suspicious?", "Are there similar price patterns?", "How to fix this pricing issue?"]
//       } else {
//         return ["Explain this anomaly in detail", "How to resolve this issue?", "What's the risk level?"]
//       }
//     } else {
//       return ["Summarize all anomalies", "Show highest risk issues", "Explain the Dal Makhani pattern"]
//     }
//   }

//   return (
//     <Card className="w-96 flex flex-col h-[600px] border">
//       <CardHeader className="px-4 py-3 border-b">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-base">AI Assistant</CardTitle>
//           {selectedAnomaly && (
//             <Badge
//               variant={
//                 selectedAnomaly.Severity_Label.toLowerCase() === "high"
//                   ? "destructive"
//                   : selectedAnomaly.Severity_Label.toLowerCase() === "medium"
//                     ? "default"
//                     : "outline"
//               }
//             >
//               {selectedAnomaly.Severity_Label}
//             </Badge>
//           )}
//         </div>
//         {selectedAnomaly && (
//           <div className="flex items-center gap-2 mt-1">
//             <AlertTriangle className="h-4 w-4 text-amber-500" />
//             <p className="text-sm text-muted-foreground">
//               Invoice #{selectedAnomaly.Invoice_No}: {selectedAnomaly.Item_Name}
//             </p>
//           </div>
//         )}
//       </CardHeader>

//       <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message, index) => (
//           <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
//             <div
//               className={`flex gap-2 max-w-[80%] ${
//                 message.role === "assistant"
//                   ? "bg-muted rounded-lg p-3"
//                   : "bg-primary text-primary-foreground rounded-lg p-3"
//               }`}
//             >
//               {message.role === "assistant" && <Bot className="h-5 w-5 mt-0.5 flex-shrink-0" />}
//               <div>
//                 <p className="text-sm whitespace-pre-line">{message.content}</p>
//               </div>
//               {message.role === "user" && <User className="h-5 w-5 mt-0.5 flex-shrink-0" />}
//             </div>
//           </div>
//         ))}
//       </CardContent>

//       <div className="px-4 py-2">
//         <div className="flex flex-wrap gap-2 mb-3">
//           {getSuggestions().map((suggestion, index) => (
//             <Button
//               key={index}
//               variant="outline"
//               size="sm"
//               className="text-xs h-7"
//               onClick={() => {
//                 setInput(suggestion)
//               }}
//             >
//               {suggestion}
//             </Button>
//           ))}
//         </div>
//       </div>

//       <CardFooter className="p-3 pt-0">
//         <div className="flex w-full gap-2">
//           <Input
//             placeholder="Ask about this anomaly..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 handleSend()
//               }
//             }}
//             className="flex-1"
//           />
//           <Button size="icon" onClick={handleSend}>
//             <Send className="h-4 w-4" />
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, AlertTriangle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ChatWidgetProps {
  selectedRowId: number | null
}

interface Message {
  role: "user" | "assistant"
  content: string
  loading?: boolean
}

// Restaurant sales data with anomalies - just the data we need for the chat
const anomalyData = [
  {
    Invoice_No: 1001,
    Item_Name: "Butter Naan",
    Detailed_Description:
      "The Quantity is unusually high for a single item (10 units of Butter Naan), possibly indicating a bulk order without any discount applied, which is uncommon in Dine In settings.",
    Crux_Summary: "High quantity without discount for dine-in order.",
    Anomaly_Type: "Order Time Anomaly, Discount Fraud",
    Severity_Label: "Low",
  },
  {
    Invoice_No: 1002,
    Item_Name: "Paneer Tikka",
    Detailed_Description:
      "A flat ₹100 discount applied to a low-volume pickup order seems suspicious, potentially suggesting unauthorized manual discounting.",
    Crux_Summary: "Unusually high discount on low-volume pickup order.",
    Anomaly_Type: "Suspicious Discount Application",
    Severity_Label: "High",
  },
  {
    Invoice_No: 1003,
    Item_Name: "Veg Biryani",
    Detailed_Description:
      "No service charge or delivery fee recorded for a Delivery order, leading to revenue leakage.",
    Crux_Summary: "Missing delivery charges in delivery order.",
    Anomaly_Type: "Revenue Leakage, Delivery Time Manipulation",
    Severity_Label: "Low",
  },
  {
    Invoice_No: 1004,
    Item_Name: "Dal Makhani",
    Detailed_Description:
      "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
    Crux_Summary: "Repeated high-priced orders without discount/service charges.",
    Anomaly_Type: "Suspicious Manual Modification, Price Anomaly",
    Severity_Label: "High",
  },
  {
    Invoice_No: 1005,
    Item_Name: "Dal Makhani",
    Detailed_Description:
      "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
    Crux_Summary: "Repeated high-priced orders without discount/service charges.",
    Anomaly_Type: "Suspicious Manual Modification, Price Anomaly",
    Severity_Label: "Medium",
  },
  {
    Invoice_No: 1006,
    Item_Name: "Dal Makhani",
    Detailed_Description:
      "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
    Crux_Summary: "Repeated high-priced orders without discount/service charges.",
    Anomaly_Type: "Suspicious Manual Modification, Price Anomaly",
    Severity_Label: "Medium",
  },
  {
    Invoice_No: 1007,
    Item_Name: "Dal Makhani",
    Detailed_Description:
      "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
    Crux_Summary: "Repeated high-priced orders without discount/service charges.",
    Anomaly_Type: "Suspicious Manual Modification, Price Anomaly",
    Severity_Label: "Low",
  },
  {
    Invoice_No: 1008,
    Item_Name: "Dal Makhani",
    Detailed_Description:
      "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
    Crux_Summary: "Repeated high-priced orders without discount/service charges.",
    Anomaly_Type: "Suspicious Manual Modification, Price Anomaly",
    Severity_Label: "High",
  },
  {
    Invoice_No: 1009,
    Item_Name: "Dal Makhani",
    Detailed_Description:
      "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
    Crux_Summary: "Repeated high-priced orders without discount/service charges.",
    Anomaly_Type: "Suspicious Manual Modification, Price Anomaly",
    Severity_Label: "Low",
  },
  {
    Invoice_No: 1010,
    Item_Name: "Dal Makhani",
    Detailed_Description:
      "Flat pricing with no discount or service charge for repeated single-item high-priced entries could indicate manipulation or override.",
    Crux_Summary: "Repeated high-priced orders without discount/service charges.",
    Anomaly_Type: "Suspicious Manual Modification, Price Anomaly",
    Severity_Label: "Medium",
  },
]

export function ChatWidget({ selectedRowId }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I can help you understand the anomalies in your restaurant sales data. Select a row with an anomaly or ask me a question.",
    },
  ])
  const [input, setInput] = useState("")
  const [selectedAnomaly, setSelectedAnomaly] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Update selected anomaly when row changes
  useEffect(() => {
    if (selectedRowId) {
      const anomaly = anomalyData.find((a) => a.Invoice_No === selectedRowId)
      setSelectedAnomaly(anomaly)

      if (anomaly && messages.length === 1) {
        // Add a message about the selected anomaly
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `You've selected invoice #${anomaly.Invoice_No} for ${anomaly.Item_Name}. This has a ${anomaly.Severity_Label.toLowerCase()} severity anomaly: ${anomaly.Crux_Summary} What would you like to know about it?`,
          },
        ])
      }
    }
  }, [selectedRowId])

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    
    // Add loading message
    setIsLoading(true)
    const loadingMessage: Message = {
      role: "assistant",
      content: "",
      loading: true
    }
    setMessages((prev) => [...prev, loadingMessage])
    setInput("")

    try {
      // Prepare the question with context if an anomaly is selected
      let questionWithContext = input
      if (selectedAnomaly) {
        questionWithContext = `[Context: Invoice #${selectedAnomaly.Invoice_No}, Item: ${selectedAnomaly.Item_Name}, 
        Anomaly Type: ${selectedAnomaly.Anomaly_Type}, Severity: ${selectedAnomaly.Severity_Label}] ${input}`
      }

      // Call Flask API endpoint
      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: questionWithContext }),
      })

      // Remove loading message
      setMessages((prev) => prev.filter(msg => !msg.loading))

      if (!response.ok) {
        throw new Error(`API response error: ${response.status}`)
      }

      const data = await response.json()
      
      // Add API response message
      const assistantMessage: Message = {
        role: "assistant",
        content: data.answer,
      }
      setMessages((prev) => [...prev.filter(msg => !msg.loading), assistantMessage])
    } catch (error) {
      console.error("API call failed:", error)
      setMessages((prev) => prev.filter(msg => !msg.loading))
      
      // Fallback to local response logic if API fails
      let response = ""

      if (selectedAnomaly) {
        if (input.toLowerCase().includes("why") || input.toLowerCase().includes("explain")) {
          response = selectedAnomaly.Detailed_Description
        } else if (input.toLowerCase().includes("fix") || input.toLowerCase().includes("resolve")) {
          if (selectedAnomaly.Anomaly_Type.includes("Discount")) {
            response =
              "To fix this discount anomaly, you should:\n1. Review your discount policy\n2. Implement approval workflows for discounts over a certain threshold\n3. Train staff on proper discount application procedures\n4. Consider implementing system controls that prevent unauthorized discounts"
          } else if (selectedAnomaly.Anomaly_Type.includes("Revenue")) {
            response =
              "To address this revenue leakage issue:\n1. Update your POS system to automatically add delivery fees\n2. Create a checklist for staff to verify all charges are applied\n3. Conduct regular audits of delivery orders\n4. Consider implementing automated alerts for missing charges"
          } else if (selectedAnomaly.Anomaly_Type.includes("Price")) {
            response =
              "To resolve this pricing anomaly:\n1. Investigate the pattern of identical orders\n2. Check for system issues that might be causing price overrides\n3. Review employee access to price modification features\n4. Implement additional authorization for price changes"
          } else {
            response =
              "To address this anomaly:\n1. Review your policies and procedures\n2. Provide additional training to staff\n3. Implement system controls to prevent similar issues\n4. Conduct regular audits to catch these issues early"
          }
        } else if (input.toLowerCase().includes("similar") || input.toLowerCase().includes("pattern")) {
          if (selectedAnomaly.Item_Name === "Dal Makhani") {
            response =
              "I've detected a significant pattern of identical Dal Makhani orders with the same price (₹220), tax (₹11), and total (₹231) across multiple days. This unusual repetition suggests potential manipulation or system issues. There are 7 other similar transactions in the dataset."
          } else {
            response =
              "I don't see many similar anomalies to this one in the current dataset. This appears to be a relatively isolated incident, but it's still worth investigating."
          }
        } else {
          response = `This ${selectedAnomaly.Severity_Label.toLowerCase()} severity anomaly involves ${selectedAnomaly.Item_Name} and is classified as "${selectedAnomaly.Anomaly_Type}". ${selectedAnomaly.Detailed_Description}`
        }
      } else if (input.toLowerCase().includes("discount")) {
        response =
          "I found 2 discount-related anomalies in your data:\n1. A high severity issue with Paneer Tikka where a ₹100 discount was applied to a low-volume pickup order\n2. A low severity issue with Butter Naan where a high quantity order had no discount applied\n\nWould you like me to explain either of these in more detail?"
      } else if (input.toLowerCase().includes("dal makhani") || input.toLowerCase().includes("pattern")) {
        response =
          "I've identified a concerning pattern with Dal Makhani orders. There are multiple identical transactions with the same price (₹220), tax (₹11), and total (₹231) across different days and payment methods. This repetitive pattern suggests potential price manipulation or system issues that should be investigated."
      } else if (input.toLowerCase().includes("high severity") || input.toLowerCase().includes("critical")) {
        response =
          "There are 3 high severity anomalies in the current dataset:\n1. Invoice #1002: Suspicious discount on Paneer Tikka\n2. Invoice #1004: Price anomaly with Dal Makhani\n3. Invoice #1008: Price anomaly with Dal Makhani\n\nThese should be prioritized for investigation."
      } else {
        response =
          "I've analyzed your restaurant sales data and found several anomalies:\n• Multiple identical Dal Makhani orders with suspicious pricing patterns\n• Unusual discounts that don't align with expected policies\n• Missing delivery charges leading to revenue leakage\n• High quantity orders without appropriate discounts\n\nWould you like me to explain any of these in more detail?"
      }

      const fallbackMessage: Message = {
        role: "assistant",
        content: response + "\n\n(Fallback response - API connection failed)",
      }

      setMessages((prev) => [...prev.filter(msg => !msg.loading), fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getSuggestions = () => {
    if (selectedAnomaly) {
      if (selectedAnomaly.Anomaly_Type.includes("Discount")) {
        return [
          "Why was this discount flagged?",
          "How can we fix this discount issue?",
          "Are there similar discount anomalies?",
        ]
      } else if (selectedAnomaly.Anomaly_Type.includes("Revenue")) {
        return ["Explain this revenue leakage", "How to prevent revenue loss?", "What's the financial impact?"]
      } else if (selectedAnomaly.Anomaly_Type.includes("Price")) {
        return ["Why is this price suspicious?", "Are there similar price patterns?", "How to fix this pricing issue?"]
      } else {
        return ["Explain this anomaly in detail", "How to resolve this issue?", "What's the risk level?"]
      }
    } else {
      return ["Summarize all anomalies", "Show highest risk issues", "Explain the Dal Makhani pattern"]
    }
  }

  return (
    <Card className="w-96 flex flex-col h-[600px] border">
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">AI Assistant</CardTitle>
          {selectedAnomaly && (
            <Badge
              variant={
                selectedAnomaly.Severity_Label.toLowerCase() === "high"
                  ? "destructive"
                  : selectedAnomaly.Severity_Label.toLowerCase() === "medium"
                    ? "default"
                    : "outline"
              }
            >
              {selectedAnomaly.Severity_Label}
            </Badge>
          )}
        </div>
        {selectedAnomaly && (
          <div className="flex items-center gap-2 mt-1">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <p className="text-sm text-muted-foreground">
              Invoice #{selectedAnomaly.Invoice_No}: {selectedAnomaly.Item_Name}
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
            <div
              className={`flex gap-2 max-w-[80%] ${
                message.role === "assistant"
                  ? "bg-muted rounded-lg p-3"
                  : "bg-primary text-primary-foreground rounded-lg p-3"
              }`}
            >
              {message.role === "assistant" && (
                message.loading ? 
                <Loader2 className="h-5 w-5 mt-0.5 flex-shrink-0 animate-spin" /> :
                <Bot className="h-5 w-5 mt-0.5 flex-shrink-0" />
              )}
              <div>
                {message.loading ? (
                  <p className="text-sm">Thinking...</p>
                ) : (
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                )}
              </div>
              {message.role === "user" && <User className="h-5 w-5 mt-0.5 flex-shrink-0" />}
            </div>
          </div>
        ))}
      </CardContent>

      <div className="px-4 py-2">
        <div className="flex flex-wrap gap-2 mb-3">
          {getSuggestions().map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => {
                setInput(suggestion)
              }}
              disabled={isLoading}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      <CardFooter className="p-3 pt-0">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Ask about this anomaly..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) {
                handleSend()
              }
            }}
            className="flex-1"
            disabled={isLoading}
          />
          <Button size="icon" onClick={handleSend} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}