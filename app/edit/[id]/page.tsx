"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { MovieForm } from "@/components/movie-form"
import { useMovies } from "@/hooks/use-movies"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Movie, MovieFormData } from "@/types/movie"
import { toast } from "sonner"

export default function EditMoviePage() {
  const params = useParams()
  const router = useRouter()
  const { movies, updateMovie } = useMovies()
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    const foundMovie = movies.find((m) => m.id === params.id)
    setMovie(foundMovie || null)
  }, [movies, params.id])

  const handleSubmit = (data: MovieFormData) => {
    if (!movie) return

    try {
      updateMovie(movie.id, data)
      toast.success("Movie updated successfully!")
      router.push(`/movie/${movie.id}`)
    } catch (error) {
      toast.error("Failed to update movie. Please try again.")
    }
  }

  if (!movie) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-600 mb-2">Movie not found</h2>
            <Button onClick={() => router.push("/")} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-8">
        <Button onClick={() => router.back()} variant="outline" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Edit Movie
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Update "{movie.name}" details</p>
        </div>

        <MovieForm onSubmit={handleSubmit} initialData={movie} isEditing />
      </div>
    </Layout>
  )
}
