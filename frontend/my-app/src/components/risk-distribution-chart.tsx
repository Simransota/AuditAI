"use client"

import { ResponsiveBar } from '@nivo/bar'

const data = [
  {
    risk: "Critical",
    count: 12,
    color: "hsl(0, 70%, 50%)"
  },
  {
    risk: "High",
    count: 25,
    color: "hsl(30, 70%, 50%)"
  },
  {
    risk: "Medium",
    count: 38,
    color: "hsl(60, 70%, 50%)"
  },
  {
    risk: "Low",
    count: 45,
    color: "hsl(120, 70%, 50%)"
  }
]

export function RiskDistributionChart() {
  return (
    <ResponsiveBar
      data={data}
      keys={['count']}
      indexBy="risk"
      margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'red_yellow_green' }}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Risk Level',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Count',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      role="application"
      ariaLabel="Risk Distribution"
      barAriaLabel={function(e) {
        return e.id + ": " + e.formattedValue + " anomalies";
      }}
    />
  )
}

