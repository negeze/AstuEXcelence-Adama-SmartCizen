'use client'

import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import {Footer } from "@/components/footer"
import Link from 'next/link'

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: 'The Future of Smart Cities',
      excerpt: 'Exploring how technology is reshaping urban development and citizen engagement',
      date: 'June 10, 2024',
      category: 'Technology',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2gzcB7iOV5ApEJtkGyUHErYRNCDr2I.png',
    },
    {
      id: 2,
      title: 'Data-Driven City Planning',
      excerpt: 'How real-time analytics improve infrastructure and resource management',
      date: 'June 5, 2024',
      category: 'Analytics',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-azf6B2ddDN4mjYUoRhPWMdKUlXQDfy.png',
    },
    {
      id: 3,
      title: 'Community Engagement in Urban Development',
      excerpt: 'Building trust and transparency between citizens and city administrators',
      date: 'May 28, 2024',
      category: 'Community',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DESf3Lu5mAmAnWVUBH8zNV1dnGfFSU.png',
    },
  ]

  return (
    <>
      <Navigation />
      <main className="relative">
        {/* Hero Section */}
        <HeroSection
          backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-f3sv6ybpHOXSiaklmHLSTSKlUB4rKt.png"
          title="Latest News & Insights"
          subtitle="Discover what's happening in the world of smart cities"
        />

        {/* Blog Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="rounded-lg overflow-hidden border border-border bg-card hover:shadow-lg transition-shadow"
                >
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url('${article.image}')` }}
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-sm text-foreground/60">{article.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-foreground/70 mb-4">{article.excerpt}</p>
                    <Link
                      href="#"
                      className="inline-block text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
       <Footer />
    </>
  )
}
