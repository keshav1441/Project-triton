"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Scan, Recycle, Trash2, Upload } from "lucide-react"

const wasteTypes = [
  { type: "Plastic Bottles", count: 12, recyclable: true },
  { type: "Food Waste", count: 8, recyclable: false },
  { type: "Metal Cans", count: 5, recyclable: true },
  { type: "Paper/Cardboard", count: 3, recyclable: true },
]

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const startScanning = async () => {
    setIsScanning(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setIsScanning(false)
    }
  }

  const stopScanning = () => {
    setIsScanning(false)
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setIsScanning(false)
        // Stop camera if running
        if (videoRef.current?.srcObject) {
          const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
          tracks.forEach((track) => track.stop())
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">AI Waste Scanner</h1>
            <p className="text-gray-600">Scan and identify waste across Mumbai beaches</p>
          </div>
        </div>

        <div className="p-6 h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="grid grid-cols-2 gap-6 h-full">
            {/* Camera Interface */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Live Detection</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-white border-2 border-dashed border-gray-300">
                  {isScanning ? (
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded" />
                  ) : uploadedImage ? (
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded waste"
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-gray-500">
                        <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg mb-2">Camera Ready</p>
                        <p className="text-sm opacity-75">Point at waste to detect and classify</p>
                      </div>
                    </div>
                  )}

                  {/* Scanning Overlay */}
                  {isScanning && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-4 border-2 border-blue-500 rounded-lg">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500"></div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        Scanning for waste...
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    {!isScanning ? (
                      <Button onClick={startScanning} className="bg-blue-600 hover:bg-blue-700">
                        <Scan className="h-4 w-4 mr-2" />
                        Start Camera
                      </Button>
                    ) : (
                      <Button
                        onClick={stopScanning}
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Stop Camera
                      </Button>
                    )}

                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>

                  {uploadedImage && (
                    <Button
                      onClick={() => setUploadedImage(null)}
                      variant="outline"
                      className="w-full mt-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Clear Image
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Detection Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trash2 className="h-5 w-5" />
                  <span>Detected Waste</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {wasteTypes.map((waste, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="font-medium text-gray-900">{waste.type}</span>
                      {waste.recyclable && <Recycle className="h-4 w-4 text-green-600" />}
                    </div>
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                      {waste.count}
                    </Badge>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-blue-600 text-white rounded-lg text-center">
                  <div className="text-lg font-medium mb-1">Ocean Hero Status</div>
                  <div className="text-sm opacity-90">You've helped protect 2.3km² of ocean this month!</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
