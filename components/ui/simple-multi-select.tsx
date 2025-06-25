"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Option {
  label: string
  value: string
}

interface SimpleMultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  maxSelections?: number
}

export function SimpleMultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className,
  disabled = false,
  maxSelections,
}: SimpleMultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      // Remove if already selected
      onChange(selected.filter((item) => item !== value))
    } else {
      // Add if not selected and under max limit
      if (!maxSelections || selected.length < maxSelections) {
        onChange([...selected, value])
      }
    }
  }

  const handleRemove = (value: string, event: React.MouseEvent) => {
    event.stopPropagation()
    onChange(selected.filter((item) => item !== value))
  }

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))

  const selectedOptions = options.filter((option) => selected.includes(option.value))

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        className={cn("w-full justify-between min-h-10 h-auto", className)}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-1 flex-wrap flex-1 text-left">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <Badge
                key={option.value}
                variant="secondary"
                className="mr-1 mb-1"
                onClick={(e) => handleRemove(option.value, e)}
              >
                {option.label}
                <X className="ml-1 h-3 w-3 text-muted-foreground hover:text-foreground" />
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
      </Button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Options List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">No options found</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selected.includes(option.value)
                const isDisabled = !isSelected && maxSelections && selected.length >= maxSelections

                return (
                  <div
                    key={option.value}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700",
                      isSelected && "bg-gray-50 dark:bg-gray-700",
                      isDisabled && "opacity-50 cursor-not-allowed",
                    )}
                    onClick={() => !isDisabled && handleSelect(option.value)}
                  >
                    <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                    <span className="flex-1">{option.label}</span>
                  </div>
                )
              })
            )}
          </div>

          {/* Selection Info */}
          {maxSelections && (
            <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
              {selected.length} of {maxSelections} selected
            </div>
          )}
        </div>
      )}
    </div>
  )
}
