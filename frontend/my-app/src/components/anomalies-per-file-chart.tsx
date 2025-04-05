"use client"

import { ResponsiveBar } from '@nivo/bar'

// Sample data for the anomalies per file chart
const data = [
  {
    file: "auth.js",
    anomalies: 15,
    color: "hsl(200, 70%, 50%)"
  },
  {
    file: "api.js",
    anomalies: 12,
    color: "hsl(240, 70%, 50%)"
  },
  {
    file: "database.js",
    anomalies: 10,
    color: "hsl(280, 70%, 50%)"
  },
  {
    file: "users.js",
    anomalies: 8,
    color: "hsl(320, 70%, 50%)"
  },
  {
    file: "config.js",
    anomalies: 5,
    color: "hsl(360, 70%, 50%)"
  }
]

export function AnomaliesPerFileChart() {
  return (
    <ResponsiveBar
      data={data}
      keys={['anomalies']}
      indexBy="file"
      margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
      padding={0.3}
      layout="horizontal"
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'purple_blue' }}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Number of Anomalies',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'File',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      role="application"
      ariaLabel="Anomalies per File"
      barAriaLabel={function(e) {
        return e.id + ": " + e.formattedValue + " anomalies in " + e.indexValue;
      }}
    />
  )
}

