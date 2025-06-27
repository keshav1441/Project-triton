"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, Clock, TrendingUp, MapPin, Trash2, Leaf, Target, Bell, Activity } from "lucide-react"

const upcomingEvents = [
  {
    id: 1,
    title: "Versova Beach Cleanup",
    date: "Dec 28",
    time: "6:00 AM",
    volunteers: 45,
    beach: "Versova Beach",
    status: "filling-fast",
  },
  {
    id: 2,
    title: "Juhu Beach Revival",
    date: "Dec 30",
    time: "7:00 AM",
    volunteers: 62,
    beach: "Juhu Beach",
    status: "open",
  },
  {
    id: 3,
    title: "Girgaum Mission",
    date: "Jan 2",
    time: "6:30 AM",
    volunteers: 38,
    beach: "Girgaum",
    status: "open",
  },
]

const recentActivities = [
  { type: "cleanup", message: "Completed Versova cleanup - 23kg waste collected", time: "2 hours ago" },
  { type: "achievement", message: "Unlocked 'Ocean Guardian' badge", time: "5 hours ago" },
  { type: "event", message: "Registered for Juhu Beach Revival", time: "1 day ago" },
  { type: "milestone", message: "Reached 100 volunteer hours milestone", time: "2 days ago" },
]

const quickStats = [
  { label: "Total Waste Collected", value: "15.2T", change: "+23%", icon: Trash2, color: "text-red-600" },
  { label: "Active Volunteers", value: "1,247", change: "+15%", icon: Users, color: "text-blue-600" },
  { label: "CO₂ Saved", value: "8.7T", change: "+31%", icon: Leaf, color: "text-green-600" },
  { label: "Beaches Monitored", value: "8", change: "100%", icon: MapPin, color: "text-purple-600" },
]

const beachStatus = [
  { name: "Versova", status: "excellent", waste: "Low", volunteers: 45, trend: "improving" },
  { name: "Juhu", status: "good", waste: "Medium", volunteers: 62, trend: "stable" },
  { name: "Dadar", status: "excellent", waste: "Low", volunteers: 38, trend: "improving" },
  { name: "Mahim", status: "needs-attention", waste: "High", volunteers: 29, trend: "declining" },
]

export default function HomePage() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-yellow-100 text-yellow-800"
      case "needs-attention":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return "↗️"
      case "declining":
        return "↘️"
      default:
        return "➡️"
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with Mumbai's beaches.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-lg font-mono text-gray-900">{time.toLocaleTimeString()}</div>
                <div className="text-sm text-gray-600">Mumbai Time</div>
              </div>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />3 Alerts
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-5rem)]">
          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {quickStats.map((stat, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Upcoming Events */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {event.date} at {event.time}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {event.beach}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {event.volunteers} volunteers
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant="secondary"
                          className={
                            event.status === "filling-fast"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {event.status === "filling-fast" ? "Filling Fast" : "Open"}
                        </Badge>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Sidebar */}
          <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            {/* Beach Status */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span>Beach Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {beachStatus.map((beach, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{beach.name}</span>
                        <Badge variant="secondary" className={getStatusColor(beach.status)}>
                          {beach.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Waste: {beach.waste}</span>
                        <span>
                          {getTrendIcon(beach.trend)} {beach.volunteers} volunteers
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === "cleanup"
                            ? "bg-green-500"
                            : activity.type === "achievement"
                              ? "bg-yellow-500"
                              : activity.type === "event"
                                ? "bg-blue-500"
                                : "bg-purple-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span>Weekly Goal</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-gray-900">73%</div>
                  <div className="text-sm text-gray-600">of weekly target</div>
                </div>
                <Progress value={73} className="h-3 mb-4" />
                <div className="text-sm text-gray-600 text-center">
                  <p>2.7T more waste to reach weekly goal</p>
                  <p className="text-green-600 mt-1">Great progress! 🌊</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
