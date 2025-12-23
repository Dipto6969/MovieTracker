# 🎬 MovieTracker

<div align="center">

![MovieTracker Banner](https://images.unsplash.com/photo-1489599735734-79b4212bdd26?w=800&h=400&fit=crop)

**Your Personal Movie Collection Manager**

Track, rate, and organize all your favorite movies and TV shows in one beautiful place.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## ✨ Features

### 🎯 Core Features
- **📚 Movie Collection Management** - Add, edit, and delete movies with ease
- **⭐ Rating System** - Rate your watched movies from 1-10
- **🎭 Cast Management** - Track your favorite actors and actresses
- **🏷️ Genre Tagging** - Organize movies by multiple genres
- **📝 Personal Notes** - Add your thoughts and reviews

### 📊 Organization
- **👁️ Watched** - Keep track of movies you've already seen
- **🔖 Watchlist** - Save movies you want to watch
- **🎬 Coming Soon** - Track upcoming releases you're excited about

### 🔍 Search & Filter
- **Smart Search** - Search by movie name, nickname, or genre
- **Multiple Sort Options** - Sort by name, rating, release date, or date added
- **Real-time Filtering** - Instant results as you type

### 📈 Statistics Dashboard
- Total movie count across all categories
- Movies watched counter
- Watchlist and coming soon trackers
- Average rating calculation
- Beautiful stat cards with gradient backgrounds

### 🎨 User Experience
- **🌓 Dark Mode** - Easy on the eyes with theme switching
- **📱 Responsive Design** - Works beautifully on all devices
- **⚡ Fast Performance** - Built with Next.js for optimal speed
- **🎭 Beautiful UI** - Modern interface with smooth animations

---

## 🚀 Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI component library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component collection

### Form & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant form management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Additional Tools
- **[date-fns](https://date-fns.org/)** - Modern date utility library
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

---

## 📦 Installation

### Prerequisites
- **Node.js** 18.x or higher
- **npm**, **yarn**, or **pnpm** package manager

### Clone the Repository
```bash
git clone https://github.com/Dipto6969/MovieTracker.git
cd MovieTracker
```

### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 🎯 Usage

### Adding a Movie
1. Click the **"Add Movie"** button in the navigation
2. Fill in the movie details:
   - Movie name
   - Poster image URL
   - Trailer link
   - Genres (select multiple)
   - Nickname/abbreviation
   - Rating (1-10)
   - Cast members with photos
   - Release date
   - Category (Watched/Watchlist/Coming Soon)
   - External link (e.g., IMDb, MyDramaList)
   - Personal notes
3. Click **"Save Movie"**

### Editing a Movie
1. Click on any movie card
2. Click the edit icon
3. Modify the details
4. Save your changes

### Deleting a Movie
1. Click on any movie card
2. Click the delete icon
3. Confirm the deletion

### Searching Movies
- Use the search bar to filter by name, nickname, or genre
- Results update in real-time as you type

### Sorting Movies
- Choose from sort options:
  - **Date Added** (newest first)
  - **Name** (A-Z)
  - **Rating** (highest first)
  - **Release Date** (newest first)

### Viewing Statistics
- Dashboard shows real-time stats:
  - Total movies in your collection
  - Number of watched movies
  - Watchlist count
  - Coming soon count
  - Average rating of watched movies

---

## 📁 Project Structure

```
MovieTracker/
├── app/                    # Next.js App Router
│   ├── add/               # Add movie page
│   ├── coming-soon/       # Coming soon movies page
│   ├── edit/              # Edit movie page
│   ├── movie/             # Individual movie view
│   ├── watched/           # Watched movies page
│   ├── watchlist/         # Watchlist page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── layout.tsx        # Main layout component
│   ├── movie-card.tsx    # Movie card component
│   ├── movie-form.tsx    # Movie form component
│   └── search-filter.tsx # Search and filter component
├── data/                 # Data files
│   └── sample-movies.ts  # Sample movie data
├── hooks/                # Custom React hooks
│   └── use-movies.ts     # Movie management hook
├── lib/                  # Utility functions
│   └── utils.ts          # Helper utilities
├── public/               # Static assets
│   └── placeholder-*.png # Placeholder images
├── styles/               # Additional styles
├── types/                # TypeScript type definitions
│   └── movie.ts          # Movie type definitions
└── types.tsx             # Exported types
```

---

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

---

## 🎨 Features in Detail

### Movie Card
Each movie card displays:
- Movie poster with hover effects
- Movie name and nickname
- Release date
- Genre badges
- Rating with star icon
- Quick actions (view, edit, delete)

### Movie Form
Comprehensive form with:
- Image URL input with preview
- Multi-select genre picker
- Star rating selector
- Dynamic cast member management
- Date picker for release dates
- Category selector with radio buttons
- Rich text area for notes

### Statistics Dashboard
Color-coded stat cards showing:
- 🔵 Total Movies (Blue gradient)
- 🟢 Watched Movies (Green gradient)
- 🟡 Watchlist (Yellow gradient)
- 🟠 Coming Soon (Orange gradient)
- 🟣 Average Rating (Purple gradient)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Known Issues

- None at the moment! Feel free to report any bugs you find.

---

## 🔮 Future Enhancements

- [ ] Backend integration with database
- [ ] User authentication and profiles
- [ ] Social features (share lists, recommendations)
- [ ] Advanced filtering (by cast, year range, etc.)
- [ ] Movie import from TMDB/IMDb API
- [ ] Export collection to CSV/JSON
- [ ] Streaming service tracking
- [ ] Watch party scheduling
- [ ] Mobile app version

---

## 📸 Screenshots

### Homepage Dashboard
![Dashboard](https://via.placeholder.com/800x500/667eea/ffffff?text=Movie+Dashboard)

### Movie Collection
![Collection](https://via.placeholder.com/800x500/764ba2/ffffff?text=Movie+Collection)

### Add/Edit Movie
![Form](https://via.placeholder.com/800x500/f093fb/ffffff?text=Movie+Form)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Dipto6969**

- GitHub: [@Dipto6969](https://github.com/Dipto6969)

---

## 🙏 Acknowledgments

- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Inspiration from various movie tracking apps
- Sample images from [Unsplash](https://unsplash.com/)

---

## 💖 Support

If you like this project, please give it a ⭐ on GitHub!

---

<div align="center">

**Made with ❤️ by Dipto6969**

[⬆ Back to Top](#-movietracker)

</div>
