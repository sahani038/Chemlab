"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Beaker,
  Trophy,
  Clock,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle,
  BarChart3,
  Activity,
} from "lucide-react"
import Link from "next/link"

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  earned: boolean
  earnedDate?: string
}

interface ExperimentProgress {
  id: string
  name: string
  progress: number
  completed: boolean
  lastAccessed: string
  score?: number
}

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  // Mock user data
  const userStats = {
    experimentsCompleted: 12,
    totalExperiments: 25,
    averageScore: 87,
    timeSpent: 145, // minutes
    streak: 7, // days
    level: 3,
    xp: 2450,
    xpToNext: 550,
  }

  const achievements: Achievement[] = [
    {
      id: "first-experiment",
      name: "First Steps",
      description: "Complete your first experiment",
      icon: <Beaker className="h-6 w-6" />,
      earned: true,
      earnedDate: "2024-01-15",
    },
    {
      id: "safety-expert",
      name: "Safety Expert",
      description: "Complete 5 experiments without safety violations",
      icon: <Trophy className="h-6 w-6" />,
      earned: true,
      earnedDate: "2024-01-20",
    },
    {
      id: "speed-demon",
      name: "Speed Demon",
      description: "Complete an experiment in under 5 minutes",
      icon: <Clock className="h-6 w-6" />,
      earned: false,
    },
    {
      id: "perfectionist",
      name: "Perfectionist",
      description: "Score 100% on 3 experiment quizzes",
      icon: <Target className="h-6 w-6" />,
      earned: true,
      earnedDate: "2024-01-25",
    },
    {
      id: "streak-master",
      name: "Streak Master",
      description: "Maintain a 7-day learning streak",
      icon: <TrendingUp className="h-6 w-6" />,
      earned: true,
      earnedDate: "2024-01-28",
    },
    {
      id: "knowledge-seeker",
      name: "Knowledge Seeker",
      description: "Complete 20 experiments",
      icon: <BookOpen className="h-6 w-6" />,
      earned: false,
    },
  ]

  const recentExperiments: ExperimentProgress[] = [
    {
      id: "elephant-toothpaste",
      name: "Elephant's Toothpaste",
      progress: 100,
      completed: true,
      lastAccessed: "2024-01-28",
      score: 95,
    },
    {
      id: "golden-rain",
      name: "Golden Rain",
      progress: 100,
      completed: true,
      lastAccessed: "2024-01-27",
      score: 88,
    },
    {
      id: "ph-rainbow",
      name: "pH Rainbow",
      progress: 75,
      completed: false,
      lastAccessed: "2024-01-26",
    },
    {
      id: "volcano-reaction",
      name: "Chemical Volcano",
      progress: 100,
      completed: true,
      lastAccessed: "2024-01-25",
      score: 92,
    },
    {
      id: "crystal-garden",
      name: "Crystal Garden",
      progress: 30,
      completed: false,
      lastAccessed: "2024-01-24",
    },
  ]

  const weeklyActivity = [
    { day: "Mon", experiments: 2, time: 45 },
    { day: "Tue", experiments: 1, time: 20 },
    { day: "Wed", experiments: 3, time: 65 },
    { day: "Thu", experiments: 1, time: 15 },
    { day: "Fri", experiments: 2, time: 40 },
    { day: "Sat", experiments: 0, time: 0 },
    { day: "Sun", experiments: 1, time: 25 },
  ]

  const skillProgress = [
    { skill: "Safety Protocols", progress: 95 },
    { skill: "Chemical Reactions", progress: 78 },
    { skill: "Lab Techniques", progress: 82 },
    { skill: "Data Analysis", progress: 65 },
    { skill: "Equipment Usage", progress: 88 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Beaker className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">Chem Lab</span>
            </Link>
            <span className="text-gray-400">|</span>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/lab">
              <Button variant="outline">Virtual Lab</Button>
            </Link>
            <Link href="/experiments">
              <Button variant="outline">Experiments</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Scientist! 👨‍🔬</h1>
          <p className="text-gray-600">Track your progress and continue your chemistry journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Experiments Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.experimentsCompleted}</p>
                  <p className="text-xs text-gray-500">of {userStats.totalExperiments} total</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Beaker className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.averageScore}%</p>
                  <p className="text-xs text-green-600">+5% from last week</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Time Spent</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.timeSpent}m</p>
                  <p className="text-xs text-gray-500">this week</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Learning Streak</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.streak} days</p>
                  <p className="text-xs text-orange-600">Keep it up! 🔥</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <span>Level Progress</span>
            </CardTitle>
            <CardDescription>
              Level {userStats.level} - {userStats.xp} XP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Level {userStats.level + 1}</span>
                <span>{userStats.xpToNext} XP to go</span>
              </div>
              <Progress value={(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experiments">Experiments</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest experiment progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentExperiments.slice(0, 5).map((experiment) => (
                      <div key={experiment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{experiment.name}</h4>
                            {experiment.completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Progress: {experiment.progress}%</span>
                            {experiment.score && <span>Score: {experiment.score}%</span>}
                            <span>{experiment.lastAccessed}</span>
                          </div>
                          <Progress value={experiment.progress} className="h-1 mt-2" />
                        </div>
                        <Link href={`/experiments/${experiment.id}`}>
                          <Button variant="outline" size="sm">
                            {experiment.completed ? "Review" : "Continue"}
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skill Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Skill Development</CardTitle>
                  <CardDescription>Your chemistry skills progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillProgress.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{skill.skill}</span>
                          <span>{skill.progress}%</span>
                        </div>
                        <Progress value={skill.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="experiments" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Experiment Progress</CardTitle>
                  <CardDescription>Track your progress across all experiments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentExperiments.map((experiment) => (
                      <div key={experiment.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">{experiment.name}</h3>
                          <div className="flex items-center space-x-2">
                            {experiment.completed ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            ) : (
                              <Badge variant="outline">In Progress</Badge>
                            )}
                            {experiment.score && <Badge variant="secondary">{experiment.score}%</Badge>}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Progress</span>
                            <span>{experiment.progress}%</span>
                          </div>
                          <Progress value={experiment.progress} className="h-2" />
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Last accessed: {experiment.lastAccessed}</span>
                            <Link href={`/experiments/${experiment.id}`}>
                              <Button variant="outline" size="sm">
                                {experiment.completed ? "Review" : "Continue"}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`${achievement.earned ? "border-yellow-200 bg-yellow-50" : "opacity-60"}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-full ${achievement.earned ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-400"}`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        {achievement.earned ? (
                          <div className="flex items-center space-x-1 text-xs text-green-600">
                            <CheckCircle className="h-3 w-3" />
                            <span>Earned {achievement.earnedDate}</span>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            Not Earned
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Weekly Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Weekly Activity</span>
                  </CardTitle>
                  <CardDescription>Experiments completed and time spent</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyActivity.map((day, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-12 text-sm font-medium">{day.day}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="text-sm">{day.experiments} experiments</div>
                            <div className="text-xs text-gray-500">{day.time}min</div>
                          </div>
                          <div className="flex space-x-1">
                            <Progress value={(day.experiments / 3) * 100} className="h-2 flex-1" />
                            <Progress value={(day.time / 65) * 100} className="h-2 flex-1" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                  <CardDescription>Your learning analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">87%</div>
                      <div className="text-sm text-gray-600">Average Quiz Score</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">12</div>
                        <div className="text-xs text-gray-600">Completed</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">3</div>
                        <div className="text-xs text-gray-600">In Progress</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Completion Rate</span>
                        <span>80%</span>
                      </div>
                      <Progress value={80} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span>Safety Score</span>
                        <span>95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
