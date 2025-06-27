"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, Camera, Users, BarChart3, MessageCircle, Trophy, Home, Settings, LogOut } from "lucide-react"

const menuItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/scheduler", label: "Schedule", icon: Calendar },
  { href: "/scan", label: "Scan", icon: Camera },
  { href: "/connect", label: "Connect", icon: Users },
  { href: "/track", label: "Analytics", icon: BarChart3 },
  { href: "/gamify", label: "Rewards", icon: Trophy },
  { href: "/chat", label: "AI Chat", icon: MessageCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Project Triton</h1>
            <p className="text-sm text-gray-400">Beach Conservation</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-left ${
                    isActive
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 mt-2">
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
