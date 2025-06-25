import type { Metadata } from "next"
import { Suspense } from "react"
import Header from "@/components/layout/Header"
import OnboardingForm from "@/components/forms/OnboardingForm"
import Footer from "@/components/layout/Footer"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

/**
 * Onboarding page metadata
 */
export const metadata: Metadata = {
  title: "Join as Artist - Create Your Profile",
  description:
    "Join Artistly as a professional artist. Create your profile, showcase your talents, and start getting booked for events.",
  openGraph: {
    title: "Join as Artist - Create Your Profile | Artistly",
    description: "Join Artistly as a professional artist and start getting booked for events.",
    url: "https://artistly.com/onboarding",
  },
}

/**
 * Artist onboarding page component
 */
export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <OnboardingForm />
      </Suspense>
      <Footer />
    </div>
  )
}
