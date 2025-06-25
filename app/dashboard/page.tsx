import type { Metadata } from "next"
import { Suspense } from "react"
import Header from "@/components/layout/Header"
import ManagerDashboard from "@/components/sections/ManagerDashboard"
import Footer from "@/components/layout/Footer"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

/**
 * Dashboard page metadata
 */
export const metadata: Metadata = {
  title: "Manager Dashboard - Manage Artist Submissions",
  description: "Manage artist submissions, review applications, and approve new talent for your platform.",
  openGraph: {
    title: "Manager Dashboard - Manage Artist Submissions | Artistly",
    description: "Manage artist submissions and review applications on your dashboard.",
    url: "https://artistly.com/dashboard",
  },
}

/**
 * Dashboard page component
 */
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <ManagerDashboard />
      </Suspense>
      <Footer />
    </div>
  )
}
