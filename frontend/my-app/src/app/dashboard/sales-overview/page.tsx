"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  Award,
  RefreshCcw,
  BarChart3,
  AlertCircle,
  Users,
  Filter,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { BusinessInsights } from "@/components/business-insights"
import { ResponsiveFunnel } from '@nivo/funnel'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
import { useState, useEffect } from 'react'

// Sales funnel data
const funnelData = [
  {
    id: "Website Visits",
    value: 8000,
    label: "Website Visits"
  },
  {
    id: "Product Views",
    value: 5200,
    label: "Product Views"
  },
  {
    id: "Add to Cart",
    value: 3600,
    label: "Add to Cart"
  },
  {
    id: "Checkout",
    value: 2800,
    label: "Checkout"
  },
  {
    id: "Purchases",
    value: 2450,
    label: "Purchases"
  }
]

// Location data
const locationData = [
  {
    location: "Andheri",
    revenue: 180000,
    orders: 250
  },
  {
    location: "Bandra",
    revenue: 120000,
    orders: 180
  },
  {
    location: "Powai",
    revenue: 110000,
    orders: 150
  },
  {
    location: "Dadar",
    revenue: 90000,
    orders: 120
  },
  {
    location: "Chembur",
    revenue: 70000,
    orders: 100
  }
]

// Monthly sales data
const monthlyData = [
  {
    id: "Revenue",
    data: [
      { x: "Nov", y: 410000 },
      { x: "Dec", y: 380000 },
      { x: "Jan", y: 430000 },
      { x: "Feb", y: 450000 },
      { x: "Mar", y: 490000 },
      { x: "Apr", y: 520000 }
    ]
  },
  {
    id: "Orders",
    data: [
      { x: "Nov", y: 2050 },
      { x: "Dec", y: 1900 },
      { x: "Jan", y: 2100 },
      { x: "Feb", y: 2200 },
      { x: "Mar", y: 2350 },
      { x: "Apr", y: 2450 }
    ]
  }
]

interface AnomalyItem {
  Order_Type: string;
  [key: string]: string | number;
}

interface TransformedAnomalyData {
  location: string;
  revenue: number;
}

interface PaymentData {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface FunnelData {
  id: string;
  value: number;
  label: string;
}

const mockFunnelData = [
  {
    id: "Orders Placed",
    label: "Orders Placed",
    value: 1000
  },
  {
    id: "Orders Accepted",
    label: "Orders Accepted",
    value: 850
  },
  {
    id: "Orders Ready",
    label: "Orders Ready",
    value: 700
  },
  {
    id: "Orders Picked Up",
    label: "Orders Picked Up",
    value: 600
  },
  {
    id: "Orders Delivered",
    label: "Orders Delivered",
    value: 500
  },
  {
    id: "Orders Cancelled",
    label: "Orders Cancelled",
    value: 150
  }
]

export default function SalesOverview() {
  const [period, setPeriod] = useState('month')
  const [anomalyData, setAnomalyData] = useState<TransformedAnomalyData[]>([])
  const [paymentData, setPaymentData] = useState<PaymentData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    Promise.all([
      // Fetch anomaly source breakdown
      fetch('/api/anomalies/source_breakdown')
        .then(res => res.json())
        .then((data: AnomalyItem[]) => {
          const transformedData = data.map(item => ({
            location: item.Order_Type,
            revenue: Object.values(item).reduce((acc: number, val: any) => 
              typeof val === 'number' ? acc + val : acc, 0
            )
          }))
          setAnomalyData(transformedData)
        }),

      // Fetch payment breakdown
      fetch('/api/payments')
        .then(res => res.json())
        .then(data => setPaymentData(data))
    ])
    .catch(err => console.error('Error fetching data:', err))
    .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Page Header */}
      {/* <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Overview</h1>
          <p className="text-muted-foreground">Comprehensive analysis of your business performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Last updated: April 5, 2025, 2:15 PM</span>
        </div>
      </div> */}

      {/* Filter Controls */}
      {/* <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter by:</span>
        </div>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-sm rounded-md ${period === 'week' ? 'bg-primary text-white' : 'bg-secondary'}`}
            onClick={() => setPeriod('week')}
          >
            Week
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${period === 'month' ? 'bg-primary text-white' : 'bg-secondary'}`}
            onClick={() => setPeriod('month')}
          >
            Month
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${period === 'quarter' ? 'bg-primary text-white' : 'bg-secondary'}`}
            onClick={() => setPeriod('quarter')}
          >
            Quarter
          </button>
        </div>
      </div>

      Quick Stats
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹5.2L</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹450</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Order Success Rate</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
            <p className="text-xs text-muted-foreground">-2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div> */}

      {/* Revenue Trend Chart */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>6-month performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveLine
              data={monthlyData}
              margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
              xScale={{ type: 'point' }}
              yScale={{ 
                type: 'linear', 
                min: 'auto', 
                max: 'auto',
              }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Month',
                legendOffset: 36,
                legendPosition: 'middle'
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Value',
                legendOffset: -60,
                legendPosition: 'middle',
                format: (value: number) => 
                  value >= 1000000 
                    ? `₹${value / 1000000}M` 
                    : value >= 1000 
                      ? `₹${value / 1000}K` 
                      : `₹${value}`
              }}
              colors={{ scheme: 'category10' }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              enablePointLabel={false}
              enableGridX={false}
              enableArea={true}
              areaOpacity={0.1}
              useMesh={true}
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 50,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)'
                }
              ]}
            />
          </div>
        </CardContent>
      </Card> */}

      {/* Business Insights Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Detailed Insights</h2>
        </div>
        <BusinessInsights />
      </div>

      {/* Sales Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Funnel</CardTitle>
          <CardDescription>Customer journey conversion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveFunnel
              data={mockFunnelData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              valueFormat=">-.4s"
              colors={{ scheme: 'spectral' }}
              borderWidth={20}
              labelColor={{
                from: 'color',
                modifiers: [['darker', 3]]
              }}
              beforeSeparatorLength={100}
              beforeSeparatorOffset={20}
              afterSeparatorLength={100}
              afterSeparatorOffset={20}
              currentPartSizeExtension={10}
              currentBorderWidth={40}
              motionConfig="wobbly"
            />
          </div>
        </CardContent>
      </Card>

      {/* Additional Analysis Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance by Location</CardTitle>
            <CardDescription>Revenue distribution across zones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveBar
                data={locationData}
                keys={['revenue']}
                indexBy="location"
                margin={{ top: 10, right: 10, bottom: 50, left: 80 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Location',
                  legendPosition: 'middle',
                  legendOffset: 32
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Revenue (₹)',
                  legendPosition: 'middle',
                  legendOffset: -60,
                  format: (value: number) => `₹${value / 1000}K`
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[
                  {
                    dataFrom: 'keys',
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 40,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemOpacity: 1
                        }
                      }
                    ]
                  }
                ]}
                role="application"
                ariaLabel="Performance by Location"
                barAriaLabel={function(data) {
                  return data.value !== null ? `${data.id}: ${data.value} in location: ${data.indexValue}` : undefined;
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution of payment types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsivePie
                data={paymentData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 80,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000'
                        }
                      }
                    ]
                  }
                ]}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}