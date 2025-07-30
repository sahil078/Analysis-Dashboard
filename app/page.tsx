"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MetricsCards } from "@/components/metrics-cards"
import { ChartsSection } from "@/components/charts-section"
import { DataTable } from "@/components/data-table"
import { ThemeProvider } from "@/components/theme-provider"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <div className="w-full">
          <Header setSidebarOpen={setSidebarOpen} />

          <main className="p-4 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Header Section */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ADmyBRAND Insights</h1>
                <p className="text-gray-600 dark:text-gray-400">Digital Marketing Analytics Dashboard</p>
              </div>

              {/* Metrics Cards */}
              <MetricsCards />

              {/* Charts Section */}
              <ChartsSection />

              {/* Data Table */}
              <DataTable />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
