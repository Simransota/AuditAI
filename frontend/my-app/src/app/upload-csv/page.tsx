import { Upload } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { FileUploader } from "@/components/file-uploader"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">SalesGuard</h1>
          <p className="text-muted-foreground mt-2">Intelligent Sales Anomaly Auditor</p>
        </div>

        <Card className="border-2 border-dashed">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Upload Your Sales Dataset</CardTitle>
            <CardDescription>Upload your CSV file to detect anomalies in your sales data</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUploader />

            <div className="flex items-center space-x-2 mt-6">
              <Checkbox id="sample" />
              <label
                htmlFor="sample"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Use Sample Dataset
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/processing">
              <Button size="lg">
                <Upload className="mr-2 h-4 w-4" />
                Start Analysis
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Your data is processed securely and never stored on our servers.</p>
        </div>
      </div>
    </div>
  )
}

