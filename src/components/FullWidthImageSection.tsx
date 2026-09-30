import { motion } from 'framer-motion'
import FadeInSection from './FadeInSection'

interface FullWidthImageSectionProps {
  section: {
    id: string
    title?: string
    subtitle?: string
    image: string
    imageAlt?: string
    overlay?: boolean
    contentPosition?: 'top' | 'center' | 'bottom'
    cta?: {
      label: string
      href: string
    }
  }
}

export default function FullWidthImageSection({ section }: FullWidthImageSectionProps) {
  const positionClasses = {
    top: 'items-start pt-20',
    center: 'items-center',
    bottom: 'items-end pb-20'
  }

  return (
    <section id={section.id} className="relative py-0 overflow-hidden">
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={section.image}
            alt={section.imageAlt || section.title || ''}
            className="w-full h-full object-cover"
          />
          {section.overlay && (
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          )}
        </div>

        {/* Content Overlay */}
        {(section.title || section.subtitle || section.cta) && (
          <div className={`relative z-10 h-full flex flex-col ${positionClasses[section.contentPosition || 'center']} px-4 sm:px-6 lg:px-8 py-20 md:py-32`}>
            <div className="max-w-4xl mx-auto text-center">
              {section.title && (
                <FadeInSection delay={0.1}>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                    {section.title}
                  </h2>
                </FadeInSection>
              )}
              {section.subtitle && (
                <FadeInSection delay={0.2}>
                  <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
                    {section.subtitle}
                  </p>
                </FadeInSection>
              )}
              {section.cta && (
                <FadeInSection delay={0.3}>
                  <motion.a
                    href={section.cta.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full shadow-xl transition-colors"
                  >
                    {section.cta.label}
                  </motion.a>
                </FadeInSection>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
