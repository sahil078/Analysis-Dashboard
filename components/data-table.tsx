"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronUp, Search, Filter, Download } from "lucide-react"

interface TableData {
  id: number
  campaign: string
  platform: string
  impressions: number
  clicks: number
  ctr: number
  cost: number
  conversions: number
  status: "Active" | "Paused" | "Completed"
}

const mockData: TableData[] = [
  {
    id: 1,
    campaign: "Summer Sale 2024",
    platform: "Facebook",
    impressions: 125000,
    clicks: 3200,
    ctr: 2.56,
    cost: 1250,
    conversions: 89,
    status: "Active",
  },
  {
    id: 2,
    campaign: "Brand Awareness",
    platform: "Google",
    impressions: 89000,
    clicks: 2100,
    ctr: 2.36,
    cost: 890,
    conversions: 45,
    status: "Active",
  },
  {
    id: 3,
    campaign: "Product Launch",
    platform: "Instagram",
    impressions: 67000,
    clicks: 1800,
    ctr: 2.69,
    cost: 670,
    conversions: 67,
    status: "Paused",
  },
  {
    id: 4,
    campaign: "Holiday Special",
    platform: "LinkedIn",
    impressions: 45000,
    clicks: 1200,
    ctr: 2.67,
    cost: 450,
    conversions: 34,
    status: "Completed",
  },
  {
    id: 5,
    campaign: "Back to School",
    platform: "Twitter",
    impressions: 78000,
    clicks: 1900,
    ctr: 2.44,
    cost: 780,
    conversions: 56,
    status: "Active",
  },
  {
    id: 6,
    campaign: "Flash Sale",
    platform: "Facebook",
    impressions: 156000,
    clicks: 4200,
    ctr: 2.69,
    cost: 1560,
    conversions: 123,
    status: "Active",
  },
  {
    id: 7,
    campaign: "Newsletter Signup",
    platform: "Google",
    impressions: 34000,
    clicks: 890,
    ctr: 2.62,
    cost: 340,
    conversions: 23,
    status: "Paused",
  },
  {
    id: 8,
    campaign: "Mobile App Promo",
    platform: "Instagram",
    impressions: 92000,
    clicks: 2400,
    ctr: 2.61,
    cost: 920,
    conversions: 78,
    status: "Active",
  },
]

type SortField = keyof TableData
type SortDirection = "asc" | "desc"

export function DataTable() {
  const [data] = useState<TableData[]>(mockData)
  const [sortField, setSortField] = useState<SortField>("impressions")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter((item) => {
      const matchesSearch =
        item.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.platform.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || item.status === statusFilter
      return matchesSearch && matchesStatus
    })

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })

    return filtered
  }, [data, sortField, sortDirection, searchTerm, statusFilter])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedData, currentPage])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Campaign Performance</h3>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              {[
                { key: "campaign", label: "Campaign" },
                { key: "platform", label: "Platform" },
                { key: "impressions", label: "Impressions" },
                { key: "clicks", label: "Clicks" },
                { key: "ctr", label: "CTR %" },
                { key: "cost", label: "Cost" },
                { key: "conversions", label: "Conversions" },
                { key: "status", label: "Status" },
              ].map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  onClick={() => handleSort(column.key as SortField)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortField === column.key &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{item.campaign}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.platform}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{item.impressions.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{item.clicks.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{item.ctr.toFixed(2)}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">${item.cost.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{item.conversions}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length}{" "}
            results
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
