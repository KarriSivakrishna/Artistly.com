/**
 * Utility functions for formatting prices in Indian Rupees
 */

/**
 * Format a single price in Indian Rupees with proper formatting
 */
export const formatIndianPrice = (price: number): string => {
  return `₹${price.toLocaleString("en-IN")}`
}

/**
 * Format a price range in Indian Rupees
 */
export const formatIndianPriceRange = (min: number, max: number): string => {
  return `₹${min.toLocaleString("en-IN")}-${max.toLocaleString("en-IN")}`
}

/**
 * Format price with "From" prefix for display
 */
export const formatPriceWithFrom = (price: number): string => {
  return `From ${formatIndianPrice(price)}`
}

/**
 * Format price range with "From" prefix for display
 */
export const formatPriceRangeWithFrom = (min: number, max: number): string => {
  return `From ${formatIndianPriceRange(min, max)}`
}

/**
 * Parse price string to extract numeric values
 */
export const parsePriceRange = (priceString: string): { min: number; max: number } | null => {
  // Remove ₹ symbol and commas, then extract numbers
  const cleanString = priceString.replace(/₹|,/g, "")
  const matches = cleanString.match(/(\d+)-(\d+)/)

  if (matches) {
    return {
      min: Number.parseInt(matches[1], 10),
      max: Number.parseInt(matches[2], 10),
    }
  }

  return null
}

/**
 * Convert dollar amounts to approximate rupee amounts (for migration)
 * Using approximate rate of 1 USD = 83 INR
 */
export const convertDollarToRupee = (dollarAmount: number): number => {
  return Math.round(dollarAmount * 83)
}

/**
 * Format price for form display (without "From" prefix)
 */
export const formatFormPrice = (min: number, max: number): string => {
  return `₹${min.toLocaleString("en-IN")} - ₹${max.toLocaleString("en-IN")}`
}
