"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnomaliesByTypeChart } from "@/components/anomalies-by-type-chart"
import { AnomalyTrendChart } from "@/components/anomaly-trend-chart"
import { RiskDistributionChart } from "@/components/risk-distribution-chart"
import { AnomaliesPerFileChart } from "@/components/anomalies-per-file-chart"

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Anomalies by Type</CardTitle>
            <CardDescription>Distribution of anomalies by category</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <AnomaliesByTypeChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Anomaly Trend</CardTitle>
            <CardDescription>Frequency of anomalies over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <AnomalyTrendChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Severity Distribution</CardTitle>
            <CardDescription>Breakdown of anomalies by risk level</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <RiskDistributionChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Anomalies per File</CardTitle>
            <CardDescription>Number of anomalies detected in each file</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <AnomaliesPerFileChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 