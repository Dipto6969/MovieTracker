"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Film, Plus, Eye, Clock, Home, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Watched", href: "/watched", icon: Eye },
    { name: "Watchlist", href: "/watchlist", icon: Bookmark },
    { name: "Coming Soon", href: "/coming-soon", icon: Clock },
    { name: "Add Movie", href: "/add", icon: Plus },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-purple-200 dark:border-purple-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Film className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MovieTracker
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={pathname === item.href ? "default" : "ghost"}
                      className={cn(
                        "flex items-center gap-2",
                        pathname === item.href
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : "hover:bg-purple-100 dark:hover:bg-purple-800",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-purple-200 dark:border-purple-800">
        <div className="flex justify-around py-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex flex-col items-center gap-1 h-auto py-2",
                    pathname === item.href
                      ? "text-purple-600 bg-purple-100 dark:bg-purple-800"
                      : "text-gray-600 dark:text-gray-400",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{item.name}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}
