import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Users, Shield, Heart, Star, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { label: "Artists", value: "10,000+", icon: Users },
    { label: "Events Booked", value: "50,000+", icon: Music },
    { label: "Happy Clients", value: "25,000+", icon: Heart },
    { label: "Years Experience", value: "8+", icon: Award },
  ]

  const values = [
    {
      title: "Quality First",
      description: "We carefully vet all artists to ensure exceptional talent and professionalism.",
      icon: Star,
    },
    {
      title: "Secure Booking",
      description: "Your payments are protected with our secure booking system and cancellation policy.",
      icon: Shield,
    },
    {
      title: "Personal Support",
      description: "Our dedicated team is here to help you find the perfect artist for your event.",
      icon: Heart,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Artistly</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're passionate about connecting talented artists with amazing events. Our platform makes it easy to
            discover, book, and work with professional performers.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const IconComponent = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <IconComponent className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Founded in 2016, Artistly began with a simple mission: to make it easier for event organizers to find
                  and book talented artists. We saw how difficult it could be to discover the right performer for
                  special occasions.
                </p>
                <p>
                  Today, we're proud to be the leading platform connecting artists with clients across the country. Our
                  community includes singers, dancers, speakers, DJs, and many other talented performers who bring
                  events to life.
                </p>
                <p>
                  We believe every event deserves exceptional entertainment, and every artist deserves the opportunity
                  to share their talent with the world.
                </p>
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
              <Music className="h-32 w-32 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These principles guide everything we do at Artistly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => {
              const IconComponent = value.icon
              return (
                <Card key={value.title} className="text-center">
                  <CardContent className="p-8">
                    <IconComponent className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're looking to book an artist or join our community of performers, we're here to help make your
            next event unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/artists">Find Artists</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/onboarding">Join as Artist</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
