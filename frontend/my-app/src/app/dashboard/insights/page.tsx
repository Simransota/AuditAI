"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InsightsPanel } from "@/components/insights-panel"
import { Lightbulb } from "lucide-react"

export default function InsightsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Insights</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Insights & Recommendations</CardTitle>
          <CardDescription>Generated based on detected patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <InsightsPanel />

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Detailed Analysis
              </h3>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Temporal Pattern Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Anomalies tend to cluster around month-end periods, particularly in financial reports. This suggests
                    potential pressure to meet targets or deadlines affecting data quality.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-1">User Behavior Correlation</h4>
                  <p className="text-sm text-muted-foreground">
                    Files uploaded by the accounting team show 40% fewer anomalies after the implementation of the new
                    validation workflow, indicating successful process improvement.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Risk Mitigation Opportunities</h4>
                  <p className="text-sm text-muted-foreground">
                    Implementing additional validation rules for discount codes could reduce high-risk anomalies by an
                    estimated 35% based on historical pattern analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 