"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadedFilesTable } from "@/components/uploaded-files-table"

export default function FilesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Files</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
          <CardDescription>Overview of all files in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <UploadedFilesTable />
        </CardContent>
      </Card>
    </div>
  )
} 