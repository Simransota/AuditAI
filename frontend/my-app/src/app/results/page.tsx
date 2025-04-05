"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExcelView } from "../../components/excel-view"
import { AuditReportView } from "../../components/audit-report-view"
import { FileText, Table, Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ResultsPage() {
  const [view, setView] = useState<"excel" | "report">("excel")

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analysis Results</h1>
          <p className="text-muted-foreground">25 anomalies detected in 4,250 records</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="excel" className="w-full" onValueChange={(value) => setView(value as "excel" | "report")}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
          <TabsTrigger value="excel" className="flex items-center gap-2">
            <Table className="h-4 w-4" />
            Excel View
          </TabsTrigger>
          <TabsTrigger value="report" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Audit Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="excel" className="mt-0">
          <ExcelView />
        </TabsContent>

        <TabsContent value="report" className="mt-0">
          <AuditReportView />
        </TabsContent>
      </Tabs>
    </div>
  )
}

