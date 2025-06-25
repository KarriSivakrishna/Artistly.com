import type { Metadata } from "next"
import { Suspense } from "react"
import Header from "@/components/layout/Header"
import Hero from "@/components/sections/Hero"
import CategoryCards from "@/components/sections/CategoryCards"
import Footer from "@/components/layout/Footer"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Users, Calendar, Award, CheckCircle } from "lucide-react"
import Link from "next/link"

/**
 * Homepage metadata for SEO
 */
export const metadata: Metadata = {
  title: "Artistly - Find and Book Amazing Artists",
  description:
    "The fastest way to find and book great artists for your events. Browse singers, dancers, speakers, DJs and more professional performers.",
  openGraph: {
    title: "Artistly - Find and Book Amazing Artists",
    description: "The fastest way to find and book great artists for your events.",
    url: "https://artistly.com",
  },
}

/**
 * Homepage component with lazy loading and suspense
 */
export default function HomePage() {
  const testimonials = [
    {
      name: "Shraddha Kapoor",
      role: "Bollywood Singer & Actress",
      content:
        "Working with Artistly has been incredible for connecting with event organizers. The platform showcases our talent beautifully and makes booking seamless for both artists and clients.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format",
      location: "Mumbai",
    },
    {
      name: "Mike Chen",
      role: "Corporate Event Manager",
      content:
        "We've booked multiple speakers through Artistly for our corporate events. The quality and professionalism is outstanding. The platform makes it so easy to find verified talent.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
      location: "Bangalore",
    },
    {
      name: "Emma Rodriguez",
      role: "Party Planner",
      content:
        "The variety of artists available is incredible. We always find exactly what we're looking for. From DJs to dancers, Artistly has transformed how we plan events for our clients.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
      location: "Delhi",
    },
    {
      name: "Rajesh Patel",
      role: "Wedding Planner",
      content:
        "As a wedding planner, I need reliable artists who deliver exceptional performances. Artistly's verified artists have never disappointed. The booking system is professional and efficient.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
      location: "Ahmedabad",
    },
    {
      name: "Priya Sharma",
      role: "HR Manager",
      content:
        "We used Artistly to book entertainment for our annual company celebration. The process was smooth, and the artist was fantastic. Our employees are still talking about the performance!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format",
      location: "Pune",
    },
    {
      name: "David Kumar",
      role: "Event Producer",
      content:
        "Artistly has become our go-to platform for finding quality performers. The search filters are excellent, and the artist profiles provide all the information we need to make informed decisions.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format",
      location: "Chennai",
    },
  ]

  const features = [
    {
      title: "Verified Artists",
      description: "All artists are professionally vetted and verified for quality assurance.",
      icon: Award,
    },
    {
      title: "Easy Booking",
      description: "Simple, secure booking process with instant confirmation.",
      icon: Calendar,
    },
    {
      title: "Trusted Platform",
      description: "Join thousands of satisfied clients who trust Artistly for their events.",
      icon: Users,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
        <CategoryCards />

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Artistly?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We make it simple to find and book the perfect artist for any occasion
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => {
                const IconComponent = feature.icon
                return (
                  <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8">
                      <IconComponent className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Client Reviews Section */}
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Don't just take our word for it - hear from event planners and clients who trust Artistly
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-6 lg:p-8">
                    {/* Star Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Reviewer Info */}
                    <div className="flex items-center">
                      {/* Profile Avatar */}
                      <div className="flex-shrink-0 mr-4">
                        <img
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={`${testimonial.name} profile`}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                          loading="lazy"
                        />
                      </div>

                      {/* Name and Role */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-base">{testimonial.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 lg:mt-16 text-center">
              <div className="inline-flex items-center justify-center space-x-8 text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.9/5 Average Rating</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">10,000+ Happy Clients</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Verified Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-primary/5 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Make Your Event Unforgettable?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied clients who have found their perfect artist through Artistly. Start your
                search today and discover amazing talent for your next event.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                  <Link href="/artists">Browse Artists</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link href="/onboarding">Become an Artist</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Suspense>
      <Footer />
    </div>
  )
}
