"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2, VolumeX, Mic, MicOff } from "lucide-react"
import { useChat } from "ai/react"

interface VoiceAssistantProps {
  context?: string
  onResponse?: (response: string) => void
}

export function VoiceAssistant({ context, onResponse }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [isEnabled, setIsEnabled] = useState(true)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/voice-assistant",
    body: { context },
    onFinish: (message) => {
      if (onResponse) {
        onResponse(message.content)
      }
      // In a real app, you would use text-to-speech here
      if (isEnabled && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(message.content)
        utterance.rate = 0.8
        utterance.pitch = 1
        speechSynthesis.speak(utterance)
      }
    },
  })

  const startListening = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        handleInputChange({ target: { value: transcript } } as any)
        handleSubmit({ preventDefault: () => {} } as any)
      }

      recognition.start()
    }
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">ChemBot Assistant</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsEnabled(!isEnabled)}>
            {isEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>

        {messages.length > 0 && (
          <div className="mb-3 p-2 bg-blue-50 rounded text-sm max-h-20 overflow-y-auto">
            {messages[messages.length - 1]?.content}
          </div>
        )}

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={startListening}
            disabled={isListening || isLoading}
            className="flex-1 bg-transparent"
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isListening ? "Listening..." : "Ask ChemBot"}
          </Button>
        </div>

        {isLoading && <div className="mt-2 text-xs text-gray-500 text-center">ChemBot is thinking...</div>}
      </CardContent>
    </Card>
  )
}
