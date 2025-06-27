"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Medal, Star, Share2, Target, Crown, Award } from "lucide-react"

const leaderboard = [
  { rank: 1, name: "Priya Sharma", beach: "Versova", points: 2450, badge: "Turtle Hero" },
  { rank: 2, name: "Arjun Patel", beach: "Juhu", points: 2380, badge: "Ocean Guardian" },
  { rank: 3, name: "Sneha Reddy", beach: "Girgaum", points: 2290, badge: "Wave Warrior" },
  { rank: 4, name: "Rahul Kumar", beach: "Dadar", points: 2150, badge: "Beach Champion" },
]

const achievements = [
  {
    id: 1,
    name: "Dolphin Defender",
    description: "Clean 5 beaches in one month",
    progress: 80,
    unlocked: false,
    rarity: "rare",
  },
  {
    id: 2,
    name: "Turtle Protector",
    description: "Collect 100kg of waste",
    progress: 100,
    unlocked: true,
    rarity: "common",
  },
  {
    id: 3,
    name: "Jellyfish Guardian",
    description: "Volunteer for 50 hours",
    progress: 65,
    unlocked: false,
    rarity: "uncommon",
  },
]

const challenges = [
  {
    id: 1,
    title: "Girgaum Plastic Sprint",
    description: "Collect 50kg of plastic waste at Girgaum Chowpatty",
    deadline: "3 days left",
    participants: 23,
    reward: "500 points",
    difficulty: "Medium",
  },
  {
    id: 2,
    title: "Versova Weekend Warrior",
    description: "Participate in both Saturday and Sunday cleanups",
    deadline: "2 days left",
    participants: 41,
    reward: "300 points",
    difficulty: "Easy",
  },
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "border-gray-300 bg-gray-50"
    case "uncommon":
      return "border-green-300 bg-green-50"
    case "rare":
      return "border-blue-300 bg-blue-50"
    default:
      return "border-gray-300 bg-gray-50"
  }
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800"
    case "Medium":
      return "bg-yellow-100 text-yellow-800"
    case "Hard":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function GamifyPage() {
  const [activeTab, setActiveTab] = useState("leaderboard")

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Beach Heroes</h1>
            <p className="text-gray-600">Compete, achieve, and make a difference</p>
          </div>
        </div>

        <div className="p-6 h-[calc(100vh-5rem)] overflow-y-auto">
          {/* ── THREE COLUMN LAYOUT ───────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Leaderboard Column */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Trophy className="h-5 w-5" />
                    <span>Top Volunteers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {leaderboard.map((user, index) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 ${
                        index < 3 ? "bg-gray-50" : "hover:bg-gray-50"
                      } transition-colors`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm ${
                            user.rank === 1
                              ? "bg-yellow-100 text-yellow-800"
                              : user.rank === 2
                                ? "bg-gray-100 text-gray-800"
                                : user.rank === 3
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-gray-50 text-gray-600"
                          }`}
                        >
                          {user.rank <= 3 ? (
                            user.rank === 1 ? (
                              <Crown className="h-4 w-4" />
                            ) : user.rank === 2 ? (
                              <Medal className="h-4 w-4" />
                            ) : (
                              <Award className="h-4 w-4" />
                            )
                          ) : (
                            user.rank
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm">{user.name}</h3>
                          <p className="text-xs text-gray-600">{user.beach}</p>
                          <Badge variant="secondary" className="mt-1 bg-gray-100 text-gray-700 text-xs">
                            {user.badge}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-light text-gray-900">{user.points}</div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="text-center">
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Achievement
                </Button>
              </div>
            </div>

            {/* Achievements Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Medal className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Achievements</h2>
              </div>

              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={`border-2 transition-all hover:shadow-sm ${
                      achievement.unlocked ? "border-green-200 bg-green-50" : getRarityColor(achievement.rarity)
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`text-2xl mb-2 ${achievement.unlocked ? "" : "grayscale opacity-50"}`}>
                        {achievement.rarity === "common"
                          ? "🐢"
                          : achievement.rarity === "uncommon"
                            ? "🪼"
                            : achievement.rarity === "rare"
                              ? "🐬"
                              : "🐟"}
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{achievement.name}</h3>
                      <p className="text-xs text-gray-600 mb-3">{achievement.description}</p>

                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-gray-600">{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-1" />
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className={`${
                            achievement.rarity === "common"
                              ? "bg-gray-100 text-gray-700"
                              : achievement.rarity === "uncommon"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                          } capitalize text-xs`}
                        >
                          {achievement.rarity}
                        </Badge>
                        {achievement.unlocked && (
                          <div className="flex items-center text-green-600">
                            <Star className="h-3 w-3 mr-1" />
                            <span className="text-xs font-medium">Unlocked</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Challenges Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Challenges</h2>
              </div>

              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <Card key={challenge.id} className="hover:border-gray-300 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">{challenge.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0">
                      <p className="text-xs text-gray-600">{challenge.description}</p>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">{challenge.deadline}</span>
                        <Badge variant="secondary" className={getDifficultyColor(challenge.difficulty) + " text-xs"}>
                          {challenge.difficulty}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">{challenge.participants} participants</span>
                        <span className="font-medium text-gray-900">{challenge.reward}</span>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm py-2">Join Challenge</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
