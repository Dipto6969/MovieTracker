"use client"

import { useState, useMemo } from "react"
import { Layout } from "@/components/layout"
import { MovieCard } from "@/components/movie-card"
import { SearchFilter } from "@/components/search-filter"
import { useMovies } from "@/hooks/use-movies"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Clock, Star, TrendingUp, Bookmark } from "lucide-react"
import type { Movie } from "@/types/movie"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { movies, loading, deleteMovie } = useMovies()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("dateAdded")
  const router = useRouter()

  const watchedMovies = useMemo(() => movies.filter((m) => m.type === "watched"), [movies])
  const comingSoonMovies = useMemo(() => movies.filter((m) => m.type === "coming-soon"), [movies])
  const watchlistMovies = useMemo(() => movies.filter((m) => m.type === "watchlist"), [movies])

  const filteredMovies = useMemo(() => {
    let filtered = movies

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

  const averageRating = useMemo(() => {
    if (watchedMovies.length === 0) return 0
    return (watchedMovies.reduce((sum, movie) => sum + movie.rating, 0) / watchedMovies.length).toFixed(1)
  }, [watchedMovies])

  const handleEdit = (movie: Movie) => {
    router.push(`/edit/${movie.id}`)
  }

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
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Welcome to Your Movie Collection
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Track, rate, and organize all your favorite movies in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Movies</p>
                  <p className="text-3xl font-bold">{movies.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Watched</p>
                  <p className="text-3xl font-bold">{watchedMovies.length}</p>
                </div>
                <Eye className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Watchlist</p>
                  <p className="text-3xl font-bold">{watchlistMovies.length}</p>
                </div>
                <Bookmark className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Coming Soon</p>
                  <p className="text-3xl font-bold">{comingSoonMovies.length}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Avg Rating</p>
                  <p className="text-3xl font-bold">{averageRating}</p>
                </div>
                <Star className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <SearchFilter onSearch={setSearchQuery} onSort={setSortBy} searchQuery={searchQuery} sortBy={sortBy} />

        {/* Movies Grid */}
        {filteredMovies.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 dark:text-gray-400">
                {movies.length === 0 ? (
                  <>
                    <h3 className="text-xl font-semibold mb-2">No movies yet!</h3>
                    <p>Start building your collection by adding your first movie.</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mb-2">No movies found</h3>
                    <p>Try adjusting your search or filters.</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onEdit={handleEdit} onDelete={deleteMovie} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
