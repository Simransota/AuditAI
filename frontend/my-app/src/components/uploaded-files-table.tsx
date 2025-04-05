"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet, FileSearch } from "lucide-react"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

// Sample data for the uploaded files table
const files = [
  {
    id: "FILE-1234",
    name: "financial_report_q1.pdf",
    uploadDate: "Apr 5, 2025",
    uploadTime: "2:05 PM",
    status: "Audited",
    anomaliesCount: 18,
    riskScore: "High",
  },
  {
    id: "FILE-1233",
    name: "employee_data.xlsx",
    uploadDate: "Apr 5, 2025",
    uploadTime: "1:42 PM",
    status: "Audited",
    anomaliesCount: 10,
    riskScore: "Critical",
  },
  {
    id: "FILE-1232",
    name: "server_config.json",
    uploadDate: "Apr 5, 2025",
    uploadTime: "11:30 AM",
    status: "Audited",
    anomaliesCount: 11,
    riskScore: "Medium",
  },
  {
    id: "FILE-1231",
    name: "customer_database.sql",
    uploadDate: "Apr 5, 2025",
    uploadTime: "10:15 AM",
    status: "Audited",
    anomaliesCount: 10,
    riskScore: "High",
  },
  {
    id: "FILE-1230",
    name: "api_credentials.env",
    uploadDate: "Apr 4, 2025",
    uploadTime: "4:55 PM",
    status: "Audited",
    anomaliesCount: 7,
    riskScore: "Critical",
  },
  {
    id: "FILE-1229",
    name: "Feb_Orders.csv",
    uploadDate: "Apr 4, 2025",
    uploadTime: "3:22 PM",
    status: "Audited",
    anomaliesCount: 5,
    riskScore: "Medium",
  },
  {
    id: "FILE-1228",
    name: "Jan_Sales.csv",
    uploadDate: "Apr 4, 2025",
    uploadTime: "1:15 PM",
    status: "Audited",
    anomaliesCount: 8,
    riskScore: "High",
  },
  {
    id: "FILE-1227",
    name: "marketing_campaign.xlsx",
    uploadDate: "Apr 5, 2025",
    uploadTime: "9:30 AM",
    status: "Pending",
    anomaliesCount: 0,
    riskScore: "N/A",
  },
]

export function UploadedFilesTable() {
  // Function to render the appropriate risk badge
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "Critical":
        return <Badge variant="destructive">Critical</Badge>
      case "High":
        return (
          <Badge variant="destructive" className="bg-orange-500 hover:bg-orange-600">
            High
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Medium
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">N/A</Badge>
    }
  }

  // Function to render the status badge
  const getStatusBadge = (status: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined) => {
    switch (status) {
      case "Audited":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Audited
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File Name</TableHead>
          <TableHead>Upload Date & Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Anomalies Found</TableHead>
          <TableHead>Risk Score</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <TableRow key={file.id}>
            <TableCell className="font-medium">{file.name}</TableCell>
            <TableCell>
              {file.uploadDate}, {file.uploadTime}
            </TableCell>
            <TableCell>{getStatusBadge(file.status)}</TableCell>
            <TableCell>{file.anomaliesCount}</TableCell>
            <TableCell>{getRiskBadge(file.riskScore)}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <FileSearch className="h-4 w-4" />
                  <span className="hidden sm:inline">View Audit</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <FileSpreadsheet className="h-4 w-4" />
                  <span className="hidden sm:inline">Excel View</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

