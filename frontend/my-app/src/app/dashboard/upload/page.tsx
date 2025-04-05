"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileUp, Upload, X } from "lucide-react"
import { useState } from "react"

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type === "text/csv") {
      setSelectedFile(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "text/csv") {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    // Add your upload logic here
    console.log("Uploading file:", selectedFile.name)
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Upload CSV</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload File for Analysis</CardTitle>
          <CardDescription>
            Upload your CSV file to analyze for anomalies. We accept CSV files up to 10MB in size.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? "border-primary bg-primary/5" : "border-muted"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!selectedFile ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-medium">Drag and drop your CSV file here</p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                </div>
                <Input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                  Browse Files
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <FileUp className="h-6 w-6 text-primary" />
                  <span className="font-medium">{selectedFile.name}</span>
                  <Button variant="ghost" size="icon" onClick={removeFile} className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleUpload}>Upload and Analyze</Button>
              </div>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Requirements:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>File must be in CSV format</li>
              <li>Maximum file size: 10MB</li>
              <li>Must contain headers in the first row</li>
              <li>Required columns: Date, Amount, Transaction ID</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 