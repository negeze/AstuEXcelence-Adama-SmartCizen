'use client'

import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { DashboardCard } from '@/components/dashboard-card'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative">
        {/* Hero Section */}
        <HeroSection
          backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LBQxBcdkfWIjyyguxrjfpeIXrgfXZR.png"
          title="Build Smarter Cities"
          subtitle="Transform urban communities with digital accountability and smart solutions"
          ctaText="Explore Dashboard"
          ctaHref="#dashboard"
        />

        {/* Dashboard Section */}
        <section id="dashboard" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Smart City Dashboard
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Real-time monitoring and management of city operations for better transparency and accountability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                icon="📊"
                title="Real-time Analytics"
                description="Monitor city metrics and performance indicators"
                value="98%"
                trend="Operational efficiency"
              />
              <DashboardCard
                icon="🏙️"
                title="Infrastructure Monitoring"
                description="Track building and infrastructure status"
                value="1,247"
                trend="Active locations"
                accent="secondary"
              />
              <DashboardCard
                icon="👥"
                title="Community Engagement"
                description="Foster transparency with citizens"
                value="52K+"
                trend="Active participants"
                accent="accent"
              />
              <DashboardCard
                icon="⚡"
                title="Energy Management"
                description="Optimize city-wide energy consumption"
                value="34%"
                trend="Reduction in usage"
              />
              <DashboardCard
                icon="🚗"
                title="Traffic Intelligence"
                description="Smart traffic flow management"
                value="156"
                trend="Congestion reduced"
                accent="secondary"
              />
              <DashboardCard
                icon="🌱"
                title="Sustainability"
                description="Track environmental initiatives"
                value="89%"
                trend="Green targets achieved"
                accent="accent"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}
