import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

function PushupGraph({ pushupStatData }) {
  return (
    <>
      <ResponsiveContainer width="90%" height="80%">
        <LineChart
          width={300}
          height={100}
          data={pushupStatData}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 5,
          }}
        >
          <Line
            type="monotone"
            dataKey="stats"
            stroke="#8884d8"
            strokeWidth={2}
          />
          <XAxis />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>{' '}
      <h1>PUSH UP STATISTICS</h1>
    </>
  )
}

export default PushupGraph
