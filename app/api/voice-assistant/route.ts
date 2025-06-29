import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json()

    const result = await streamText({
      model: openai("gpt-4o"),
      system: `You are ChemBot, an AI chemistry lab assistant. You help students with virtual chemistry experiments by:
      
      1. Providing clear, step-by-step guidance
      2. Explaining chemical concepts in simple terms
      3. Emphasizing safety protocols
      4. Encouraging scientific curiosity
      5. Answering questions about reactions, equipment, and procedures
      
      Always prioritize safety and accuracy. Keep responses concise but informative. Use encouraging language to motivate learning.
      
      Current context: ${context || "General chemistry lab assistance"}`,
      prompt: message,
      maxTokens: 200,
    })

    return result.toAIStreamResponse()
  } catch (error) {
    console.error("Voice assistant error:", error)
    return new Response("Error processing request", { status: 500 })
  }
}
