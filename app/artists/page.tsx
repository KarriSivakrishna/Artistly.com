import type { Metadata } from "next"
import { Suspense } from "react"
import Header from "@/components/layout/Header"
import ArtistListing from "@/components/sections/ArtistListing"
import Footer from "@/components/layout/Footer"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

/**
 * Artist listing page metadata
 */
export const metadata: Metadata = {
  title: "Find Artists - Browse Professional Performers",
  description:
    "Browse and filter through hundreds of professional artists. Find singers, dancers, speakers, DJs and more for your next event.",
  openGraph: {
    title: "Find Artists - Browse Professional Performers | Artistly",
    description: "Browse and filter through hundreds of professional artists for your next event.",
    url: "https://artistly.com/artists",
  },
}

/**
 * Artist listing page component
 */
export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <ArtistListing />
      </Suspense>
      <Footer />
    </div>
  )
}
