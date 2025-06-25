import type { Artist } from "@/types/artist"
import type { ArtistSubmission } from "@/types/submission"
import artistsData from "@/data/artists.json"
import submissionsData from "@/data/submissions.json"

/**
 * Get all artists data (for SSG)
 */
export async function getArtists(): Promise<Artist[]> {
  // Simulate API delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  return artistsData as Artist[]
}

/**
 * Get artist by ID (for SSG)
 */
export async function getArtistById(id: number): Promise<Artist | null> {
  const artists = await getArtists()
  return artists.find((artist) => artist.id === id) || null
}

/**
 * Get all submissions data (for SSR)
 */
export async function getSubmissions(): Promise<ArtistSubmission[]> {
  // Simulate API delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  return submissionsData as ArtistSubmission[]
}

/**
 * Get filtered artists by category
 */
export async function getArtistsByCategory(category: string): Promise<Artist[]> {
  const artists = await getArtists()
  return artists.filter((artist) => artist.category.toLowerCase() === category.toLowerCase())
}

/**
 * Search artists by query
 */
export async function searchArtists(query: string): Promise<Artist[]> {
  const artists = await getArtists()
  const searchTerm = query.toLowerCase()

  return artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchTerm) ||
      artist.bio.toLowerCase().includes(searchTerm) ||
      artist.category.toLowerCase().includes(searchTerm) ||
      artist.location.toLowerCase().includes(searchTerm),
  )
}
