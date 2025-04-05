"use client"

import { Lightbulb, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react"

// Sample insights for the insights panel
const insights = [
  {
    id: 1,
    icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
    content: "There's an increase in duplicate discounts in March files.",
  },
  {
    id: 2,
    icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
    content: "High-risk pricing overrides mostly found in Region X.",
  },
  {
    id: 3,
    icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
    content: "Consider reviewing sales team access permissions.",
  },
  {
    id: 4,
    icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
    content: "Anomalies spike during end-of-quarter periods, suggesting deadline pressure may affect data quality.",
  },
]

export function InsightsPanel() {
  return (
    <div className="space-y-4">
      {insights.map((insight) => (
        <div key={insight.id} className="flex gap-3 pb-4 border-b last:border-0 last:pb-0">
          {insight.icon}
          <p className="text-sm">{insight.content}</p>
        </div>
      ))}
    </div>
  )
}

