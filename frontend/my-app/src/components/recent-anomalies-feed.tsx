"use client"
import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, AlertOctagon, ExternalLink } from "lucide-react"

// Sample data for the recent anomalies feed
const recentAnomalies = [
  {
    id: "ANM-1234",
    description: "Row 223 in file 'Jan_Sales.csv' flagged for unauthorized discount",
    risk: "High",
    timestamp: "Today, 2:05 PM",
  },
  {
    id: "ANM-1233",
    description: "Row 89 in file 'Feb_Orders.csv' shows tax discrepancy",
    risk: "Medium",
    timestamp: "Today, 1:42 PM",
  },
  {
    id: "ANM-1232",
    description: "Row 45 in file 'server_config.json' has security setting change",
    risk: "Medium",
    timestamp: "Today, 11:30 AM",
  },
  {
    id: "ANM-1231",
    description: "Row 1205 in file 'customer_database.sql' shows unusual bulk data export",
    risk: "High",
    timestamp: "Today, 10:15 AM",
  },
  {
    id: "ANM-1230",
    description: "Row 12 in file 'api_credentials.env' has potential credential exposure",
    risk: "Critical",
    timestamp: "Yesterday, 4:55 PM",
  },
]

export function RecentAnomaliesFeed() {
  // Function to render the appropriate risk icon
  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "Critical":
        return <AlertOctagon className="h-5 w-5 text-red-500 flex-shrink-0" />
      case "High":
        return <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0" />
      case "Medium":
        return <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
    }
  }

  return (
    <div className="space-y-4">
      {recentAnomalies.map((anomaly) => (
        <div key={anomaly.id} className="flex gap-3 pb-4 border-b last:border-0 last:pb-0">
          {getRiskIcon(anomaly.risk)}
          <div className="flex-1 space-y-1">
            <p className="text-sm">{anomaly.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{anomaly.timestamp}</span>
              <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                <ExternalLink className="h-3 w-3" />
                Go to Excel View
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

