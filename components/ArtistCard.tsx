"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Shield } from "lucide-react"
import type { Artist } from "@/types/artist"
import { formatIndianPriceRange } from "@/lib/priceUtils"

interface ArtistCardProps {
  artist: Artist
  className?: string
}

export default function ArtistCard({ artist, className = "" }: ArtistCardProps) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <CardContent className="p-0">
        <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-t-lg overflow-hidden">
          <img
            src={artist.image || "/placeholder.svg"}
            alt={artist.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">{artist.name}</h3>
            <div className="flex items-center gap-1">
              <Badge variant="secondary">{artist.category}</Badge>
              {artist.verified && <Shield className="h-4 w-4 text-green-600" title="Verified Artist" />}
            </div>
          </div>

          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{artist.rating}</span>
            <span className="text-sm text-gray-500">({artist.reviews})</span>
          </div>

          <div className="flex items-center gap-1 mb-2 text-gray-600 dark:text-gray-300">
            <MapPin className="h-4 w-4" />
            <span className="text-sm line-clamp-1">{artist.location}</span>
          </div>

          <div className="mb-4">
            <span className="text-lg font-semibold text-primary">
              {formatIndianPriceRange(artist.priceMin, artist.priceMax)}
            </span>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{artist.bio}</p>
          </div>

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

          <Button className="w-full bg-primary hover:bg-primary/90">Ask for Quote</Button>
        </div>
      </CardContent>
    </Card>
  )
}
