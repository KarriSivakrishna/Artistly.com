"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import ArtistCard from "@/components/ArtistCard"
import FilterBlock from "@/components/FilterBlock"
import type { Artist, FilterState } from "@/types/artist"
import artistsData from "@/data/artists.json"

interface ArtistListingProps {
  initialArtists?: Artist[]
}

export default function ArtistListing({ initialArtists }: ArtistListingProps) {
  const [artists] = useState<Artist[]>((initialArtists || artistsData) as Artist[])
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    location: "",
    priceRange: [0, 75000],
    searchQuery: "",
  })

  // Get unique categories from the data
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(artists.map((artist) => artist.category))]
    return uniqueCategories.sort()
  }, [artists])

  // Filter artists based on current filter state
  const filteredArtists = useMemo(() => {
    let filtered = artists

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter((artist) => filters.categories.includes(artist.category))
    }

    // Filter by location (search in city, state, or full location)
    if (filters.location.trim()) {
      const locationQuery = filters.location.toLowerCase().trim()
      filtered = filtered.filter(
        (artist) =>
          artist.city.toLowerCase().includes(locationQuery) ||
          artist.state.toLowerCase().includes(locationQuery) ||
          artist.location.toLowerCase().includes(locationQuery),
      )
    }

    // Filter by price range
    filtered = filtered.filter((artist) => {
      const artistMinPrice = artist.priceMin
      const artistMaxPrice = artist.priceMax
      const [filterMin, filterMax] = filters.priceRange

      // Check if there's any overlap between artist price range and filter range
      return artistMinPrice <= filterMax && artistMaxPrice >= filterMin
    })

    // Filter by search query (name or bio)
    if (filters.searchQuery.trim()) {
      const searchQuery = filters.searchQuery.toLowerCase().trim()
      filtered = filtered.filter(
        (artist) => artist.name.toLowerCase().includes(searchQuery) || artist.bio.toLowerCase().includes(searchQuery),
      )
    }

    return filtered
  }, [artists, filters])

  // Handle URL parameters on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const categoryParam = urlParams.get("category")
      const locationParam = urlParams.get("location")
      const searchParam = urlParams.get("search")

      if (categoryParam || locationParam || searchParam) {
        setFilters((prev) => ({
          ...prev,
          categories: categoryParam
            ? [categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)]
            : prev.categories,
          location: locationParam || prev.location,
          searchQuery: searchParam || prev.searchQuery,
        }))
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Find Your Perfect Artist</h1>
          <p className="text-gray-600 dark:text-gray-300">
            {filteredArtists.length} {filteredArtists.length === 1 ? "artist" : "artists"} available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button variant="outline" onClick={() => setShowMobileFilters(!showMobileFilters)} className="w-full mb-4">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(filters.categories.length > 0 || filters.location || filters.searchQuery) && (
                <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                  {filters.categories.length + (filters.location ? 1 : 0) + (filters.searchQuery ? 1 : 0)}
                </span>
              )}
            </Button>
            {showMobileFilters && (
              <div className="mb-6">
                <FilterBlock filters={filters} onFiltersChange={setFilters} categories={categories} />
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-80">
            <FilterBlock filters={filters} onFiltersChange={setFilters} categories={categories} />
          </div>

          {/* Artist Grid */}
          <div className="flex-1">
            {filteredArtists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🎭</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No artists found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Try adjusting your filters or search criteria to find more artists.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        categories: [],
                        location: "",
                        priceRange: [0, 75000],
                        searchQuery: "",
                      })
                    }
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
