import type { ArtistSubmission } from "@/types/submission"
import submissionsData from "@/data/submissions.json"

export interface ArtistProfilePayload {
  name: string
  bio: string
  categories: string[]
  languages: string[]
  feeRange: string
  profileImage?: File | null
  location: string
}

/**
 * Mock: submit a new artist profile.
 * Simulates a network call and always succeeds.
 */
export const submitArtistProfile = async (
  payload: ArtistProfilePayload,
): Promise<{ success: boolean; message: string }> => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800))

  console.log("=== NEW ARTIST PROFILE SUBMISSION ===")
  console.table(payload)
  console.log("Timestamp:", new Date().toISOString())
  console.log("=== END SUBMISSION ===")

  return {
    success: true,
    message: "Your profile has been created and is pending review.",
  }
}

// Mock API functions
export const fetchSubmissions = async (): Promise<ArtistSubmission[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return submissionsData as ArtistSubmission[]
}

export const updateSubmissionStatus = async (
  id: number,
  status: "approved" | "rejected",
): Promise<{ success: boolean; message: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  console.log(`=== SUBMISSION STATUS UPDATE ===`)
  console.log(`Submission ID: ${id}`)
  console.log(`New Status: ${status}`)
  console.log(`Timestamp: ${new Date().toISOString()}`)
  console.log(`=== END UPDATE ===`)

  return {
    success: true,
    message: `Submission ${status} successfully`,
  }
}

export const deleteSubmission = async (id: number): Promise<{ success: boolean; message: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  console.log(`=== SUBMISSION DELETION ===`)
  console.log(`Submission ID: ${id}`)
  console.log(`Timestamp: ${new Date().toISOString()}`)
  console.log(`=== END DELETION ===`)

  return {
    success: true,
    message: "Submission deleted successfully",
  }
}
