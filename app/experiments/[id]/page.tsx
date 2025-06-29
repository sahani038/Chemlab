"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Beaker,
  Clock,
  Users,
  Star,
  Play,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Volume2,
  VolumeX,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Award,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface ExperimentStep {
  id: number
  title: string
  description: string
  instructions: string[]
  safetyNotes: string[]
  expectedResult: string
  tips: string[]
}

export default function ExperimentDetailPage() {
  const params = useParams()
  const experimentId = params.id as string

  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0)

  // Mock experiment data - in real app, this would come from API
  const experimentData = {
    "elephant-toothpaste": {
      name: "Elephant's Toothpaste",
      description: "Create a spectacular foam eruption using hydrogen peroxide catalysis",
      difficulty: "Beginner",
      duration: "10 min",
      rating: 4.9,
      participants: 2100,
      safetyLevel: "Medium",
      materials: [
        "30% Hydrogen Peroxide (100ml)",
        "Potassium Iodide (10g)",
        "Liquid Dish Soap (30ml)",
        "Food Coloring (optional)",
        "Large graduated cylinder",
        "Safety goggles",
        "Gloves",
      ],
      learningObjectives: [
        "Understand catalysis and reaction rates",
        "Observe decomposition reactions",
        "Learn about exothermic reactions",
        "Practice laboratory safety",
      ],
      steps: [
        {
          id: 1,
          title: "Safety Preparation",
          description: "Put on all required safety equipment",
          instructions: [
            "Put on safety goggles",
            "Wear protective gloves",
            "Ensure work area is clear",
            "Have towels ready for cleanup",
          ],
          safetyNotes: [
            "Never remove safety equipment during experiment",
            "Hydrogen peroxide can cause burns",
            "Work in well-ventilated area",
          ],
          expectedResult: "All safety equipment properly worn",
          tips: ["Double-check all equipment before proceeding"],
        },
        {
          id: 2,
          title: "Prepare the Cylinder",
          description: "Set up the reaction vessel",
          instructions: [
            "Place large graduated cylinder in center of workspace",
            "Add 2-3 drops of food coloring to cylinder",
            "Add 30ml of liquid dish soap",
            "Gently swirl to mix coloring and soap",
          ],
          safetyNotes: ["Handle glassware carefully", "Keep cylinder stable and upright"],
          expectedResult: "Colored soap solution in bottom of cylinder",
          tips: ["Use bright colors for better visual effect"],
        },
        {
          id: 3,
          title: "Add Hydrogen Peroxide",
          description: "Carefully add the hydrogen peroxide",
          instructions: [
            "Measure 100ml of 30% hydrogen peroxide",
            "Slowly pour into the cylinder",
            "Avoid splashing or spilling",
            "Do not mix yet",
          ],
          safetyNotes: [
            "30% hydrogen peroxide is highly concentrated",
            "Avoid contact with skin",
            "Pour slowly to prevent splashing",
          ],
          expectedResult: "Clear hydrogen peroxide layer above soap",
          tips: ["Pour down the side of the cylinder for layering effect"],
        },
        {
          id: 4,
          title: "Prepare Catalyst",
          description: "Prepare the potassium iodide solution",
          instructions: [
            "In separate beaker, dissolve 10g KI in 50ml warm water",
            "Stir until completely dissolved",
            "Solution should be clear",
            "Have this ready to add quickly",
          ],
          safetyNotes: ["KI is generally safe but avoid ingestion", "Wash hands after handling"],
          expectedResult: "Clear potassium iodide solution",
          tips: ["Warm water helps KI dissolve faster"],
        },
        {
          id: 5,
          title: "The Reaction",
          description: "Add catalyst and observe the reaction",
          instructions: [
            "Quickly pour KI solution into cylinder",
            "Step back immediately",
            "Observe the rapid foam formation",
            "Do not touch the foam - it's hot!",
          ],
          safetyNotes: [
            "Reaction is exothermic (produces heat)",
            "Foam will be hot - do not touch",
            "Stand clear of the cylinder",
          ],
          expectedResult: "Rapid formation of colored foam shooting upward",
          tips: ["Have camera ready - reaction happens quickly!"],
        },
        {
          id: 6,
          title: "Observation and Cleanup",
          description: "Record observations and clean up safely",
          instructions: [
            "Record color, height, and duration of foam",
            "Wait for foam to cool before cleanup",
            "Dispose of materials properly",
            "Clean all equipment thoroughly",
          ],
          safetyNotes: ["Let foam cool completely before handling", "Dispose according to local regulations"],
          expectedResult: "Complete documentation and safe cleanup",
          tips: ["Take photos/videos for your lab report"],
        },
      ],
      quiz: [
        {
          question: "What role does potassium iodide play in this reaction?",
          options: ["Reactant", "Catalyst", "Product", "Inhibitor"],
          correct: 1,
          explanation: "KI acts as a catalyst, speeding up the decomposition of H₂O₂ without being consumed.",
        },
        {
          question: "Why does the reaction produce foam?",
          options: ["CO₂ gas is produced", "O₂ gas is trapped by soap", "H₂ gas is released", "Water vapor forms"],
          correct: 1,
          explanation: "The decomposition of H₂O₂ produces O₂ gas, which gets trapped by the soap to form foam.",
        },
        {
          question: "Why is the foam hot?",
          options: [
            "The reaction is endothermic",
            "The reaction is exothermic",
            "Friction creates heat",
            "The soap generates heat",
          ],
          correct: 1,
          explanation: "The decomposition of hydrogen peroxide is exothermic, releasing energy as heat.",
        },
      ],
    },
  }

  const experiment = experimentData[experimentId as keyof typeof experimentData]

  useEffect(() => {
    if (voiceEnabled && isRunning) {
      // Simulate AI voice assistant
      const currentStepData = experiment?.steps[currentStep]
      if (currentStepData) {
        console.log(`AI Assistant: ${currentStepData.title} - ${currentStepData.description}`)
      }
    }
  }, [currentStep, isRunning, voiceEnabled, experiment])

  if (!experiment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Beaker className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Experiment Not Found</h2>
          <p className="text-gray-500 mb-4">The requested experiment could not be found.</p>
          <Link href="/experiments">
            <Button>Back to Experiments</Button>
          </Link>
        </div>
      </div>
    )
  }

  const progress = ((currentStep + 1) / experiment.steps.length) * 100

  const startExperiment = () => {
    setIsRunning(true)
    setCurrentStep(0)
    setCompletedSteps([])
  }

  const nextStep = () => {
    if (currentStep < experiment.steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep])
      setCurrentStep(currentStep + 1)
    } else {
      // Experiment completed
      setCompletedSteps([...completedSteps, currentStep])
      setIsRunning(false)
      setShowQuiz(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setCompletedSteps(completedSteps.filter((step) => step !== currentStep - 1))
    }
  }

  const resetExperiment = () => {
    setIsRunning(false)
    setCurrentStep(0)
    setCompletedSteps([])
    setShowQuiz(false)
    setQuizScore(0)
    setCurrentQuizQuestion(0)
  }

  const handleQuizAnswer = (selectedAnswer: number) => {
    const isCorrect = selectedAnswer === experiment.quiz[currentQuizQuestion].correct
    if (isCorrect) {
      setQuizScore(quizScore + 1)
    }

    if (currentQuizQuestion < experiment.quiz.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1)
    } else {
      // Quiz completed
      alert(`Quiz completed! Score: ${quizScore + (isCorrect ? 1 : 0)}/${experiment.quiz.length}`)
    }
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Beaker className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">Chem Lab</span>
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/experiments" className="text-blue-600 hover:underline">
              Experiments
            </Link>
            <span className="text-gray-400">|</span>
            <h1 className="text-lg font-semibold">{experiment.name}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setVoiceEnabled(!voiceEnabled)}>
              {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={resetExperiment}>
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Link href="/lab">
              <Button variant="outline" size="sm">
                Virtual Lab
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Experiment Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{experiment.name}</h1>
              <p className="text-lg text-gray-600">{experiment.description}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
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
              <Badge className={getDifficultyColor(experiment.difficulty)}>{experiment.difficulty}</Badge>
            </div>
          </div>

          {/* Progress Bar */}
          {isRunning && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-gray-600">
                  Step {currentStep + 1} of {experiment.steps.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>

        {!showQuiz ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="experiment" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="experiment">Experiment</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="theory">Theory</TabsTrigger>
                </TabsList>

                <TabsContent value="experiment" className="mt-6">
                  {!isRunning ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>Ready to Start?</CardTitle>
                        <CardDescription>
                          Follow the step-by-step instructions to complete this experiment safely.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              Make sure you have all required materials and safety equipment before starting.
                            </AlertDescription>
                          </Alert>
                          <Button onClick={startExperiment} className="w-full" size="lg">
                            <Play className="h-5 w-5 mr-2" />
                            Start Experiment
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <span>
                            Step {currentStep + 1}: {experiment.steps[currentStep].title}
                          </span>
                          {completedSteps.includes(currentStep) && <CheckCircle className="h-5 w-5 text-green-600" />}
                        </CardTitle>
                        <CardDescription>{experiment.steps[currentStep].description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Instructions */}
                          <div>
                            <h4 className="font-medium mb-3">Instructions:</h4>
                            <ol className="space-y-2">
                              {experiment.steps[currentStep].instructions.map((instruction, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full min-w-[24px] text-center">
                                    {index + 1}
                                  </span>
                                  <span className="text-gray-700">{instruction}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Safety Notes */}
                          {experiment.steps[currentStep].safetyNotes.length > 0 && (
                            <Alert className="border-red-200 bg-red-50">
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                              <AlertDescription>
                                <div className="font-medium text-red-800 mb-2">Safety Notes:</div>
                                <ul className="space-y-1 text-red-700">
                                  {experiment.steps[currentStep].safetyNotes.map((note, index) => (
                                    <li key={index} className="flex items-start space-x-1">
                                      <span>•</span>
                                      <span>{note}</span>
                                    </li>
                                  ))}
                                </ul>
                              </AlertDescription>
                            </Alert>
                          )}

                          {/* Expected Result */}
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-medium text-green-800 mb-2">Expected Result:</h4>
                            <p className="text-green-700">{experiment.steps[currentStep].expectedResult}</p>
                          </div>

                          {/* Tips */}
                          {experiment.steps[currentStep].tips.length > 0 && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="font-medium text-blue-800 mb-2">Tips:</h4>
                              <ul className="space-y-1 text-blue-700">
                                {experiment.steps[currentStep].tips.map((tip, index) => (
                                  <li key={index} className="flex items-start space-x-1">
                                    <span>💡</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Navigation */}
                          <div className="flex justify-between items-center pt-4 border-t">
                            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                              <ArrowLeft className="h-4 w-4 mr-2" />
                              Previous
                            </Button>
                            <Button onClick={nextStep}>
                              {currentStep === experiment.steps.length - 1 ? "Complete" : "Next Step"}
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="materials" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Required Materials</CardTitle>
                      <CardDescription>Gather all materials before starting the experiment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {experiment.materials.map((material, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>{material}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="theory" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Objectives</CardTitle>
                      <CardDescription>What you'll learn from this experiment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {experiment.learningObjectives.map((objective, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                            <span>{objective}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Experiment Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Experiment Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <Badge className={getDifficultyColor(experiment.difficulty)}>{experiment.difficulty}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span>{experiment.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Safety Level:</span>
                    <Badge variant="outline">{experiment.safetyLevel}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{experiment.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Tracker */}
              {isRunning && (
                <Card>
                  <CardHeader>
                    <CardTitle>Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {experiment.steps.map((step, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-2 p-2 rounded ${
                            index === currentStep
                              ? "bg-blue-100 border-l-4 border-blue-500"
                              : completedSteps.includes(index)
                                ? "bg-green-50 text-green-700"
                                : "text-gray-500"
                          }`}
                        >
                          {completedSteps.includes(index) ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : index === currentStep ? (
                            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                          ) : (
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                          )}
                          <span className="text-sm">{step.title}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/lab" className="block">
                    <Button variant="outline" className="w-full bg-transparent">
                      Open Virtual Lab
                    </Button>
                  </Link>
                  <Link href="/experiments" className="block">
                    <Button variant="outline" className="w-full bg-transparent">
                      More Experiments
                    </Button>
                  </Link>
                  <Link href="/dashboard" className="block">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Dashboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Quiz Section */
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-yellow-600" />
                <span>Knowledge Check</span>
              </CardTitle>
              <CardDescription>Test your understanding of the experiment</CardDescription>
            </CardHeader>
            <CardContent>
              {currentQuizQuestion < experiment.quiz.length ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Question {currentQuizQuestion + 1} of {experiment.quiz.length}
                    </span>
                    <span className="text-sm text-gray-600">
                      Score: {quizScore}/{experiment.quiz.length}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">{experiment.quiz[currentQuizQuestion].question}</h3>
                    <div className="space-y-2">
                      {experiment.quiz[currentQuizQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full text-left justify-start h-auto p-4 bg-transparent"
                          onClick={() => handleQuizAnswer(index)}
                        >
                          <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2 py-1 rounded-full mr-3">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Final Score: {quizScore}/{experiment.quiz.length}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button onClick={resetExperiment}>Try Again</Button>
                    <Link href="/experiments">
                      <Button variant="outline">More Experiments</Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
