'use client'

import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { DashboardCard } from '@/components/dashboard-card'
import { Footer } from '@/components/footer'

export default function History() {
  const milestones = [
    {
      year: '2019',
      title: 'Foundation',
      description: 'SmartCitizen platform launched with focus on transparency',
    },
    {
      year: '2020',
      title: 'Rapid Growth',
      description: 'Expanded to 25 cities across 10 countries',
    },
    {
      year: '2021',
      title: 'AI Integration',
      description: 'Integrated advanced analytics and AI for better insights',
    },
    {
      year: '2022',
      title: 'Mobile Revolution',
      description: 'Launched mobile apps reaching 1 million users',
    },
    {
      year: '2023',
      title: 'Sustainability Focus',
      description: 'Launched green city initiatives and carbon tracking',
    },
    {
      year: '2024',
      title: 'Global Leader',
      description: 'Became the largest smart city platform globally',
    },
  ]

  return (
    <>
      <Navigation />
      <main className="relative">
        {/* Hero Section */}
        <HeroSection
          backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-azf6B2ddDN4mjYUoRhPWMdKUlXQDfy.png"
          title="Our Journey"
          subtitle="From vision to reality - the SmartCitizen story"
        />

        {/* Timeline Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Milestones
              </h2>
              <p className="text-lg text-foreground/70">
                Key moments in our growth and innovation journey
              </p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6">
                  {/* Timeline Line */}
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                    {index < milestones.length - 1 && (
                      <div className="w-1 bg-primary/20 flex-1" style={{ height: '100px' }}></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                    <p className="text-foreground/70">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard
                title="Cities"
                value="125+"
                description="Smart cities powered by SmartCitizen"
              />
              <DashboardCard
                title="Users"
                value="5M+"
                description="Active platform users worldwide"
                accent="secondary"
              />
              <DashboardCard
                title="Data Points"
                value="2B+"
                description="Real-time city metrics monitored"
                accent="accent"
              />
              <DashboardCard
                title="Uptime"
                value="99.9%"
                description="Reliable infrastructure globally"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
