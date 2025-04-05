"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Sample data for the risk distribution chart
const data = [
  { name: "Critical", value: 42, color: "#ef4444" },
  { name: "High", value: 98, color: "#f97316" },
  { name: "Medium", value: 124, color: "#facc15" },
  { name: "Low", value: 83, color: "#84cc16" },
]

export function RiskDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} anomalies`, "Count"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

