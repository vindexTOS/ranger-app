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

import statisticsIcon from '../../../../utils/png/workstatistics.png'

function SquatGraph({ squatStatsData }) {
  return (
    <>
      <img className="w-[3rem]" src={statisticsIcon} />
      <h1>SQUAT STATISTICS</h1>
      <ResponsiveContainer
        width="90%"
        height="100%"
        className="border-l-2 border-b-2 border-t-2 rounded-[14px]    bg-[#fcfcfa]  max_sm:mb-10"
      >
        <LineChart
          width={300}
          height={500}
          data={squatStatsData}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 5,
          }}
        >
          <Line
            type="monotone"
            dataKey="Total squats"
            stroke="#8884d8"
            strokeWidth={2}
          />

          <XAxis />

          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>{' '}
    </>
  )
}

export default SquatGraph
