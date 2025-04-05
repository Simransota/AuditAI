"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ProcessingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [rowsProcessed, setRowsProcessed] = useState(0)
  const [anomaliesFound, setAnomaliesFound] = useState(0)

  const steps = [
    "Analyzing Data...",
    "Checking for Anomalies...",
    "Classifying Severity Levels...",
    "Generating Audit Report...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            router.push("/results")
          }, 500)
          return 100
        }

        // Update current step based on progress
        const newProgress = prev + 1
        if (newProgress > 25 && currentStep === 0) setCurrentStep(1)
        if (newProgress > 50 && currentStep === 1) setCurrentStep(2)
        if (newProgress > 75 && currentStep === 2) setCurrentStep(3)

        // Simulate increasing rows processed and anomalies found
        setRowsProcessed(Math.floor(newProgress * 42.5)) // Simulating ~4250 rows total
        if (newProgress > 25) {
          setAnomaliesFound(Math.floor((newProgress - 25) / 3)) // Simulating ~25 anomalies
        }

        return newProgress
      })
    }, 80)

    return () => clearInterval(interval)
  }, [currentStep, router])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium">{progress}%</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">{steps[currentStep]}</h1>
        <Progress value={progress} className="h-2 mb-8" />

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Rows Processed</p>
            <p className="text-2xl font-bold">{rowsProcessed.toLocaleString()}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Anomalies Found</p>
            <p className="text-2xl font-bold">{anomaliesFound}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          This may take a few moments. Our AI is thoroughly analyzing your data to identify potential anomalies.
        </p>
      </div>
    </div>
  )
}

