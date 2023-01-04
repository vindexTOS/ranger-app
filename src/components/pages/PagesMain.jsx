import React from 'react'
import { Routes, Route } from 'react-router-dom'
import StatsPage from './Stats.page'
function PagesMain() {
  return (
    <Routes>
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  )
}

export default PagesMain
