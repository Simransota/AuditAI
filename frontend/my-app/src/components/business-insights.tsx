import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  Award,
  RefreshCcw,
  BarChart3,
  AlertCircle,
  Users,
  Filter,
} from "lucide-react"

export function BusinessInsights() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Trend Analysis */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Trend Analysis</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium">Andheri Zone Performance</p>
            <div className="text-2xl font-bold">250 Orders</div>
            <p className="text-xs text-muted-foreground">
              +20% increase in dine-in orders from March 31
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Products</CardTitle>
          <Award className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium">Best Seller: Burger</p>
            <div className="text-2xl font-bold">180 Orders</div>
            <p className="text-xs text-muted-foreground">
              Top selling across 3 outlets
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Return/Cancel Patterns */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cancel Patterns</CardTitle>
          <RefreshCcw className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium">Swiggy Cancellations</p>
            <div className="text-2xl font-bold">12%</div>
            <p className="text-xs text-muted-foreground">
              Main reason: Delayed delivery
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Order Source Analysis */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Order Sources</CardTitle>
          <BarChart3 className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium">Zomato Performance</p>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">
              Revenue: ₹1.2L in April
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Leakage */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue Leakage</CardTitle>
          <AlertCircle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium">Multiple Discount Impact</p>
            <div className="text-2xl font-bold">₹10,000</div>
            <p className="text-xs text-muted-foreground">
              15 orders with combined discounts
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Customer Segmentation */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Customer Insights</CardTitle>
          <Users className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium">Top Customer: Aarav Shah</p>
            <div className="text-2xl font-bold">18 Orders</div>
            <p className="text-xs text-muted-foreground">
              In the last 30 days
            </p>
          </div>
        </CardContent>
      </Card>

      
      
    </div>
  )
} 