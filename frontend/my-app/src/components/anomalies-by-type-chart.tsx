"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

// Sample data for the anomalies by type chart
const data = [
  { type: "Suspicious Content", count: 124, color: "#f97316" },
  { type: "Unusual Access", count: 98, color: "#ef4444" },
  { type: "Modification", count: 76, color: "#84cc16" },
  { type: "Duplication", count: 32, color: "#3b82f6" },
  { type: "Missing Data", count: 17, color: "#a855f7" },
]

export function AnomaliesByTypeChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 100,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" />
        <YAxis type="category" dataKey="type" tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => [`${value} anomalies`, "Count"]} labelFormatter={(value) => `Type: ${value}`} />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

