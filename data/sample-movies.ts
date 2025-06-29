import type { Movie } from "@/types/movie"

export const sampleMovies: Movie[] = [
  {
    id: "1",
    name: "Crash Landing on You",
    poster: "https://images.unsplash.com/photo-1489599735734-79b4212bdd26?w=400&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=GVQGWgeVc4k",
    genre: ["Romance", "Drama", "Comedy"],
    nickname: "CLOY",
    rating: 9.5,
    cast: [
      {
        name: "Hyun Bin",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Son Ye-jin",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Seo Ji-hye",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
    ],
    releaseDate: "2019-12-14",
    type: "watched",
    link: "https://mydramalist.com/33826-crash-landing-on-you",
    dateAdded: "2024-01-15T10:00:00.000Z",
    notes: "Amazing chemistry between the leads! The Switzerland scenes were breathtaking.",
  },
  {
    id: "2",
    name: "Squid Game",
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=oqxAJKy0ii4",
    genre: ["Thriller", "Drama", "Action"],
    nickname: "SG",
    rating: 8.8,
    cast: [
      {
        name: "Lee Jung-jae",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Park Hae-soo",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Wi Ha-jun",
        photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
      },
    ],
    releaseDate: "2021-09-17",
    type: "watched",
    link: "https://mydramalist.com/687637-squid-game",
    dateAdded: "2024-01-10T14:30:00.000Z",
    notes: "Intense and thought-provoking. The social commentary was brilliant.",
  },
  {
    id: "3",
    name: "Kingdom",
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=4l-yByZpaaM",
    genre: ["Horror", "Historical", "Thriller"],
    nickname: "Kingdom",
    rating: 9.0,
    cast: [
      {
        name: "Ju Ji-hoon",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Bae Doona",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
    ],
    releaseDate: "2019-01-25",
    type: "watched",
    link: "https://mydramalist.com/25159-kingdom",
    dateAdded: "2024-01-08T16:45:00.000Z",
    notes: "Perfect blend of historical drama and zombie horror!",
  },
  {
    id: "4",
    name: "Business Proposal",
    poster: "https://images.unsplash.com/photo-1489599735734-79b4212bdd26?w=400&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=xeWkOu7_4QY",
    genre: ["Romance", "Comedy"],
    nickname: "BP",
    rating: 8.5,
    cast: [
      {
        name: "Ahn Hyo-seop",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Kim Se-jeong",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
    ],
    releaseDate: "2022-02-28",
    type: "watched",
    link: "https://mydramalist.com/52813-business-proposal",
    dateAdded: "2024-01-05T12:20:00.000Z",
    notes: "Light-hearted and fun! Perfect comfort watch.",
  },
  {
    id: "5",
    name: "Moving",
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    trailer: "https://www.youtube.com/watch?v=fq3abPnEEGE",
    genre: ["Action", "Drama", "Supernatural"],
    nickname: "Moving",
    rating: 9.2,
    cast: [
      {
        name: "Ryu Seung-ryong",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Han Hyo-joo",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
    ],
    releaseDate: "2023-08-09",
    type: "coming-soon",
    link: "https://mydramalist.com/76239-moving",
    dateAdded: "2024-01-20T09:15:00.000Z",
    notes: "Can't wait to watch this superhero series!",
  },
]
