"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, AlertOctagon, ExternalLink } from "lucide-react"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

// Sample data for the anomalies table
const anomalies = [
  {
    id: "ANM-1234",
    filename: "financial_report_q1.pdf",
    row: "223",
    type: "Suspicious Content",
    description: "Unauthorized discount",
    risk: "High",
    confidence: "92%",
    timestamp: "Today, 2:05 PM",
  },
  {
    id: "ANM-1233",
    filename: "employee_data.xlsx",
    row: "89",
    type: "Unusual Access Pattern",
    description: "Off-hours access",
    risk: "Critical",
    confidence: "97%",
    timestamp: "Today, 1:42 PM",
  },
  {
    id: "ANM-1232",
    filename: "server_config.json",
    row: "45",
    type: "Modification",
    description: "Security setting change",
    risk: "Medium",
    confidence: "85%",
    timestamp: "Today, 11:30 AM",
  },
  {
    id: "ANM-1231",
    filename: "customer_database.sql",
    row: "1205",
    type: "Unusual Access Pattern",
    description: "Bulk data export",
    risk: "High",
    confidence: "94%",
    timestamp: "Today, 10:15 AM",
  },
  {
    id: "ANM-1230",
    filename: "api_credentials.env",
    row: "12",
    type: "Suspicious Content",
    description: "Credential exposure",
    risk: "Critical",
    confidence: "99%",
    timestamp: "Yesterday, 4:55 PM",
  },
  {
    id: "ANM-1229",
    filename: "Feb_Orders.csv",
    row: "89",
    type: "Data Discrepancy",
    description: "Tax calculation error",
    risk: "Medium",
    confidence: "88%",
    timestamp: "Yesterday, 3:22 PM",
  },
  {
    id: "ANM-1228",
    filename: "Jan_Sales.csv",
    row: "223",
    type: "Suspicious Content",
    description: "Unauthorized discount",
    risk: "High",
    confidence: "91%",
    timestamp: "Yesterday, 1:15 PM",
  },
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

