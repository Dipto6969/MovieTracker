"use client"

import { useState, useMemo } from "react"
import { Layout } from "@/components/layout"
import { MovieCard } from "@/components/movie-card"
import { SearchFilter } from "@/components/search-filter"
import { useMovies } from "@/hooks/use-movies"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import type { Movie } from "@/types/movie"

export default function WatchlistPage() {
  const { movies, loading, deleteMovie, updateMovie } = useMovies()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("dateAdded")

  const handleEdit = (movie: Movie) => {
    router.push(`/edit/${movie.id}`)
  }

  const markAsWatched = (movie: Movie) => {
    updateMovie(movie.id, { type: "watched" })
  }

  const watchlistMovies = useMemo(() => {
    let filtered = movies.filter((movie) => movie.type === "watchlist")

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
        return [...filtered].sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())
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
            <p className="mt-4 text-gray-600">Loading your watchlist...</p>
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
            My Watchlist
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Movies you want to watch ({watchlistMovies.length} movies)
          </p>
        </div>

        <SearchFilter onSearch={setSearchQuery} onSort={setSortBy} searchQuery={searchQuery} sortBy={sortBy} />

        {watchlistMovies.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 dark:text-gray-400">
                <h3 className="text-xl font-semibold mb-2">Your watchlist is empty!</h3>
                <p className="mb-4">Add movies you want to watch to keep track of them.</p>
                <Button onClick={() => router.push("/add")} className="bg-gradient-to-r from-purple-500 to-pink-500">
                  Add Your First Movie
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {watchlistMovies.map((movie) => (
              <div key={movie.id} className="relative">
                <MovieCard movie={movie} onEdit={handleEdit} onDelete={deleteMovie} />
                {/* Mark as Watched Button */}
                <div className="absolute top-2 left-2 z-10">
                  <Button
                    size="sm"
                    onClick={() => markAsWatched(movie)}
                    className="bg-green-500/90 hover:bg-green-600/90 text-white backdrop-blur-sm"
                    title="Mark as watched"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
