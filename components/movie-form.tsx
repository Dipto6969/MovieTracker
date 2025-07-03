// Updated version of your first MovieForm with poster as URL and cast fields restored.
"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { Star, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { MovieFormData } from "@/types/movie"

interface MovieFormProps {
  onSubmit: (data: MovieFormData) => void
  initialData?: Partial<MovieFormData>
  isEditing?: boolean
}

const GENRES = [
  "Action", "Adventure", "Animation", "Comedy", "Crime",
  "Documentary", "Drama", "Family", "Fantasy", "History",
  "Horror", "Music", "Mystery", "Romance", "Science Fiction",
  "TV Movie", "Thriller", "War", "Western",
]

export function MovieForm({ onSubmit, initialData, isEditing = false }: MovieFormProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>(initialData?.genre || [])
  const [newGenre, setNewGenre] = useState("")
  const [rating, setRating] = useState(initialData?.rating || 0)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<MovieFormData>({
    defaultValues: {
      name: initialData?.name || "",
      poster: initialData?.poster || "",
      trailer: initialData?.trailer || "",
      genre: initialData?.genre || [],
      nickname: initialData?.nickname || "",
      rating: initialData?.rating || 0,
      cast: initialData?.cast || [],
      releaseDate: initialData?.releaseDate || "",
      type: initialData?.type || "watchlist",
      link: initialData?.link || "",
      notes: initialData?.notes || "",
    },
  })

  const { fields: castFields, append: appendCast, remove: removeCast } = useFieldArray({
    control,
    name: "cast",
  })

  const addGenre = (genre: string) => {
    if (genre && !selectedGenres.includes(genre)) {
      const newGenres = [...selectedGenres, genre]
      setSelectedGenres(newGenres)
      setValue("genre", newGenres)
    }
    setNewGenre("")
  }

  const removeGenre = (genre: string) => {
    const newGenres = selectedGenres.filter((g) => g !== genre)
    setSelectedGenres(newGenres)
    setValue("genre", newGenres)
  }

  const handleFormSubmit = (data: MovieFormData) => {
    onSubmit({
      ...data,
      genre: selectedGenres,
      rating: rating,
    })
  }

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardTitle className="text-2xl">{isEditing ? "Edit Movie" : "Add New Movie"}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Movie Name *</Label>
                <Input id="name" {...register("name", { required: "Movie name is required" })} className="mt-2" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="nickname">Nickname</Label>
                <Input id="nickname" {...register("nickname")} placeholder="e.g., CLOY" className="mt-2" />
              </div>

              <div>
                <Label htmlFor="poster">Poster URL</Label>
                <Input id="poster" {...register("poster")} placeholder="https://..." className="mt-2" />
              </div>

              <div>
                <Label htmlFor="trailer">Trailer URL</Label>
                <Input id="trailer" {...register("trailer")} placeholder="https://youtube.com/watch?v=..." className="mt-2" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="releaseDate">Release Date *</Label>
                <Input id="releaseDate" type="date" {...register("releaseDate", { required: "Release date is required" })} className="mt-2" />
                {errors.releaseDate && <p className="text-red-500 text-sm mt-1">{errors.releaseDate.message}</p>}
              </div>

              <div>
                <Label>Type *</Label>
                <Select
                  onValueChange={(value) => setValue("type", value as "watched" | "coming-soon" | "watchlist")}
                  defaultValue={initialData?.type || "watchlist"}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="watchlist">Want to Watch</SelectItem>
                    <SelectItem value="watched">Already Watched</SelectItem>
                    <SelectItem value="coming-soon">Coming Soon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div>
                <Label>Rating (0-10)</Label>
                <div className="flex items-center gap-2 mt-2">
                  {[...Array(10)].map((_, i) => (
                    <button
                      key={i + 1}
                      type="button"
                      onClick={() => setRating(i + 1)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${i + 1 <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-medium">{rating}/10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div>
            <Label>Genres</Label>
            <div className="mt-4 space-y-2">
              <div className="flex flex-wrap gap-2">
                {selectedGenres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    {genre}
                    <button type="button" onClick={() => removeGenre(genre)} className="ml-1 hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                <Select onValueChange={addGenre}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Add genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENRES.filter((g) => !selectedGenres.includes(g)).map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-1">
                  <Input
                    placeholder="Custom genre"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    className="w-32"
                  />
                  <Button type="button" onClick={() => addGenre(newGenre)} size="sm" disabled={!newGenre}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Cast */}
          <div>
            <div className="flex items-center justify-between">
              <Label>Cast</Label>
              <Button type="button" onClick={() => appendCast({ name: "", photo: "" })} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" /> Add Cast Member
              </Button>
            </div>
            <div className="mt-2 space-y-2">
              {castFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-end">
                  <Input {...register(`cast.${index}.name`)} placeholder="Actor name" className="flex-1" />
                  <Input {...register(`cast.${index}.photo`)} placeholder="Photo URL (optional)" className="flex-1" />
                  <Button type="button" onClick={() => removeCast(index)} size="sm" variant="destructive">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Personal Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Your thoughts, reviews, or any additional notes..."
              className="mt-2"
              rows={4}
            />
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8"
            >
              {isEditing ? "Update Movie" : "Add Movie"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
