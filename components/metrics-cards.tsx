"use client"

import { TrendingUp, TrendingDown, Users, DollarSign, MousePointer, BarChart3 } from "lucide-react"

const metrics = [
  {
    title: "Total Revenue",
    value: "$124,563",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "Active Users",
    value: "23,456",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Conversions",
    value: "1,234",
    change: "-2.4%",
    trend: "down",
    icon: MousePointer,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    title: "Growth Rate",
    value: "15.3%",
    change: "+5.1%",
    trend: "up",
    icon: BarChart3,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
]

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={metric.title}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`h-6 w-6 ${metric.color}`} />
            </div>
            <div
              className={`flex items-center space-x-1 text-sm font-medium ${
                metric.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {metric.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{metric.change}</span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{metric.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
