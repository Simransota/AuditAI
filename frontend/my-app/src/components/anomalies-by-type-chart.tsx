"use client"

import { ResponsivePie } from '@nivo/pie'

const data = [
  {
    id: "SQL Injection",
    label: "SQL Injection",
    value: 35,
    color: "hsl(0, 70%, 50%)"
  },
  {
    id: "XSS",
    label: "Cross-Site Scripting",
    value: 25,
    color: "hsl(120, 70%, 50%)"
  },
  {
    id: "Authentication",
    label: "Authentication Issues",
    value: 20,
    color: "hsl(240, 70%, 50%)"
  },
  {
    id: "Data Exposure",
    label: "Sensitive Data Exposure",
    value: 15,
    color: "hsl(60, 70%, 50%)"
  },
  {
    id: "Other",
    label: "Other Vulnerabilities",
    value: 5,
    color: "hsl(180, 70%, 50%)"
  }
]

export function AnomaliesByTypeChart() {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
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
          itemWidth: 100,
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
  )
}

