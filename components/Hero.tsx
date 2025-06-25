"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    if (location) params.set("location", location)
    router.push(`/artists?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-slate-900">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
        }}
      >
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto xl:mr-80">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            The fastest way to find
            <br />
            and book amazing artists
          </h1>

          {/* Search Box */}
          <div className="bg-white rounded-lg p-2 shadow-xl max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Try 'Singer' or 'Jazz band'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-0 focus-visible:ring-0 text-lg h-12"
                />
              </div>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full sm:w-48 border-0 focus:ring-0 text-lg h-12">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="kolkata">Kolkata</SelectItem>
                  <SelectItem value="goa">Goa</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleSearch}
                className="bg-primary hover:bg-primary/90 text-white px-8 h-12 text-lg font-semibold"
              >
                Start
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">{"★".repeat(5)}</div>
              <span className="text-sm">Over 10,000 5-star reviews</span>
            </div>
          </div>
        </div>

        {/* Booking Protection Card */}
        <div className="absolute top-8 right-8 hidden xl:block z-20">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-xs shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold text-green-900">Booking protection</h3>
            </div>
            <div className="space-y-2 text-sm text-green-800">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Secure online payments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Free 48hr cancellations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Support available Mon-Sat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
