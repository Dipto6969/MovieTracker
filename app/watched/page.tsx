"use client"

import { useState, useMemo } from "react"
import { Layout } from "@/components/layout"
import { MovieCard } from "@/components/movie-card"
import { SearchFilter } from "@/components/search-filter"
import { useMovies } from "@/hooks/use-movies"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import type { Movie } from "@/types"

export default function WatchedPage() {
  const { movies, loading, deleteMovie } = useMovies()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("dateAdded")

  const handleEdit = (movie: Movie) => {
    router.push(`/edit/${movie.id}`)
  }

  const watchedMovies = useMemo(() => {
    let filtered = movies.filter((movie) => movie.type === "watched")

    if (searchQuery) {
      filtered = filtered.filter(
        (movie) =>
          movie.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Sort movies
    switch (sortBy) {
      case "name":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating)
      case "releaseDate":
        return [...filtered].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
      case "dateAdded":
        return [...filtered].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      default:
        return filtered
    }
  }, [movies, searchQuery, sortBy])

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your movies...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Watched Movies
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Your completed movie collection ({watchedMovies.length} movies)
          </p>
        </div>

        <SearchFilter onSearch={setSearchQuery} onSort={setSortBy} searchQuery={searchQuery} sortBy={sortBy} />

        {watchedMovies.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 dark:text-gray-400">
                <h3 className="text-xl font-semibold mb-2">No watched movies yet!</h3>
                <p>Start adding movies you've already watched to build your collection.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {watchedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onEdit={handleEdit} onDelete={deleteMovie} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
