"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Trash2, Leaf, Download, TrendingUp, BarChart3 } from "lucide-react"

const beachData = [
  { name: "Versova", waste: 2.3, volunteers: 145, status: "excellent" },
  { name: "Juhu", waste: 3.1, volunteers: 198, status: "good" },
  { name: "Dadar", waste: 1.8, volunteers: 89, status: "excellent" },
  { name: "Mahim", waste: 2.7, volunteers: 112, status: "good" },
]

const monthlyStats = {
  wasteCollected: 15.2,
  volunteersActive: 1247,
  co2Saved: 8.7,
  beachesCleaned: 8,
}

const chartData = [
  { month: "Jul", waste: 12.5, volunteers: 980 },
  { month: "Aug", waste: 13.8, volunteers: 1050 },
  { month: "Sep", waste: 14.2, volunteers: 1120 },
  { month: "Oct", waste: 14.9, volunteers: 1180 },
  { month: "Nov", waste: 15.2, volunteers: 1247 },
  { month: "Dec", waste: 16.1, volunteers: 1320 },
]

const wasteTypeData = [
  { type: "Plastic", percentage: 45, color: "bg-red-500" },
  { type: "Organic", percentage: 30, color: "bg-green-500" },
  { type: "Metal", percentage: 15, color: "bg-blue-500" },
  { type: "Paper", percentage: 10, color: "bg-yellow-500" },
]

export default function TrackPage() {
  const [selectedBeach, setSelectedBeach] = useState(null)

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

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Track progress across Mumbai's coastline</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="p-6 h-[calc(100vh-5rem)] overflow-y-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div className="text-3xl font-light text-gray-900 mb-1">{monthlyStats.wasteCollected}T</div>
                <div className="text-gray-600 mb-2">Waste Collected</div>
                <div className="text-sm text-green-600">↑ 23% from last month</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-light text-gray-900 mb-1">{monthlyStats.volunteersActive}</div>
                <div className="text-gray-600 mb-2">Active Volunteers</div>
                <div className="text-sm text-green-600">↑ 15% from last month</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-light text-gray-900 mb-1">{monthlyStats.co2Saved}T</div>
                <div className="text-gray-600 mb-2">CO₂ Saved</div>
                <div className="text-sm text-green-600">↑ 31% from last month</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-3xl font-light text-gray-900 mb-1">{monthlyStats.beachesCleaned}</div>
                <div className="text-gray-600 mb-2">Beaches Active</div>
                <div className="text-sm text-gray-600">All locations covered</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Beach Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Beach Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {beachData.map((beach, index) => (
                    <div
                      key={beach.name}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => setSelectedBeach(beach)}
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">{beach.name} Beach</h4>
                        <div className="text-sm text-gray-600">
                          {beach.waste}T waste • {beach.volunteers} volunteers
                        </div>
                      </div>
                      <Badge variant="secondary" className={getStatusColor(beach.status)}>
                        {beach.status.replace("-", " ")}
                      </Badge>
                    </div>
                  ))}
                </div>

                {selectedBeach && (
                  <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{selectedBeach.name} Beach Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Waste Level:</span>
                        <span className="font-medium ml-2">{selectedBeach.waste}T</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Volunteers:</span>
                        <span className="font-medium ml-2">{selectedBeach.volunteers}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Monthly Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Monthly Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Simple Bar Chart */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Waste Collection (Tons)</h4>
                    <div className="space-y-2">
                      {chartData.map((data, index) => (
                        <div key={data.month} className="flex items-center space-x-3">
                          <span className="text-xs text-gray-600 w-8">{data.month}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(data.waste / 20) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600 w-8">{data.waste}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Volunteers</h4>
                    <div className="space-y-2">
                      {chartData.map((data, index) => (
                        <div key={data.month} className="flex items-center space-x-3">
                          <span className="text-xs text-gray-600 w-8">{data.month}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(data.volunteers / 1500) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600 w-12">{data.volunteers}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Waste Composition */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Waste Composition</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Pie Chart Alternative */}
                  <div className="space-y-3">
                    {wasteTypeData.map((waste, index) => (
                      <div key={waste.type} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">{waste.type}</span>
                          <span className="text-sm text-gray-600">{waste.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`${waste.color} h-3 rounded-full transition-all duration-500`}
                            style={{ width: `${waste.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Plastic waste dominates at 45%</li>
                      <li>• Organic waste shows seasonal variation</li>
                      <li>• Metal recycling rate improved by 12%</li>
                      <li>• Paper waste decreased significantly</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
