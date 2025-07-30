"use client";
import {
  BarChart3,
  Home,
  Users,
  TrendingUp,
  Settings,
  FileText,
  X,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navigation = [
  { name: "Dashboard", href: "#", icon: Home, current: true },
  { name: "Analytics", href: "#", icon: BarChart3, current: false },
  { name: "Audience", href: "#", icon: Users, current: false },
  { name: "Campaigns", href: "#", icon: TrendingUp, current: false },
  { name: "Reports", href: "#", icon: FileText, current: false },
  { name: "Settings", href: "#", icon: Settings, current: false },
];

export function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile sidebar overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
    absolute lg:hidden inset-y-0 left-0 z-50 w-full max-w-xs bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out
    ${open ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ADmyBRAND
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`
                group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                ${
                  item.current
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                }
              `}
            >
              <item.icon
                className={`
                mr-3 h-5 w-5 transition-colors duration-200
                ${
                  item.current
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                }
              `}
              />
              {item.name}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
            <h3 className="text-sm font-semibold">Upgrade to Pro</h3>
            <p className="text-xs mt-1 opacity-90">
              Get advanced analytics and unlimited reports
            </p>
            <button className="mt-2 w-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md py-1 px-3 text-xs font-medium transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
