"use client"

import { useState, useRef, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, AlertTriangle, CheckCircle, Info } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "alert" | "info" | "success"
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm SmartTriton, your AI beach conservation assistant. I can help you with real-time updates, cleanup scheduling, and personalized recommendations. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
    type: "info",
  },
]

const quickActions = [
  { text: "Check tide conditions", icon: "🌊" },
  { text: "Find nearest cleanup event", icon: "📅" },
  { text: "Report waste hotspot", icon: "🗑️" },
  { text: "Weather update for beaches", icon: "🌤️" },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText)
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse.text,
        sender: "bot",
        timestamp: new Date(),
        type: botResponse.type,
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): { text: string; type?: "alert" | "info" | "success" } => {
    const input = userInput.toLowerCase()

    if (input.includes("tide") || input.includes("water")) {
      return {
        text: "Current tide conditions:\n\n• Versova Beach: Low tide at 2:30 PM (optimal for cleanup)\n• Juhu Beach: High tide at 4:15 PM (avoid cleanup)\n• Dadar Beach: Low tide now - perfect timing!\n\nWould you like me to notify you about the next optimal cleanup window?",
        type: "info",
      }
    }

    if (input.includes("weather") || input.includes("rain")) {
      return {
        text: "Weather update for Mumbai beaches:\n\n• Current: Partly cloudy, 28°C\n• Next 6 hours: Light winds, good visibility\n• Tomorrow: 40% chance of rain in the evening\n\nAll morning cleanup events are good to go!",
        type: "info",
      }
    }

    if (input.includes("event") || input.includes("cleanup")) {
      return {
        text: "Upcoming cleanup events near you:\n\n🏖️ **Versova Beach Cleanup**\nTomorrow, 6:00 AM\n45 volunteers registered\n\n🏖️ **Juhu Beach Revival**\nDec 30, 7:00 AM\n62 volunteers registered\n\nWould you like me to register you for any of these events?",
        type: "success",
      }
    }

    return {
      text: "I understand you're interested in beach conservation! Here are some personalized suggestions:\n\n• Next optimal cleanup time: Dadar Beach in 2 hours (low tide)\n• Your impact this month: 23kg waste collected, 12 volunteer hours\n• Recommended action: Join the Versova cleanup tomorrow morning\n\nWhat would you like to know more about?",
      type: "info",
    }
  }

  const handleQuickAction = (action: string) => {
    setInputText(action)
  }

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "info":
        return <Info className="h-4 w-4 text-gray-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">SmartTriton AI</h1>
            <p className="text-gray-600">Your intelligent beach conservation companion</p>
          </div>
        </div>

        <div className="p-6 h-[calc(100vh-10rem)]">
          {/* Chat Messages */}
          <Card className="h-full">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.sender === "bot" && message.type && (
                        <div className="flex items-center space-x-2 mb-2">
                          {getMessageIcon(message.type)}
                          <span className="text-xs font-medium uppercase tracking-wide text-gray-600">
                            {message.type}
                          </span>
                        </div>
                      )}
                      <div className="whitespace-pre-line">{message.text}</div>
                      <div className={`text-xs mt-2 ${message.sender === "user" ? "text-blue-200" : "text-gray-500"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">SmartTriton is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions & Input */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex flex-wrap gap-2 mb-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.text)}
                      className="text-xs bg-white hover:bg-gray-100 border-gray-200"
                    >
                      <span className="mr-1">{action.icon}</span>
                      {action.text}
                    </Button>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask SmartTriton about beach conservation..."
                    className="flex-1 border-gray-200 focus:border-gray-400"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="bg-blue-600 hover:bg-blue-700 w-12 h-10 p-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
