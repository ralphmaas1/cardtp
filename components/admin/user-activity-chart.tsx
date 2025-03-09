"use client"

import { useState, useEffect } from "react"
import { getUserActivity } from "@/lib/users"

export function UserActivityChart({ userId }) {
  const [activityData, setActivityData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [period, setPeriod] = useState("year") // 'year' of 'month'

  useEffect(() => {
    async function fetchActivity() {
      setIsLoading(true)
      try {
        const data = await getUserActivity(userId, period)
        setActivityData(data.map((item) => item.count))
      } catch (error) {
        console.error("Error fetching activity:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivity()
  }, [userId, period])

  const maxValue = Math.max(...activityData, 1)

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <div className="flex rounded-md overflow-hidden border">
          <button
            onClick={() => setPeriod("month")}
            className={`px-3 py-1 text-sm ${period === "month" ? "bg-primary text-white" : "bg-white"}`}
          >
            Maand
          </button>
          <button
            onClick={() => setPeriod("year")}
            className={`px-3 py-1 text-sm ${period === "year" ? "bg-primary text-white" : "bg-white"}`}
          >
            Jaar
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="h-40 flex items-center justify-center">
          <p>Activiteit laden...</p>
        </div>
      ) : (
        <>
          <div className="flex items-end h-40 gap-1">
            {activityData.map((value, index) => (
              <div
                key={index}
                className="bg-primary rounded-t flex-1"
                style={{
                  height: `${(value / maxValue) * 100}%`,
                  opacity: 0.7 + (index / activityData.length) * 0.3,
                }}
                title={`${period === "month" ? "Dag" : "Maand"} ${index + 1}: ${value} activiteiten`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {period === "year" ? (
              <>
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
              </>
            ) : (
              <>
                <span>1</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>25</span>
                <span>30</span>
              </>
            )}
          </div>
        </>
      )}
      <div className="text-center mt-2 text-sm text-gray-500">
        Gebruikersactiviteit per {period === "year" ? "maand" : "dag"}
      </div>
    </div>
  )
}

