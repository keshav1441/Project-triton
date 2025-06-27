"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, MapPin, Waves } from "lucide-react"

const events = [
  { id: 1, date: "28", beach: "Versova", volunteers: 45, weather: "sunny" },
  { id: 2, date: "30", beach: "Juhu", volunteers: 62, weather: "sunny" },
  { id: 3, date: "02", beach: "Girgaum", volunteers: 38, weather: "sunny" },
  { id: 4, date: "05", beach: "Dadar", volunteers: 29, weather: "sunny" },
]

const tideData = [
  { beach: "Versova", highTide: "6:30 AM", lowTide: "12:45 PM", status: "optimal" },
  { beach: "Juhu", highTide: "7:15 AM", lowTide: "1:20 PM", status: "good" },
  { beach: "Girgaum", highTide: "6:45 AM", lowTide: "1:00 PM", status: "optimal" },
]

export default function SchedulerPage() {
  const [selectedDate, setSelectedDate] = useState("28")

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Event Scheduler</h1>
            <p className="text-gray-600">AI-optimized cleanup schedules for Mumbai beaches</p>
          </div>
        </div>

        <div className="p-6 h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="grid grid-cols-3 gap-6 h-full">
            {/* Calendar */}
            <div className="col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>December 2024</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {/* Day Headers */}
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-center font-medium text-gray-600 p-3 text-sm">
                        {day}
                      </div>
                    ))}

                    {/* Calendar Days */}
                    {Array.from({ length: 31 }, (_, i) => {
                      const day = i + 1
                      const hasEvent = [28, 30].includes(day) || (day >= 2 && day <= 5)
                      const isSelected = selectedDate === day.toString()

                      return (
                        <div
                          key={day}
                          className={`p-3 text-center cursor-pointer rounded-lg transition-all min-h-[60px] flex flex-col justify-center ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : hasEvent
                                ? "bg-green-100 hover:bg-green-200 text-green-800"
                                : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                          }`}
                          onClick={() => setSelectedDate(day.toString())}
                        >
                          <div className="font-medium">{day}</div>
                          {hasEvent && (
                            <div className="text-xs mt-1">
                              {day === 28
                                ? "Versova"
                                : day === 30
                                  ? "Juhu"
                                  : day === 2
                                    ? "Girgaum"
                                    : day === 5
                                      ? "Dadar"
                                      : "Event"}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Event Details */}
                  {events.find((e) => e.date === selectedDate) && (
                    <Card className="bg-gray-50">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-gray-900 mb-3">
                          {events.find((e) => e.date === selectedDate)?.beach} Beach Cleanup
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{events.find((e) => e.date === selectedDate)?.beach} Beach</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{events.find((e) => e.date === selectedDate)?.volunteers} volunteers</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Join Event</Button>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Tide Conditions */}
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Waves className="h-5 w-5" />
                    <span>Tide Conditions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tideData.map((tide, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{tide.beach}</span>
                        <Badge
                          variant="secondary"
                          className={
                            tide.status === "optimal" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {tide.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>High: {tide.highTide}</div>
                        <div>Low: {tide.lowTide}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
