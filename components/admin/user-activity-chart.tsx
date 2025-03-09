"use client"

import { useState, useEffect } from "react"

export function UserActivityChart() {
  // In a real app, this would be a proper chart library like Chart.js or Recharts
  // For this example, we'll create a simple visual representation

  const [activityData, setActivityData] = useState<number[]>([])

  useEffect(() => {
    // Simulate API call to get activity data
    setTimeout(() => {
      setActivityData([5, 8, 12, 7, 10, 15, 20, 18, 25, 22, 30, 28])
    }, 500)
  }, [])

  const maxValue = Math.max(...activityData, 1)

  return (
    <div className="w-full">
      <div className="flex items-end h-40 gap-1">
        {activityData.map((value, index) => (
          <div
            key={index}
            className="bg-primary rounded-t flex-1"
            style={{
              height: `${(value / maxValue) * 100}%`,
              opacity: 0.7 + (index / activityData.length) * 0.3,
            }}
            title={`Maand ${index + 1}: ${value} activiteiten`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mrt</span>
        <span>Apr</span>
        <span>Mei</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
        <span>Okt</span>
        <span>Nov</span>
        <span>Dec</span>
      </div>
      <div className="text-center mt-2 text-sm text-gray-500">Gebruikersactiviteit per maand</div>
    </div>
  )
}

