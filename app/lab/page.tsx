"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Beaker,
  FlaskConical,
  Flame,
  Thermometer,
  Scale,
  Pipette,
  Shield,
  Volume2,
  VolumeX,
  RotateCcw,
  Play,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

interface LabTool {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  inUse: boolean
}

interface Chemical {
  id: string
  name: string
  formula: string
  color: string
  hazard: "safe" | "caution" | "danger"
  amount: number
}

export default function VirtualLabPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [isExperimentRunning, setIsExperimentRunning] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [safetyAlert, setSafetyAlert] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const labTools: LabTool[] = [
    {
      id: "beaker",
      name: "Beaker",
      icon: <Beaker className="h-6 w-6" />,
      description: "Glass container for mixing solutions",
      inUse: false,
    },
    {
      id: "flask",
      name: "Erlenmeyer Flask",
      icon: <FlaskConical className="h-6 w-6" />,
      description: "Conical flask for reactions",
      inUse: false,
    },
    {
      id: "burner",
      name: "Bunsen Burner",
      icon: <Flame className="h-6 w-6" />,
      description: "Heat source for experiments",
      inUse: false,
    },
    {
      id: "thermometer",
      name: "Thermometer",
      icon: <Thermometer className="h-6 w-6" />,
      description: "Temperature measurement",
      inUse: false,
    },
    {
      id: "scale",
      name: "Digital Scale",
      icon: <Scale className="h-6 w-6" />,
      description: "Precise mass measurement",
      inUse: false,
    },
    {
      id: "pipette",
      name: "Pipette",
      icon: <Pipette className="h-6 w-6" />,
      description: "Precise liquid transfer",
      inUse: false,
    },
  ]

  const chemicals: Chemical[] = [
    {
      id: "h2o2",
      name: "Hydrogen Peroxide",
      formula: "H₂O₂",
      color: "bg-blue-100",
      hazard: "caution",
      amount: 100,
    },
    {
      id: "ki",
      name: "Potassium Iodide",
      formula: "KI",
      color: "bg-white",
      hazard: "safe",
      amount: 50,
    },
    {
      id: "soap",
      name: "Dish Soap",
      formula: "C₁₂H₂₅SO₄Na",
      color: "bg-green-100",
      hazard: "safe",
      amount: 30,
    },
    {
      id: "pb_no3",
      name: "Lead Nitrate",
      formula: "Pb(NO₃)₂",
      color: "bg-gray-100",
      hazard: "danger",
      amount: 25,
    },
  ]

  const experimentSteps = [
    "Put on safety goggles and gloves",
    "Select appropriate glassware",
    "Measure chemicals carefully",
    "Mix solutions slowly",
    "Observe reaction changes",
    "Record observations",
  ]

  useEffect(() => {
    // Initialize canvas for lab workspace
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Draw lab bench
        ctx.fillStyle = "#f3f4f6"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw grid
        ctx.strokeStyle = "#e5e7eb"
        ctx.lineWidth = 1
        for (let i = 0; i < canvas.width; i += 20) {
          ctx.beginPath()
          ctx.moveTo(i, 0)
          ctx.lineTo(i, canvas.height)
          ctx.stroke()
        }
        for (let i = 0; i < canvas.height; i += 20) {
          ctx.beginPath()
          ctx.moveTo(0, i)
          ctx.lineTo(canvas.width, i)
          ctx.stroke()
        }
      }
    }
  }, [])

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId)
    const tool = labTools.find((t) => t.id === toolId)
    if (tool && voiceEnabled) {
      // Simulate AI voice assistant
      setSafetyAlert(`Selected ${tool.name}. ${tool.description}`)
      setTimeout(() => setSafetyAlert(null), 3000)
    }
  }

  const handleChemicalSelect = (chemical: Chemical) => {
    if (chemical.hazard === "danger") {
      setSafetyAlert(`⚠️ DANGER: ${chemical.name} is hazardous. Handle with extreme care!`)
    } else if (chemical.hazard === "caution") {
      setSafetyAlert(`⚠️ CAUTION: ${chemical.name} requires careful handling.`)
    }
    setTimeout(() => setSafetyAlert(null), 4000)
  }

  const startExperiment = () => {
    setIsExperimentRunning(true)
    setCurrentStep(0)
    if (voiceEnabled) {
      setSafetyAlert("Experiment started. Follow safety protocols at all times.")
      setTimeout(() => setSafetyAlert(null), 3000)
    }
  }

  const nextStep = () => {
    if (currentStep < experimentSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      if (voiceEnabled) {
        setSafetyAlert(`Step ${currentStep + 2}: ${experimentSteps[currentStep + 1]}`)
        setTimeout(() => setSafetyAlert(null), 4000)
      }
    } else {
      setIsExperimentRunning(false)
      setSafetyAlert("Experiment completed! Great work!")
      setTimeout(() => setSafetyAlert(null), 3000)
    }
  }

  const resetLab = () => {
    setIsExperimentRunning(false)
    setCurrentStep(0)
    setSelectedTool(null)
    setSafetyAlert("Lab workspace reset.")
    setTimeout(() => setSafetyAlert(null), 2000)
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
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-lg font-semibold">Virtual Laboratory</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setVoiceEnabled(!voiceEnabled)}>
              {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              AI Assistant
            </Button>
            <Button variant="outline" size="sm" onClick={resetLab}>
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Link href="/experiments">
              <Button variant="outline" size="sm">
                Experiments
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Safety Alert */}
      {safetyAlert && (
        <Alert className="mx-4 mt-4 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{safetyAlert}</AlertDescription>
        </Alert>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Lab Tools Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Lab Tools</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {labTools.map((tool) => (
                  <Button
                    key={tool.id}
                    variant={selectedTool === tool.id ? "default" : "outline"}
                    className="w-full justify-start h-auto p-3"
                    onClick={() => handleToolSelect(tool.id)}
                  >
                    <div className="flex items-center space-x-3">
                      {tool.icon}
                      <div className="text-left">
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-xs text-gray-500">{tool.description}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Chemicals Panel */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Available Chemicals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {chemicals.map((chemical) => (
                  <div
                    key={chemical.id}
                    className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${chemical.color}`}
                    onClick={() => handleChemicalSelect(chemical)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{chemical.name}</div>
                        <div className="text-sm text-gray-600">{chemical.formula}</div>
                        <div className="text-xs text-gray-500">{chemical.amount}ml available</div>
                      </div>
                      <Badge
                        variant={
                          chemical.hazard === "danger"
                            ? "destructive"
                            : chemical.hazard === "caution"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {chemical.hazard}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Lab Workspace */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Lab Workspace</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <canvas ref={canvasRef} width={600} height={400} className="border rounded-lg bg-gray-100 w-full" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-sm font-medium">Selected Tool:</div>
                    <div className="text-lg">
                      {selectedTool ? labTools.find((t) => t.id === selectedTool)?.name : "None"}
                    </div>
                  </div>
                </div>

                {/* Experiment Controls */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {!isExperimentRunning ? (
                      <Button onClick={startExperiment} className="bg-green-600 hover:bg-green-700">
                        <Play className="h-4 w-4 mr-2" />
                        Start Experiment
                      </Button>
                    ) : (
                      <Button onClick={nextStep} variant="outline">
                        Next Step ({currentStep + 1}/{experimentSteps.length})
                      </Button>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Drag tools and chemicals to the workspace</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Experiment Guide Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Experiment Guide</CardTitle>
              </CardHeader>
              <CardContent>
                {isExperimentRunning ? (
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-blue-600">
                      Current Step: {currentStep + 1}/{experimentSteps.length}
                    </div>
                    <div className="space-y-2">
                      {experimentSteps.map((step, index) => (
                        <div
                          key={index}
                          className={`p-2 rounded text-sm ${
                            index === currentStep
                              ? "bg-blue-100 border-l-4 border-blue-500 font-medium"
                              : index < currentStep
                                ? "bg-green-50 text-green-700"
                                : "text-gray-500"
                          }`}
                        >
                          {index + 1}. {step}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FlaskConical className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Select an experiment to begin guided instructions</p>
                    <Link href="/experiments">
                      <Button variant="outline">Browse Experiments</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Safety Panel */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <Shield className="h-5 w-5" />
                  <span>Safety Reminders</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Always wear safety equipment</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Read chemical labels carefully</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Never mix unknown chemicals</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Keep workspace clean and organized</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
