export interface ArtistSubmission {
  id: number
  name: string
  category: string
  city: string
  fee: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  email: string
  phone: string
}

export interface TableAction {
  label: string
  onClick: (submission: ArtistSubmission) => void
  variant?: "default" | "destructive" | "outline" | "secondary"
  disabled?: boolean
}
