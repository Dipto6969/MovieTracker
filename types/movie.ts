export interface CastMember {
  name: string
  photo: string
}

export interface Movie {
  id: string
  name: string
  poster: string
  trailer: string
  genre: string[]
  nickname: string
  rating: number
  cast: CastMember[]
  releaseDate: string
  type: "watched" | "coming-soon" | "watchlist"
  link: string
  dateAdded: string
  notes?: string
}

export interface MovieFormData {
  name: string
  poster: string
  trailer: string
  genre: string[]
  nickname: string
  rating: number
  cast: CastMember[]
  releaseDate: string
  type: "watched" | "coming-soon" | "watchlist"
  link: string
  notes?: string
}
