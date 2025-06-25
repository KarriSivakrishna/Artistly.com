"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useState } from "react"

interface CategoryCardProps {
  imageUrl: string
  title: string
  priceInRupees: number
  description: string
  href: string
  index?: number
}

/**
 * Reusable category card component with custom images and Indian Rupee pricing
 */
export default function CategoryCard({
  imageUrl,
  title,
  priceInRupees,
  description,
  href,
  index = 0,
}: CategoryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  /**
   * Format price in Indian Rupees with proper formatting
   */
  const formatPrice = (price: number) => {
    return `From ₹${price.toLocaleString("en-IN")}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link href={href} className="block h-full">
        <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full overflow-hidden">
          <CardContent className="p-0 h-full flex flex-col">
            {/* Image Section */}
            <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden">
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Loading...</div>
                </div>
              )}

              {imageError ? (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-2xl mb-2">🎭</div>
                    <div className="text-sm">{title}</div>
                  </div>
                </div>
              ) : (
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt={`${title} category`}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              )}

              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">{title}</h3>
                <span className="text-sm sm:text-base font-medium text-primary whitespace-nowrap ml-2 flex-shrink-0">
                  {formatPrice(priceInRupees)}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed flex-1">
                {description}
              </p>

              {/* Hover indicator */}
              <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Explore {title}</span>
                <svg
                  className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
