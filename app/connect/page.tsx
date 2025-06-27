"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, MessageCircle, BookOpen, Award, Calendar, Clock, MapPin } from "lucide-react"

const learningModules = [
  {
    id: 1,
    title: "Waste Segregation Basics",
    progress: 85,
    duration: "15 min",
    difficulty: "Beginner",
  },
  {
    id: 2,
    title: "Ocean Ecology & Marine Life",
    progress: 60,
    duration: "25 min",
    difficulty: "Intermediate",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Versova Beach Cleanup",
    date: "Dec 28, 2024",
    time: "6:00 AM",
    location: "Versova Beach",
    volunteers: 45,
    status: "registered",
  },
  {
    id: 2,
    title: "Juhu Beach Revival",
    date: "Dec 30, 2024",
    time: "7:00 AM",
    location: "Juhu Beach",
    volunteers: 62,
    status: "available",
  },
]

const personalStats = {
  totalHours: 24,
  eventsAttended: 8,
  wasteCollected: "156 kg",
  rank: "Ocean Guardian",
}

export default function ConnectPage() {
  const [activeTab, setActiveTab] = useState("events")

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Community Hub</h1>
            <p className="text-gray-600">Learn, connect, and make a difference together</p>
          </div>
        </div>

        <div className="p-6 h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="grid grid-cols-3 gap-6 h-full">
            {/* Main Content */}
            <div className="col-span-2">
              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
                <Button
                  variant={activeTab === "learning" ? "default" : "ghost"}
                  onClick={() => setActiveTab("learning")}
                  className={`flex-1 ${activeTab === "learning" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Learning
                </Button>
                <Button
                  variant={activeTab === "events" ? "default" : "ghost"}
                  onClick={() => setActiveTab("events")}
                  className={`flex-1 ${activeTab === "events" ? "bg-gray-200 shadow-sm" : "hover:bg-white"}`}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Events
                </Button>
              </div>

              <div className="space-y-4">
                {/* Learning Modules */}
                {activeTab === "learning" &&
                  learningModules.map((module) => (
                    <Card key={module.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">{module.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {module.duration}
                              </span>
                              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                {module.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-light text-gray-900">{module.progress}%</div>
                            <div className="text-sm text-gray-600">Complete</div>
                          </div>
                        </div>
                        <Progress value={module.progress} className="h-2 mb-4" />
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          {module.progress === 100 ? "Review Module" : "Continue Learning"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}

                {/* Events */}
                {activeTab === "events" &&
                  upcomingEvents.map((event) => (
                    <Card key={event.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">{event.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {event.date}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {event.time}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {event.location}
                              </span>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className={
                              event.status === "registered"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-700"
                            }
                          >
                            {event.status === "registered" ? "Registered" : "Available"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            <Users className="h-4 w-4 inline mr-1" />
                            {event.volunteers} volunteers registered
                          </span>
                          <Button
                            className={`${
                              event.status === "registered"
                                ? "bg-gray-400 hover:bg-gray-500"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                            disabled={event.status === "registered"}
                          >
                            {event.status === "registered" ? "Registered" : "Join Event"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Personal Dashboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Your Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-blue-600 text-white rounded-lg">
                    <div className="text-xl font-medium mb-1">{personalStats.rank}</div>
                    <div className="text-sm opacity-90">Current Rank</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-light text-gray-900">{personalStats.totalHours}</div>
                      <div className="text-xs text-gray-600">Hours</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-light text-gray-900">{personalStats.eventsAttended}</div>
                      <div className="text-xs text-gray-600">Events</div>
                    </div>
                  </div>

                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-light text-gray-900">{personalStats.wasteCollected}</div>
                    <div className="text-xs text-gray-600">Waste Collected</div>
                  </div>
                </CardContent>
              </Card>

              {/* Community Groups */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>Community Groups</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Mumbai Beach Warriors</h4>
                        <p className="text-sm text-gray-600">247 members</p>
                      </div>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Join WhatsApp Group</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
