'use client'

import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { DashboardCard } from '@/components/dashboard-card'
import { Footer } from '@/components/footer'

export default function About() {
  return (
    <>
      <Navigation />
      <main className="relative">
        {/* Hero Section */}
        <HeroSection
          backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KBScSw2C2SIQGBKCtpSr5FAZ918qnm.png"
          title="About SmartCitizen"
          subtitle="Revolutionizing urban life through technology and transparency"
        />

        {/* Content Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-foreground/80 mb-8 text-lg leading-relaxed">
                SmartCitizen is dedicated to building more transparent, efficient, and livable cities through digital innovation. We believe that every citizen deserves access to real-time information about their city and a voice in its development.
              </p>

              <h2 className="text-3xl font-bold text-foreground mb-6">What We Do</h2>
              <p className="text-foreground/80 mb-8 text-lg leading-relaxed">
                Our platform provides city administrators and citizens with powerful tools for monitoring urban infrastructure, engaging communities, and making data-driven decisions. We combine cutting-edge technology with user-friendly design to make city management accessible to everyone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <DashboardCard
                icon="🎯"
                title="Our Vision"
                description="Connected, transparent, and sustainable cities worldwide"
              />
              <DashboardCard
                icon="💡"
                title="Innovation"
                description="Cutting-edge technology for urban challenges"
                accent="secondary"
              />
              <DashboardCard
                icon="🤝"
                title="Community"
                description="Empowering citizens through transparency"
                accent="accent"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
