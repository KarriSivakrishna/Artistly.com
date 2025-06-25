"use client"

import CategoryCard from "@/components/cards/CategoryCard"

interface CategoryShowcaseProps {
  categories: Array<{
    title: string
    description: string
    priceInRupees: number
    imageUrl: string
    href: string
  }>
  title?: string
  subtitle?: string
  className?: string
}

/**
 * Reusable category showcase component that can be used anywhere
 */
export default function CategoryShowcase({
  categories,
  title = "Featured Categories",
  subtitle = "Discover amazing talent for your events",
  className = "",
}: CategoryShowcaseProps) {
  return (
    <section className={`py-12 sm:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
      </div>
    </section>
  )
}
