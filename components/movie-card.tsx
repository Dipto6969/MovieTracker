"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Calendar, Edit, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Movie } from "@/types/movie"
import { useRouter } from "next/navigation"

interface MovieCardProps {
  movie: Movie
  onEdit?: (movie: Movie) => void
  onDelete?: (id: string) => void
}

export function MovieCard({ movie, onEdit, onDelete }: MovieCardProps) {
  const [imageError, setImageError] = useState(false)
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/movie/${movie.id}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isComingSoon = movie.type === "coming-soon" && new Date(movie.releaseDate) > new Date()

  // Function to get a consistent color based on movie name
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
    <div onClick={handleCardClick} className="cursor-pointer">
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-lg">
        <div className="relative">
          <div className="aspect-[2/3] overflow-hidden">
            {movie.poster && !imageError ? (
              <Image
                src={movie.poster || "/placeholder.svg"}
                alt={movie.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-br ${getGradientColor(movie.name)} flex items-center justify-center`}
              >
                <span className="text-white font-bold text-4xl">{movie.name.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>

          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            {onEdit && (
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(movie)
                }}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(movie.id)
                }}
                className="bg-red-500/80 backdrop-blur-sm hover:bg-red-600/80"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Status badge */}
          {isComingSoon && (
            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Coming Soon
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-lg line-clamp-2 group-hover:text-purple-600 transition-colors">
                {movie.name}
              </h3>
              {movie.nickname && <p className="text-sm text-gray-600 dark:text-gray-400">"{movie.nickname}"</p>}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{movie.rating}/10</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1">
              {movie.genre.slice(0, 3).map((genre) => (
                <Badge key={genre} variant="secondary" className="text-xs">
                  {genre}
                </Badge>
              ))}
              {movie.genre.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{movie.genre.length - 3}
                </Badge>
              )}
            </div>

            {/* Release Date */}
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(movie.releaseDate)}</span>
            </div>

            {/* Cast */}
            {movie.cast.length > 0 && (
              <div className="flex -space-x-2">
                {movie.cast.slice(0, 3).map((actor, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-white relative"
                    title={actor.name}
                  >
                    {actor.photo ? (
                      <Image
                        src={actor.photo || "/placeholder.svg"}
                        alt={actor.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold">
                        {actor.name.charAt(0)}
                      </div>
                    )}
                  </div>
                ))}
                {movie.cast.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-bold border-2 border-white">
                    +{movie.cast.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
