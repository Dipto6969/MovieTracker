"use client"

import { useRouter } from "next/navigation"
import { Layout } from "@/components/layout"
import { MovieForm } from "@/components/movie-form"
import { useMovies } from "@/hooks/use-movies"
import type { MovieFormData } from "@/types/movie"
import { toast } from "sonner"

export default function AddMoviePage() {
  const router = useRouter()
  const { addMovie } = useMovies()

  const handleSubmit = (data: MovieFormData) => {
    try {
      addMovie(data)
      toast.success("Movie added successfully!")
      router.push("/")
    } catch (error) {
      toast.error("Failed to add movie. Please try again.")
    }
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Add New Movie
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Add a new movie to your collection</p>
        </div>

        <MovieForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  )
}
