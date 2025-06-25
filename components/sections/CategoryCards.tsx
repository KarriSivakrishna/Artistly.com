"use client"

import { Button } from "@/components/ui/button"
import CategoryCard from "@/components/cards/CategoryCard"
import Link from "next/link"

// Category data with Indian Rupee pricing
const categories = [
  {
    title: "Singers",
    description: "Solo singers, singing guitarists, singing pianists, unique original artists and much more!",
    priceInRupees: 15000,
    imageUrl: "/images/categories/singer-performer.png",
    href: "/artists?category=singers",
  },
  {
    title: "Dancers",
    description: "Professional dancers for all styles - contemporary, hip-hop, ballroom, and cultural performances.",
    priceInRupees: 20000,
    imageUrl: "/images/categories/dancer-performer.png",
    href: "/artists?category=dancers",
  },
  {
    title: "Speakers",
    description: "Motivational speakers, keynote presenters, and industry experts for your events.",
    priceInRupees: 35000,
    imageUrl: "/images/categories/speaker-performer.png",
    href: "/artists?category=speakers",
  },
  {
    title: "DJs",
    description: "Pop, Rock, Jazz, Electronic, Soul & Motown... you name it - we've got it!",
    priceInRupees: 25000,
    imageUrl: "/images/categories/dj-performer.png",
    href: "/artists?category=djs",
  },
]

export default function CategoryCards() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Popular Categories
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover talented artists across different categories for your next event
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              imageUrl={category.imageUrl}
              title={category.title}
              priceInRupees={category.priceInRupees}
              description={category.description}
              href={category.href}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold"
          >
            <Link href="/artists">Explore All Artists</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
