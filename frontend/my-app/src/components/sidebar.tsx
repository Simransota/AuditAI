"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BarChart2,
  Files,
  AlertTriangle,
  Lightbulb,
  Settings,
  FileUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Sales Overview",
    href: "/dashboard/sales-overview",
    icon: Lightbulb,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart2,
  },
  {
    title: "Files",
    href: "/dashboard/files",
    icon: Files,
  },
  {
    title: "Anomalies",
    href: "/dashboard/anomalies",
    icon: AlertTriangle,
  },
  {
    title: "Insights",
    href: "/dashboard/insights",
    icon: Lightbulb,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">File Audit System</h2>
          <div className="space-y-1">
          <Link href="/upload-csv">
              <Button variant="secondary" className="w-full justify-start gap-2">
                <FileUp className="h-4 w-4" />
                Upload New File
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                  pathname === item.href ? "bg-accent" : "transparent"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 