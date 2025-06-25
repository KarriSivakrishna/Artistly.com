export interface Category {
  title: string
  description: string
  priceInRupees: number
  imageUrl: string
  href: string
}

export interface CategoryCardProps {
  imageUrl: string
  title: string
  priceInRupees: number
  description: string
  href: string
  index?: number
}

export interface CategoryShowcaseProps {
  categories: Category[]
  title?: string
  subtitle?: string
  className?: string
}
