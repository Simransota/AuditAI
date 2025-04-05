"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data for the trend chart
const data = [
  { date: "Apr 5", anomalies: 12 },
  { date: "Apr 6", anomalies: 19 },
  { date: "Apr 7", anomalies: 15 },
  { date: "Apr 8", anomalies: 8 },
  { date: "Apr 9", anomalies: 10 },
  { date: "Apr 10", anomalies: 14 },
  { date: "Apr 11", anomalies: 12 },
  { date: "Apr 12", anomalies: 7 },
  { date: "Apr 13", anomalies: 9 },
  { date: "Apr 14", anomalies: 15 },
  { date: "Apr 15", anomalies: 18 },
  { date: "Apr 16", anomalies: 14 },
  { date: "Apr 17", anomalies: 11 },
  { date: "Apr 18", anomalies: 9 },
  { date: "Apr 19", anomalies: 12 },
  { date: "Apr 20", anomalies: 15 },
  { date: "Apr 21", anomalies: 13 },
  { date: "Apr 22", anomalies: 11 },
  { date: "Apr 23", anomalies: 9 },
  { date: "Apr 24", anomalies: 7 },
  { date: "Apr 25", anomalies: 10 },
  { date: "Apr 26", anomalies: 14 },
  { date: "Apr 27", anomalies: 16 },
  { date: "Apr 28", anomalies: 13 },
  { date: "Apr 29", anomalies: 9 },
  { date: "Apr 30", anomalies: 11 },
  { date: "May 1", anomalies: 15 },
  { date: "May 2", anomalies: 17 },
  { date: "May 3", anomalies: 14 },
  { date: "May 4", anomalies: 12 },
]

export function TrendChart() {
  return (
    <div className="h-[300px] w-full">
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
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              // Only show every 5th label to avoid crowding
              const index = data.findIndex((item) => item.date === value)
              return index % 5 === 0 ? value : ""
            }}
          />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="anomalies" stroke="#f97316" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

