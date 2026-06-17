import Link from 'next/link'

interface HeroSectionProps {
  backgroundImage: string
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
}

export function HeroSection({
  backgroundImage,
  title,
  subtitle,
  ctaText,
  ctaHref,
}: HeroSectionProps) {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%), url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance drop-shadow-lg">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg sm:text-xl mb-8 text-white/90 drop-shadow-md text-balance">
            {subtitle}
          </p>
        )}

        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  )
}
