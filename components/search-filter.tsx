"use client"

import { useState } from "react"
import { Search, Filter, SortAsc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SearchFilterProps {
  onSearch: (query: string) => void
  onSort: (sortBy: string) => void
  searchQuery: string
  sortBy: string
}

export function SearchFilter({ onSearch, onSort, searchQuery, sortBy }: SearchFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by title, nickname, or genre..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={sortBy} onValueChange={onSort}>
              <SelectTrigger className="w-full sm:w-48">
                <SortAsc className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="releaseDate">Release Date</SelectItem>
                <SelectItem value="dateAdded">Recently Added</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="sm:hidden">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
