"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useMovies } from "@/hooks/use-movies"
import { Star, Calendar, ExternalLink, Edit, ArrowLeft, Play, User } from "lucide-react"
import type { Movie } from "@/types/movie"

export default function MovieDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { movies, updateMovie } = useMovies()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showTrailer, setShowTrailer] = useState(false)
  const [posterError, setPosterError] = useState(false)

  useEffect(() => {
    const foundMovie = movies.find((m) => m.id === params.id)
    setMovie(foundMovie || null)
  }, [movies, params.id])

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url
  }

  const handleEdit = () => {
    router.push(`/edit/${movie.id}`)
  }

  const getGradientColor = (name: string) => {
    const colors = [
      "from-purple-400 to-pink-400",
      "from-blue-400 to-cyan-400",
      "from-green-400 to-teal-400",
      "from-yellow-400 to-orange-400",
      "from-red-400 to-pink-400",
      "from-indigo-400 to-purple-400",
    ]
    const index = name.length % colors.length
    return colors[index]
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Back Button */}
        <Button onClick={() => router.back()} variant="outline" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Movie Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="aspect-[2/3] relative">
                {movie.poster && !posterError ? (
                  <Image
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.name}
                    fill
                    className="object-cover"
                    onError={() => setPosterError(true)}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${getGradientColor(movie.name)} flex items-center justify-center`}
                  >
                    <span className="text-white font-bold text-6xl">{movie.name.charAt(0).toUpperCase()}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Movie Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {movie.name}
                  </h1>
                  {movie.nickname && <p className="text-xl text-gray-600 dark:text-gray-400">"{movie.nickname}"</p>}
                </div>
                <Button onClick={handleEdit} className="bg-gradient-to-r from-purple-500 to-pink-500">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold">{movie.rating}/10</span>
                </div>
                <Badge
                  variant={movie.type === "watched" ? "default" : "secondary"}
                  className={
                    movie.type === "watched"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }
                >
                  {movie.type === "watched" ? "Watched" : "Coming Soon"}
                </Badge>
              </div>

              {/* Release Date */}
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">{formatDate(movie.releaseDate)}</span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.map((genre) => (
                  <Badge key={genre} variant="outline" className="text-sm">
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {movie.trailer && (
                  <Button
                    onClick={() => setShowTrailer(!showTrailer)}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {showTrailer ? "Hide Trailer" : "Watch Trailer"}
                  </Button>
                )}
                {movie.link && (
                  <Button
                    onClick={() => window.open(movie.link, "_blank")}
                    variant="outline"
                    className="border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    MyDramaList
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trailer Section */}
        {showTrailer && movie.trailer && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Trailer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full">
                <iframe
                  src={getYouTubeEmbedUrl(movie.trailer)}
                  title={`${movie.name} Trailer`}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cast Section */}
        {movie.cast.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Cast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {movie.cast.map((actor, index) => (
                  <div key={index} className="text-center">
                    <div className="aspect-square mb-2 relative overflow-hidden rounded-lg">
                      {actor.photo ? (
                        <Image
                          src={actor.photo || "/placeholder.svg"}
                          alt={actor.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 150px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
                          {actor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-center">{actor.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes Section */}
        {movie.notes && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{movie.notes}</p>
            </CardContent>
          </Card>
        )}

        {/* Movie Details */}
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-semibold text-gray-600 dark:text-gray-400">Release Date:</span>
                <span className="ml-2">{formatDate(movie.releaseDate)}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600 dark:text-gray-400">Status:</span>
                <span className="ml-2 capitalize">{movie.type.replace("-", " ")}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600 dark:text-gray-400">Rating:</span>
                <span className="ml-2">{movie.rating}/10</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600 dark:text-gray-400">Genres:</span>
                <span className="ml-2">{movie.genre.join(", ")}</span>
              </div>
              {movie.link && (
                <div className="md:col-span-2">
                  <span className="font-semibold text-gray-600 dark:text-gray-400">MyDramaList:</span>
                  <a
                    href={movie.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-purple-600 hover:text-purple-800 underline"
                  >
                    View on MyDramaList
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
