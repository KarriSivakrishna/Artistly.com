import type { Category } from "@/types/category"

/**
 * Default category data with Indian Rupee pricing
 */
export const defaultCategories: Category[] = [
  {
    title: "Singers",
    description: "Solo singers, singing guitarists, singing pianists, unique original artists and much more!",
    priceInRupees: 15000,
    imageUrl: "/images/categories/singers.jpg", // Replace with your actual image
    href: "/artists?category=singers",
  },
  {
    title: "Dancers",
    description: "Professional dancers for all styles - contemporary, hip-hop, ballroom, and cultural performances.",
    priceInRupees: 20000,
    imageUrl: "/images/categories/dancers.jpg", // Replace with your actual image
    href: "/artists?category=dancers",
  },
  {
    title: "Speakers",
    description: "Motivational speakers, keynote presenters, and industry experts for your events.",
    priceInRupees: 35000,
    imageUrl: "/images/categories/speakers.jpg", // Replace with your actual image
    href: "/artists?category=speakers",
  },
  {
    title: "DJs",
    description: "Pop, Rock, Jazz, Electronic, Soul & Motown... you name it - we've got it!",
    priceInRupees: 25000,
    imageUrl: "/images/categories/djs.jpg", // Replace with your actual image
    href: "/artists?category=djs",
  },
]

/**
 * Format price in Indian Rupees with proper formatting
 */
export const formatIndianPrice = (price: number): string => {
  return `From ₹${price.toLocaleString("en-IN")}`
}

/**
 * Get category by title
 */
export const getCategoryByTitle = (title: string): Category | undefined => {
  return defaultCategories.find((category) => category.title.toLowerCase() === title.toLowerCase())
}
