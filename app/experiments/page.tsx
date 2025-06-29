"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Beaker, Clock, Users, Star, Search, Play, BookOpen, Award } from "lucide-react"
import Link from "next/link"

interface Experiment {
  id: string
  name: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  category: string
  rating: number
  participants: number
  materials: string[]
  learningObjectives: string[]
  safetyLevel: "Low" | "Medium" | "High"
  featured: boolean
}

export default function ExperimentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const experiments: Experiment[] = [
    {
      id: "golden-rain",
      name: "Golden Rain",
      description: "Create beautiful golden crystals through a precipitation reaction using lead iodide formation.",
      difficulty: "Intermediate",
      duration: "15 min",
      category: "Precipitation",
      rating: 4.8,
      participants: 1250,
      materials: ["Lead Nitrate", "Potassium Iodide", "Distilled Water", "Beakers"],
      learningObjectives: ["Precipitation reactions", "Crystal formation", "Chemical equations"],
      safetyLevel: "High",
      featured: true,
    },
    {
      id: "elephant-toothpaste",
      name: "Elephant's Toothpaste",
      description: "Spectacular foam eruption using hydrogen peroxide catalysis with potassium iodide.",
      difficulty: "Beginner",
      duration: "10 min",
      category: "Catalysis",
      rating: 4.9,
      participants: 2100,
      materials: ["Hydrogen Peroxide", "Potassium Iodide", "Dish Soap", "Food Coloring"],
      learningObjectives: ["Catalysis", "Decomposition reactions", "Reaction rates"],
      safetyLevel: "Medium",
      featured: true,
    },
    {
      id: "ph-rainbow",
      name: "pH Rainbow",
      description: "Create a colorful spectrum using various pH indicators and solutions.",
      difficulty: "Beginner",
      duration: "12 min",
      category: "Acid-Base",
      rating: 4.6,
      participants: 890,
      materials: ["Universal Indicator", "Various Solutions", "Test Tubes", "pH Buffer"],
      learningObjectives: ["pH scale", "Indicators", "Acid-base chemistry"],
      safetyLevel: "Low",
      featured: false,
    },
    {
      id: "volcano-reaction",
      name: "Chemical Volcano",
      description: "Simulate a volcanic eruption using acid-base reactions with dramatic visual effects.",
      difficulty: "Intermediate",
      duration: "20 min",
      category: "Acid-Base",
      rating: 4.7,
      participants: 1450,
      materials: ["Sodium Bicarbonate", "Acetic Acid", "Food Coloring", "Modeling Clay"],
      learningObjectives: ["Gas evolution", "Acid-base reactions", "Chemical energy"],
      safetyLevel: "Medium",
      featured: true,
    },
    {
      id: "crystal-garden",
      name: "Crystal Garden",
      description: "Grow beautiful crystals using supersaturated solutions and nucleation techniques.",
      difficulty: "Advanced",
      duration: "45 min",
      category: "Crystallization",
      rating: 4.5,
      participants: 650,
      materials: ["Salt Solutions", "String", "Magnifying Glass", "Heat Source"],
      learningObjectives: ["Crystallization", "Solubility", "Nucleation"],
      safetyLevel: "Medium",
      featured: false,
    },
    {
      id: "color-changing-milk",
      name: "Color-Changing Milk",
      description: "Explore surface tension and polarity by creating swirling colors in milk.",
      difficulty: "Beginner",
      duration: "8 min",
      category: "Physical Chemistry",
      rating: 4.4,
      participants: 980,
      materials: ["Whole Milk", "Food Coloring", "Dish Soap", "Cotton Swabs"],
      learningObjectives: ["Surface tension", "Polarity", "Molecular interactions"],
      safetyLevel: "Low",
      featured: false,
    },
  ]

  const categories = ["all", "Precipitation", "Catalysis", "Acid-Base", "Crystallization", "Physical Chemistry"]
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredExperiments = experiments.filter((exp) => {
    const matchesSearch =
      exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || exp.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || exp.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const featuredExperiments = experiments.filter((exp) => exp.featured)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSafetyColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
            <h1 className="text-lg font-semibold">Experiments</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/lab">
              <Button variant="outline">Virtual Lab</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search experiments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty === "all" ? "All Levels" : difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All Experiments</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperiments.map((experiment) => (
                <Card key={experiment.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{experiment.name}</CardTitle>
                      {experiment.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm">{experiment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={getDifficultyColor(experiment.difficulty)}>{experiment.difficulty}</Badge>
                        <Badge className={getSafetyColor(experiment.safetyLevel)}>
                          Safety: {experiment.safetyLevel}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{experiment.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{experiment.participants}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{experiment.rating}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">Materials:</div>
                        <div className="flex flex-wrap gap-1">
                          {experiment.materials.slice(0, 3).map((material, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {material}
                            </Badge>
                          ))}
                          {experiment.materials.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{experiment.materials.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Link href={`/experiments/${experiment.id}`} className="flex-1">
                          <Button className="w-full" size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Start
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <BookOpen className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredExperiments.map((experiment) => (
                <Card key={experiment.id} className="hover:shadow-lg transition-shadow border-yellow-200">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Award className="h-5 w-5 text-yellow-600" />
                        <span>{experiment.name}</span>
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm">{experiment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={getDifficultyColor(experiment.difficulty)}>{experiment.difficulty}</Badge>
                        <Badge className={getSafetyColor(experiment.safetyLevel)}>
                          Safety: {experiment.safetyLevel}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{experiment.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{experiment.participants}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{experiment.rating}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">Learning Objectives:</div>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {experiment.learningObjectives.map((objective, index) => (
                            <li key={index} className="flex items-start space-x-1">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Link href={`/experiments/${experiment.id}`} className="flex-1">
                          <Button className="w-full bg-yellow-600 hover:bg-yellow-700" size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Start Featured
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <BookOpen className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredExperiments.length === 0 && (
          <div className="text-center py-12">
            <Beaker className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No experiments found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
