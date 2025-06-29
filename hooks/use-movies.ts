"use client"

import { useState, useEffect } from "react"
import type { Movie, MovieFormData } from "@/types/movie"
import { sampleMovies } from "@/data/sample-movies"

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedMovies = localStorage.getItem("movies")
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies))
    } else {
      // Initialize with sample data if no movies exist
      setMovies(sampleMovies)
      localStorage.setItem("movies", JSON.stringify(sampleMovies))
    }
    setLoading(false)
  }, [])

  const saveMovies = (newMovies: Movie[]) => {
    setMovies(newMovies)
    localStorage.setItem("movies", JSON.stringify(newMovies))
  }

  const addMovie = (movieData: MovieFormData) => {
    const newMovie: Movie = {
      ...movieData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
    }
    saveMovies([...movies, newMovie])
  }

  const updateMovie = (id: string, movieData: Partial<Movie>) => {
    const updatedMovies = movies.map((movie) => (movie.id === id ? { ...movie, ...movieData } : movie))
    saveMovies(updatedMovies)
  }

  const deleteMovie = (id: string) => {
    const filteredMovies = movies.filter((movie) => movie.id !== id)
    saveMovies(filteredMovies)
  }

  const getWatchedMovies = () => movies.filter((movie) => movie.type === "watched")

  const getComingSoonMovies = () => movies.filter((movie) => movie.type === "coming-soon")

  const searchMovies = (query: string) => {
    return movies.filter(
      (movie) =>
        movie.name.toLowerCase().includes(query.toLowerCase()) ||
        movie.nickname.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.some((g) => g.toLowerCase().includes(query.toLowerCase())),
    )
  }

  const sortMovies = (movieList: Movie[], sortBy: string) => {
    switch (sortBy) {
      case "name":
        return [...movieList].sort((a, b) => a.name.localeCompare(b.name))
      case "rating":
        return [...movieList].sort((a, b) => b.rating - a.rating)
      case "releaseDate":
        return [...movieList].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
      case "dateAdded":
        return [...movieList].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      default:
        return movieList
    }
  }

  const clearAllMovies = () => {
    setMovies([])
    localStorage.removeItem("movies")
  }

  const resetToSampleData = () => {
    setMovies(sampleMovies)
    localStorage.setItem("movies", JSON.stringify(sampleMovies))
  }

  return {
    movies,
    loading,
    addMovie,
    updateMovie,
    deleteMovie,
    getWatchedMovies,
    getComingSoonMovies,
    searchMovies,
    sortMovies,
    clearAllMovies,
    resetToSampleData,
  }
}
