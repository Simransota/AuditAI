"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, FileText, PieChart, CheckCircle2, Download, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AuditReportView() {
  const [isPdfLoading, setIsPdfLoading] = useState(false)
  
  // PDF URL from public directory
  const pdfUrl = "/Simran_Sota_Resume_Uber.pdf"

  // Function to handle PDF download
  const handleDownloadPdf = () => {
    setIsPdfLoading(true)
    setTimeout(() => {
      setIsPdfLoading(false)
      // In a real app, you would generate and download the PDF here
      console.log("PDF downloaded")
    }, 1500)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card className="border h-[600px] overflow-auto">
          <Tabs defaultValue="summary">
            <div className="border-b px-3">
              <TabsList className="bg-transparent h-12">
                <TabsTrigger value="summary" className="data-[state=active]:bg-background">
                  Summary
                </TabsTrigger>
                <TabsTrigger value="details" className="data-[state=active]:bg-background">
                  Details
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="data-[state=active]:bg-background">
                  Recommendations
                </TabsTrigger>
                <TabsTrigger value="pdf" className="data-[state=active]:bg-background">
                  View PDF
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="summary" className="m-0 p-6 h-[540px] overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">Sales Data Audit Report</h2>
                  <p className="text-muted-foreground">
                    Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Overview</h3>
                  <p>
                    This report summarizes the anomalies detected in your sales data. Our AI analysis identified 25
                    potential issues across 4,250 records.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 p-2 rounded-full">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">High Severity</p>
                        <p className="text-2xl font-bold">7</p>
                        <p className="text-sm text-muted-foreground">Require immediate attention</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">Medium Severity</p>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-sm text-muted-foreground">Should be reviewed soon</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-100 p-2 rounded-full">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">Low Severity</p>
                        <p className="text-2xl font-bold">6</p>
                        <p className="text-sm text-muted-foreground">Potential minor issues</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Clean Records</p>
                        <p className="text-2xl font-bold">4,225</p>
                        <p className="text-sm text-muted-foreground">No issues detected</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Anomaly Categories</h3>
                  <p>The detected anomalies fall into the following categories:</p>

                  <ul className="space-y-2 mt-3">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="font-medium">Discount Anomalies (10)</span>: Unauthorized or unusual discount
                      amounts
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="font-medium">Tax Issues (7)</span>: Missing or incorrect tax calculations
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="font-medium">Duplicate Transactions (5)</span>: Potential duplicate entries
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="font-medium">Pricing Overrides (3)</span>: Manual price changes outside of policy
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="m-0 p-6 h-[540px] overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">Detailed Findings</h2>
                  <p className="text-muted-foreground mb-4">In-depth analysis of each anomaly category</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-blue-600">Discount Anomalies</h3>
                  <Card className="p-4">
                    <p className="font-medium">Key Findings:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>10 transactions with unusual discount amounts</li>
                      <li>Total discount value: $2,450.75</li>
                      <li>Most frequent offender: TechGiant Inc (4 instances)</li>
                      <li>3 high severity, 5 medium severity, 2 low severity</li>
                    </ul>
                    <p className="mt-3 text-sm">
                      Our analysis shows that several discounts were applied without proper authorization codes in the
                      system. The pattern suggests potential policy violations or training issues with the sales team.
                    </p>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-red-600">Tax Issues</h3>
                  <Card className="p-4">
                    <p className="font-medium">Key Findings:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>7 transactions with tax calculation problems</li>
                      <li>Estimated tax compliance risk: $875.50</li>
                      <li>Most common issue: Missing tax on taxable products (5 instances)</li>
                      <li>4 high severity, 3 medium severity</li>
                    </ul>
                    <p className="mt-3 text-sm">
                      Tax issues represent the highest compliance risk in the dataset. Several transactions for taxable
                      products show no tax being collected, particularly for customers in certain states where sales tax
                      is mandatory.
                    </p>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-purple-600">Duplicate Transactions</h3>
                  <Card className="p-4">
                    <p className="font-medium">Key Findings:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>5 potential duplicate transactions identified</li>
                      <li>Total value of duplicates: $3,245.90</li>
                      <li>Most concerning: 2 transactions for same customer on same day with different pricing</li>
                      <li>2 medium severity, 3 low severity</li>
                    </ul>
                    <p className="mt-3 text-sm">
                      The duplicate transactions show similar patterns but with slight variations in pricing or tax
                      amounts. This could indicate either legitimate repeat purchases or potential system errors in
                      order processing.
                    </p>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="m-0 p-6 h-[540px] overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">Recommended Actions</h2>
                  <p className="text-muted-foreground mb-4">
                    Based on our analysis, we recommend the following actions
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">High Priority</h3>
                  <Card className="p-4 border-l-4 border-l-red-500">
                    <p className="font-medium">Address Tax Compliance Issues</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Review all 7 transactions with tax issues</li>
                      <li>Correct tax calculations and issue amended invoices</li>
                      <li>Update tax rules in your sales system</li>
                      <li>Provide tax compliance training to sales team</li>
                    </ul>
                    <p className="mt-3 text-sm text-muted-foreground">Estimated time to resolve: 2-3 business days</p>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Medium Priority</h3>
                  <Card className="p-4 border-l-4 border-l-orange-500">
                    <p className="font-medium">Review Discount Policies</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Audit all 10 discount anomalies</li>
                      <li>Verify authorization for each discount</li>
                      <li>Implement approval workflow for discounts over 15%</li>
                      <li>Update discount policy documentation</li>
                    </ul>
                    <p className="mt-3 text-sm text-muted-foreground">Estimated time to resolve: 1 week</p>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Low Priority</h3>
                  <Card className="p-4 border-l-4 border-l-yellow-500">
                    <p className="font-medium">Investigate Duplicate Transactions</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Review the 5 potential duplicate transactions</li>
                      <li>Contact customers to verify if purchases were intentional</li>
                      <li>Check for system issues in order processing</li>
                      <li>Implement duplicate detection in sales workflow</li>
                    </ul>
                    <p className="mt-3 text-sm text-muted-foreground">Estimated time to resolve: 2 weeks</p>
                  </Card>
                </div>

                <div className="space-y-4 mt-6">
                  <h3 className="text-lg font-medium">Preventive Measures</h3>
                  <Card className="p-4">
                    <p className="font-medium">Long-term Recommendations:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Implement automated anomaly detection in your sales system</li>
                      <li>Conduct quarterly audits of sales transactions</li>
                      <li>Provide regular training to sales team on policies</li>
                      <li>Update approval workflows for discounts and pricing overrides</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pdf" className="m-0 h-[540px] overflow-y-auto">
              <div className="flex flex-col items-center h-full">
                <div className="w-full max-w-3xl mx-auto">
                  <div className="flex justify-between items-center mb-4 p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Audit Report PDF</h3>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleDownloadPdf}
                      className="flex items-center gap-2"
                      disabled={isPdfLoading}
                    >
                      {isPdfLoading ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-current animate-spin"></div>
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex justify-center w-full">
                    <iframe
                      src={pdfUrl}
                      className="w-full h-[600px] border rounded-lg shadow-sm"
                      title="PDF Preview"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Report Summary</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold">4,250</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Anomalies Detected</p>
                <p className="text-2xl font-bold">
                  25 <span className="text-sm font-normal text-muted-foreground">(0.59%)</span>
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Financial Impact</p>
                <p className="text-2xl font-bold">$6,572.15</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Risk Score</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">Medium</p>
                  <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <PieChart className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Anomaly Distribution</h3>
            </div>

            <div className="space-y-3 mt-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Discount Issues</span>
                  <span className="text-sm font-medium">40%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Tax Problems</span>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: "28%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Duplicates</span>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Pricing Overrides</span>
                  <span className="text-sm font-medium">12%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New PDF download card */}
        <Card className="border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Report PDF</h3>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleDownloadPdf}>
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>
            </div>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">Complete audit report in PDF format</p>
              <p className="text-xs text-muted-foreground mt-1">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}