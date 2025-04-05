"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ChatWidget } from "@/components/chat-widget"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

// Sample data for demonstration
const sampleData = [
  {
    id: 1,
    date: "2023-05-10",
    customer: "Acme Corp",
    product: "Enterprise License",
    quantity: 5,
    unitPrice: 299.99,
    discount: 0,
    tax: 74.99,
    total: 1574.94,
    status: "Completed",
    anomaly: null,
  },
  {
    id: 2,
    date: "2023-05-11",
    customer: "TechGiant Inc",
    product: "Premium Support",
    quantity: 1,
    unitPrice: 499.99,
    discount: 100,
    tax: 39.99,
    total: 439.98,
    status: "Completed",
    anomaly: {
      type: "discount",
      severity: "medium",
      description: "Unusual discount amount (20%) for this customer tier",
    },
  },
  {
    id: 3,
    date: "2023-05-12",
    customer: "StartUp LLC",
    product: "Basic License",
    quantity: 10,
    unitPrice: 49.99,
    discount: 0,
    tax: 0,
    total: 499.9,
    status: "Completed",
    anomaly: {
      type: "tax",
      severity: "high",
      description: "Missing tax calculation for taxable product",
    },
  },
  {
    id: 4,
    date: "2023-05-12",
    customer: "Global Services",
    product: "Enterprise License",
    quantity: 2,
    unitPrice: 299.99,
    discount: 0,
    tax: 60.0,
    total: 659.98,
    status: "Completed",
    anomaly: null,
  },
  {
    id: 5,
    date: "2023-05-13",
    customer: "TechGiant Inc",
    product: "Premium Support",
    quantity: 1,
    unitPrice: 499.99,
    discount: 0,
    tax: 50.0,
    total: 549.99,
    status: "Completed",
    anomaly: {
      type: "duplicate",
      severity: "low",
      description: "Potential duplicate of transaction #2 with different pricing",
    },
  },
  
]

export function ExcelView() {
  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  const handleNextRow = (currentId: number, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent row selection when clicking the button
    const currentIndex = sampleData.findIndex(row => row.id === currentId)
    const nextIndex = (currentIndex + 1) % sampleData.length
    setSelectedRow(sampleData[nextIndex].id)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-yellow-50 text-yellow-800 border-yellow-200"
      case "medium":
        return "bg-orange-50 text-orange-800 border-orange-200"
      case "high":
        return "bg-red-50 text-red-800 border-red-200"
      default:
        return "bg-transparent"
    }
  }

  const getAnomalyBadge = (type: string) => {
    switch (type) {
      case "discount":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
            Discount
          </Badge>
        )
      case "tax":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
            Tax
          </Badge>
        )
      case "duplicate":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
            Duplicate
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex gap-4">
      <Card className="flex-1 overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Customer</th>
                <th className="px-4 py-3 text-left font-medium">Product</th>
                <th className="px-4 py-3 text-right font-medium">Quantity</th>
                <th className="px-4 py-3 text-right font-medium">Unit Price</th>
                <th className="px-4 py-3 text-right font-medium">Discount</th>
                <th className="px-4 py-3 text-right font-medium">Tax</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Anomaly</th>
                <th className="px-4 py-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row) => (
                <TooltipProvider key={row.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <tr
                        className={`border-b hover:bg-muted/30 cursor-pointer transition-colors ${
                          row.anomaly ? getSeverityColor(row.anomaly.severity) : ""
                        } ${selectedRow === row.id ? "bg-primary/5" : ""}`}
                        onClick={() => setSelectedRow(row.id)}
                      >
                        <td className="px-4 py-3">{row.id}</td>
                        <td className="px-4 py-3">{row.date}</td>
                        <td className="px-4 py-3">{row.customer}</td>
                        <td className="px-4 py-3">{row.product}</td>
                        <td className="px-4 py-3 text-right">{row.quantity}</td>
                        <td className="px-4 py-3 text-right">${row.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right">${row.discount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right">${row.tax.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right">${row.total.toFixed(2)}</td>
                        <td className="px-4 py-3">{row.status}</td>
                        <td className="px-4 py-3">{row.anomaly && getAnomalyBadge(row.anomaly.type)}</td>
                        <td className="px-4 py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => handleNextRow(row.id, e)}
                          >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next row</span>
                          </Button>
                        </td>
                      </tr>
                    </TooltipTrigger>
                    {row.anomaly && (
                      <TooltipContent side="top" className="max-w-sm">
                        <div className="p-1">
                          <p className="font-medium">{row.anomaly.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Click to select this row and ask the AI about this anomaly.
                          </p>
                        </div>
                      </TooltipContent>
                    )}
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

