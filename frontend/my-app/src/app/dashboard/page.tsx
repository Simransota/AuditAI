import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  Clock,
  FileCheck,
  FileWarning,
  Gauge,
  Brain,
  Upload,
  Search,
  FileText,
  Settings,
  ThumbsUp,
  ThumbsDown,
  Beaker,
  Lightbulb,
  ChevronRight,
} from "lucide-react"
import { AnomalyTable } from "@/components/anomaly-table"
import { UploadedFilesTable } from "@/components/uploaded-files-table"
import { AnomaliesByTypeChart } from "@/components/anomalies-by-type-chart"
import { AnomalyTrendChart } from "@/components/anomaly-trend-chart"
import { RiskDistributionChart } from "@/components/risk-distribution-chart"
import { AnomaliesPerFileChart } from "@/components/anomalies-per-file-chart"
import { RecentAnomaliesFeed } from "@/components/recent-anomalies-feed"
import { InsightsPanel } from "@/components/insights-panel"
import { Sidebar } from "@/components/sidebar"

export default function Dashboard() {
  return (
    <div className="flex">
      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Last updated: April 5, 2025, 2:15 PM</span>
            </div>
          </div>

          {/* High-Level Summary Cards (KPIs) */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Files Audited</CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,583</div>
                <p className="text-xs text-muted-foreground">+2.5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Anomalies Detected</CardTitle>
                <FileWarning className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">347</div>
                <p className="text-xs text-muted-foreground">-1.2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High-Risk Cases</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+5 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Risk Score</CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2/10</div>
                <p className="text-xs text-muted-foreground">-0.3 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Model Confidence</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.7%</div>
                <p className="text-xs text-muted-foreground">+1.2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Upload</CardTitle>
                <Upload className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2:05 PM</div>
                <p className="text-xs text-muted-foreground">Today, April 5, 2025</p>
              </CardContent>
            </Card>
          </div>

          {/* Analytics & Trends Section */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Anomaly Trend</CardTitle>
                <CardDescription>Frequency of anomalies over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px]">
                <AnomalyTrendChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>Severity distribution of detected anomalies</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px]">
                <RiskDistributionChart />
              </CardContent>
            </Card>
          </div>

          {/* Recent Anomalies & Insights */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Anomalies</CardTitle>
                <CardDescription>Latest detected issues</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentAnomaliesFeed />
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1">
                  View all anomalies
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Insights & Recommendations</CardTitle>
                <CardDescription>Generated based on detected patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <InsightsPanel />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

