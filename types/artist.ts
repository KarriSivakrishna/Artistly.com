export interface Artist {
  id: number
  name: string
  category: string
  location: string
  city: string
  state: string
  priceMin: number
  priceMax: number
  rating: number
  reviews: number
  image: string
  languages: string[]
  bio: string
  verified: boolean
}

export interface FilterState {
  categories: string[]
  location: string
  priceRange: [number, number]
  searchQuery: string
}
