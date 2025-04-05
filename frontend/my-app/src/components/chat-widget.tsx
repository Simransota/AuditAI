"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User } from "lucide-react"

interface ChatWidgetProps {
  selectedRowId: number | null
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export function ChatWidget({ selectedRowId }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I can help you understand the anomalies in your sales data. Select a row with an anomaly or ask me a question.",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
    }
    setMessages([...messages, userMessage])
    setInput("")

    // Simulate AI response based on the question
    setTimeout(() => {
      let response = ""

      if (selectedRowId === 2) {
        response =
          "This transaction has a medium severity discount anomaly. The 20% discount ($100) is unusual for TechGiant Inc. based on their customer tier and purchase history. This discount was not pre-approved in the system."
      } else if (selectedRowId === 3) {
        response =
          "This is a high severity tax anomaly. The Basic License product is taxable, but no tax was applied to this transaction. This could lead to compliance issues and potential penalties."
      } else if (selectedRowId === 5) {
        response =
          "This appears to be a potential duplicate of transaction #2 with different pricing. The same customer purchased the same product on a similar date, but with different discount and tax amounts."
      } else if (input.toLowerCase().includes("discount")) {
        response =
          "I found 1 discount anomaly in your data. TechGiant Inc. received a 20% discount that appears to be outside of standard policy. Would you like me to show all transactions with unusual discounts?"
      } else if (input.toLowerCase().includes("tax")) {
        response =
          "There is 1 high-severity tax anomaly where StartUp LLC was not charged tax on a taxable product. This could be a compliance risk that needs immediate attention."
      } else {
        response =
          "I've analyzed your sales data and found 3 anomalies: 1 discount issue, 1 tax compliance risk, and 1 potential duplicate transaction. Would you like me to explain any of these in more detail?"
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const getSuggestions = () => {
    if (selectedRowId === 2) {
      return ["Why was this discount flagged?", "Is this discount authorized?", "Show similar anomalies"]
    } else if (selectedRowId === 3) {
      return ["Why is tax missing?", "What's the compliance risk?", "How to fix this issue?"]
    } else if (selectedRowId === 5) {
      return ["Why is this a duplicate?", "Compare with transaction #2", "Is this fraudulent?"]
    } else {
      return ["Summarize all anomalies", "Show highest risk issues", "What patterns do you see?"]
    }
  }

  return (
    <Card className="w-96 flex flex-col h-[600px] border">
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle className="text-base">AI Assistant</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
            <div
              className={`flex gap-2 max-w-[80%] ${
                message.role === "assistant"
                  ? "bg-muted rounded-lg p-3"
                  : "bg-primary text-primary-foreground rounded-lg p-3"
              }`}
            >
              {message.role === "assistant" && <Bot className="h-5 w-5 mt-0.5 flex-shrink-0" />}
              <div>
                <p className="text-sm">{message.content}</p>
              </div>
              {message.role === "user" && <User className="h-5 w-5 mt-0.5 flex-shrink-0" />}
            </div>
          </div>
        ))}
      </CardContent>

      <div className="px-4 py-2">
        <div className="flex flex-wrap gap-2 mb-3">
          {getSuggestions().map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => {
                setInput(suggestion)
              }}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      <CardFooter className="p-3 pt-0">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Ask about this anomaly..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend()
              }
            }}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

