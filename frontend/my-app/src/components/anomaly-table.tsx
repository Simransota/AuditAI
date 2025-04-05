"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, AlertOctagon, ExternalLink } from "lucide-react"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

// Sample data for the anomalies table
const anomalies = [
    {
      id: "ANM-F001",
      filename: "inventory_log_march.csv",
      row: "112",
      type: "Expired Ingredient",
      description: "Chicken breast used 2 days past expiration.",
      risk: "Critical",
      confidence: "98%",
      timestamp: "Today, 9:30 AM"
    },
    {
      id: "ANM-F002",
      filename: "order_data_april.csv",
      row: "45",
      type: "Incorrect Order Value",
      description: "Total amount mismatch in online order.",
      risk: "High",
      confidence: "93%",
      timestamp: "Today, 10:15 AM"
    },
    {
      id: "ANM-F003",
      filename: "supply_chain_log.csv",
      row: "202",
      type: "Contamination Risk",
      description: "Cross-contamination between seafood and dairy.",
      risk: "Critical",
      confidence: "97%",
      timestamp: "Yesterday, 6:00 PM"
    },
    {
      id: "ANM-F004",
      filename: "menu_config.csv",
      row: "31",
      type: "Allergen Mislabel",
      description: "Peanut butter not marked as allergen.",
      risk: "High",
      confidence: "95%",
      timestamp: "Yesterday, 3:45 PM"
    },
    {
      id: "ANM-F005",
      filename: "kitchen_sensor_data.csv",
      row: "88",
      type: "Temperature Anomaly",
      description: "Freezer temperature exceeded safe threshold.",
      risk: "Medium",
      confidence: "89%",
      timestamp: "2 days ago, 7:10 AM"
    },
    {
      id: "ANM-F006",
      filename: "billing_report.csv",
      row: "19",
      type: "Duplicate Entry",
      description: "Same invoice ID recorded twice.",
      risk: "Low",
      confidence: "81%",
      timestamp: "2 days ago, 1:20 PM"
    }
  ]
  
export function AnomalyTable() {
  // Function to render the appropriate risk badge
  const getRiskBadge = (risk: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined) => {
    switch (risk) {
      case "Critical":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertOctagon className="h-3 w-3" />
            Critical
          </Badge>
        )
      case "High":
        return (
          <Badge variant="destructive" className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600">
            <AlertTriangle className="h-3 w-3" />
            High
          </Badge>
        )
      case "Medium":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
          >
            <AlertCircle className="h-3 w-3" />
            Medium
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            {risk}
          </Badge>
        )
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Filename</TableHead>
          <TableHead>Row</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Risk</TableHead>
          <TableHead>Confidence</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {anomalies.map((anomaly) => (
          <TableRow key={anomaly.id}>
            <TableCell className="font-medium">{anomaly.id}</TableCell>
            <TableCell>{anomaly.filename}</TableCell>
            <TableCell>{anomaly.row}</TableCell>
            <TableCell>{anomaly.type}</TableCell>
            <TableCell>{anomaly.description}</TableCell>
            <TableCell>{getRiskBadge(anomaly.risk)}</TableCell>
            <TableCell>{anomaly.confidence}</TableCell>
            <TableCell>{anomaly.timestamp}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" title="View in Excel">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

