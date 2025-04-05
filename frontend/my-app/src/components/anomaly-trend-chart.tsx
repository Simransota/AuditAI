"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data for the trend chart
const data = [
  { date: "Jan 1", anomalies: 8 },
  { date: "Jan 15", anomalies: 12 },
  { date: "Feb 1", anomalies: 15 },
  { date: "Feb 15", anomalies: 10 },
  { date: "Mar 1", anomalies: 18 },
  { date: "Mar 15", anomalies: 14 },
  { date: "Apr 1", anomalies: 20 },
  { date: "Apr 15", anomalies: 15 },
  { date: "May 1", anomalies: 12 },
]

export function AnomalyTrendChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip formatter={(value) => [`${value} anomalies`, "Count"]} labelFormatter={(value) => `Date: ${value}`} />
        <Line type="monotone" dataKey="anomalies" stroke="#f97316" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

