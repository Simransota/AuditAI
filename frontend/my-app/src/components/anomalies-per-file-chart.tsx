"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Sample data for the anomalies per file chart
const data = [
  {
    name: "financial_report_q1.pdf",
    critical: 2,
    high: 5,
    medium: 8,
    low: 3,
  },
  {
    name: "employee_data.xlsx",
    critical: 1,
    high: 3,
    medium: 4,
    low: 2,
  },
  {
    name: "server_config.json",
    critical: 0,
    high: 2,
    medium: 5,
    low: 4,
  },
  {
    name: "customer_database.sql",
    critical: 3,
    high: 4,
    medium: 2,
    low: 1,
  },
  {
    name: "api_credentials.env",
    critical: 4,
    high: 2,
    medium: 1,
    low: 0,
  },
]

export function AnomaliesPerFileChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 60,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="critical" stackId="a" fill="#ef4444" name="Critical" />
        <Bar dataKey="high" stackId="a" fill="#f97316" name="High" />
        <Bar dataKey="medium" stackId="a" fill="#facc15" name="Medium" />
        <Bar dataKey="low" stackId="a" fill="#84cc16" name="Low" />
      </BarChart>
    </ResponsiveContainer>
  )
}

