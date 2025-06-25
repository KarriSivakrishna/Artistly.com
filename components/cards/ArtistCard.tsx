"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Shield, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { useApp } from "@/providers/AppProvider"
import type { Artist } from "@/types/artist"
import { formatIndianPriceRange } from "@/lib/priceUtils"

interface ArtistCardProps {
  artist: Artist
  className?: string
  index?: number
}

/**
 * Reusable artist card component with animations and favorites
 */
export default function ArtistCard({ artist, className = "", index = 0 }: ArtistCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addToFavorites, removeFromFavorites, isFavorite } = useApp()
  const isArtistFavorite = isFavorite(artist.id)

  /**
   * Handle favorite toggle
   */
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isArtistFavorite) {
      removeFromFavorites(artist.id)
    } else {
      addToFavorites(artist)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={className}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden">
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
          aria-label={isArtistFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isArtistFavorite ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>

        <CardContent className="p-0">
          {/* Artist Image */}
          <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-t-lg overflow-hidden relative">
            {!imageLoaded && <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />}
            <img
              src={artist.image || "/placeholder.svg"}
              alt={`${artist.name} - ${artist.category} artist`}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          </div>

          {/* Artist Information */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">{artist.name}</h3>
              <div className="flex items-center gap-1">
                <Badge variant="secondary">{artist.category}</Badge>
                {artist.verified && (
                  <Shield className="h-4 w-4 text-green-600" title="Verified Artist" aria-label="Verified Artist" />
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
              <span className="text-sm font-medium">{artist.rating}</span>
              <span className="text-sm text-gray-500">({artist.reviews} reviews)</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 mb-2 text-gray-600 dark:text-gray-300">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm line-clamp-1">{artist.location}</span>
            </div>

            {/* Price in Indian Rupees */}
            <div className="mb-4">
              <span className="text-lg font-semibold text-primary">
                {formatIndianPriceRange(artist.priceMin, artist.priceMax)}
              </span>
            </div>

            {/* Bio */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{artist.bio}</p>
            </div>

            {/* Languages */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {artist.languages.slice(0, 3).map((lang) => (
                  <Badge key={lang} variant="outline" className="text-xs">
                    {lang}
                  </Badge>
                ))}
                {artist.languages.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{artist.languages.length - 3}
                  </Badge>
                )}
              </div>
            </div>

            {/* Action Button */}
            <Button className="w-full bg-primary hover:bg-primary/90 transition-colors">View Profile</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
