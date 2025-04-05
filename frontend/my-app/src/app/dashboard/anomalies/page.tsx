"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnomalyTable } from "@/components/anomaly-table"
import { RecentAnomaliesFeed } from "@/components/recent-anomalies-feed"

export default function AnomaliesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Anomalies</h2>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>All Anomalies</CardTitle>
            <CardDescription>Detailed list of all detected anomalies</CardDescription>
          </CardHeader>
          <CardContent>
            <AnomalyTable />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Anomalies</CardTitle>
            <CardDescription>Latest detected issues</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentAnomaliesFeed />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 