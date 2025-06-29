import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Beaker, FlaskConical, Flame, Shield, Brain, Trophy, Monitor } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: <Beaker className="h-8 w-8" />,
      title: "Realistic Lab Simulation",
      description: "Experience authentic chemical experiments in a safe virtual environment",
    },
    {
      icon: <FlaskConical className="h-8 w-8" />,
      title: "Virtual Lab Tools",
      description: "Access beakers, test tubes, Bunsen burners, and more professional equipment",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Safety First",
      description: "Interactive safety alerts and proper chemical handling warnings",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Voice Assistant",
      description: "Get real-time guidance and explanations during experiments",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Quiz & Practice",
      description: "Test your knowledge with interactive quizzes after each experiment",
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Multi-Device Support",
      description: "Works seamlessly on desktops, tablets, and mobile devices",
    },
  ]

  const popularExperiments = [
    {
      name: "Golden Rain",
      difficulty: "Intermediate",
      duration: "15 min",
      description: "Create beautiful golden crystals through precipitation reaction",
    },
    {
      name: "Elephant's Toothpaste",
      difficulty: "Beginner",
      duration: "10 min",
      description: "Spectacular foam eruption using hydrogen peroxide catalysis",
    },
    {
      name: "pH Rainbow",
      difficulty: "Beginner",
      duration: "12 min",
      description: "Create a colorful pH indicator spectrum",
    },
    {
      name: "Volcano Reaction",
      difficulty: "Intermediate",
      duration: "20 min",
      description: "Simulate volcanic eruption with chemical reactions",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Beaker className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Chem Lab</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/lab" className="text-gray-600 hover:text-blue-600 transition-colors">
              Virtual Lab
            </Link>
            <Link href="/experiments" className="text-gray-600 hover:text-blue-600 transition-colors">
              Experiments
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Button asChild>
              <Link href="/lab">Start Lab</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">Virtual Science Education</Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Chem Lab</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience the excitement of chemistry through safe, interactive virtual experiments. Learn, practice, and
            master chemical concepts with our AI-powered lab simulator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/lab">
                <Flame className="mr-2 h-5 w-5" />
                Start Experimenting
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/experiments">View Experiments</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Chem Lab?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-blue-600 mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Experiments */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Popular Experiments</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularExperiments.map((experiment, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{experiment.name}</CardTitle>
                    <Badge variant={experiment.difficulty === "Beginner" ? "secondary" : "default"}>
                      {experiment.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-gray-500">{experiment.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{experiment.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/experiments">View All Experiments</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Chemistry Journey?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students already learning chemistry the interactive way
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/lab">Enter Virtual Lab</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Beaker className="h-6 w-6" />
                <span className="text-xl font-bold">Chem Lab</span>
              </div>
              <p className="text-gray-400">
                Making chemistry education accessible and engaging through virtual simulation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Virtual Lab Tools</li>
                <li>AI Assistant</li>
                <li>Safety Training</li>
                <li>Progress Tracking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Experiments</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Golden Rain</li>
                <li>Elephant's Toothpaste</li>
                <li>pH Indicators</li>
                <li>Crystallization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Safety Guidelines</li>
                <li>Contact Us</li>
                <li>Feedback</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Chem Lab. All rights reserved. Educational use only.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
