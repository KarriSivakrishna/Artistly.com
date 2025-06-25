export interface OnboardingFormData {
  name: string
  bio: string
  categories: string[]
  languages: string[]
  feeRange: string
  profileImage?: File | null
  location: string
}

export interface FormSection {
  id: string
  title: string
  description: string
}
