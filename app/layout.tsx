import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { AppProvider } from "@/providers/AppProvider"

const inter = Inter({ subsets: ["latin"] })

/**
 * Root layout metadata for SEO optimization
 */
export const metadata: Metadata = {
  title: {
    default: "Artistly - Find and Book Amazing Artists",
    template: "%s | Artistly",
  },
  description:
    "The fastest way to find and book great artists for your events. Singers, dancers, speakers, DJs and more. Professional talent booking platform.",
  keywords: [
    "artists",
    "booking",
    "events",
    "singers",
    "dancers",
    "speakers",
    "DJs",
    "entertainment",
    "talent",
    "performers",
  ],
  authors: [{ name: "Artistly Team" }],
  creator: "Artistly",
  publisher: "Artistly",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://artistly.com",
    title: "Artistly - Find and Book Amazing Artists",
    description: "The fastest way to find and book great artists for your events.",
    siteName: "Artistly",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Artistly - Artist Booking Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artistly - Find and Book Amazing Artists",
    description: "The fastest way to find and book great artists for your events.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

/**
 * Root layout component with providers and global styles
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AppProvider>{children}</AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
