import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-background">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
} 