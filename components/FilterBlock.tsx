"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import type { FilterState } from "@/types/artist"
import { formatIndianPrice } from "@/lib/priceUtils"

interface FilterBlockProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  categories: string[]
  className?: string
}

export default function FilterBlock({ filters, onFiltersChange, categories, className = "" }: FilterBlockProps) {
  const handleCategoryChange = (category: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category)

    onFiltersChange({
      ...filters,
      categories: updatedCategories,
    })
  }

  const handleLocationChange = (location: string) => {
    onFiltersChange({
      ...filters,
      location,
    })
  }

  const handlePriceRangeChange = (priceRange: [number, number]) => {
    onFiltersChange({
      ...filters,
      priceRange,
    })
  }

  const handleSearchChange = (searchQuery: string) => {
    onFiltersChange({
      ...filters,
      searchQuery,
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      location: "",
      priceRange: [0, 75000],
      searchQuery: "",
    })
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.location !== "" ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 75000 ||
    filters.searchQuery !== ""

  return (
    <Card className={`sticky top-24 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="text-base font-medium mb-3 block">
            Search Artists
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="search"
              placeholder="Search by name or bio..."
              value={filters.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <Label className="text-base font-medium mb-3 block">Category</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <Label htmlFor={category} className="text-sm font-normal cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location" className="text-base font-medium mb-3 block">
            Location
          </Label>
          <Input
            id="location"
            placeholder="Enter city or state"
            value={filters.location}
            onChange={(e) => handleLocationChange(e.target.value)}
          />
        </div>

        {/* Price Range in Indian Rupees */}
        <div>
          <Label className="text-base font-medium mb-3 block">
            Price Range: {formatIndianPrice(filters.priceRange[0])} - {formatIndianPrice(filters.priceRange[1])}
          </Label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => handlePriceRangeChange(value as [number, number])}
            max={75000}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹0</span>
            <span>₹75,000+</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
