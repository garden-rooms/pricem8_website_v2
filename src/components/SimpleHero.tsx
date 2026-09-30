import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SimpleHeroSection } from '../types'
import BrandedText from './BrandedText'
import { trackFreeTrialConversion } from '../utils/tracking'

interface SimpleHeroProps {
  section: SimpleHeroSection
}

export default function SimpleHero({ section }: SimpleHeroProps) {
  const isHashLink = (href: string) => href.startsWith('#')
  const isExternalLink = (href: string) => href.startsWith('http') || href.startsWith('//')

  const handleCtaClick = (href: string) => {
    if (href.includes('/app') || href.includes('pricem8.uk/signup')) {
      trackFreeTrialConversion()
    }
  }

  return (
    <section className="relative pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {section.image ? (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <div className="animate-fade-in-up-blur [animation-delay:100ms]">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-6 leading-tight">
                  <BrandedText as="span">{section.title}</BrandedText>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in-up-blur [animation-delay:200ms]">
                  {section.subtitle}
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="animate-fade-in-up-blur [animation-delay:300ms]">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200/50 dark:ring-white/10"
              >
                <img
                  src={`/images/${encodeURIComponent(section.image)}.jpg`}
                  alt="Founder"
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-6 leading-tight animate-fade-in-up-blur [animation-delay:100ms]">
              <BrandedText as="span">{section.title}</BrandedText>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 animate-fade-in-up-blur [animation-delay:200ms]">
              {section.subtitle}
            </p>

            {/* CTAs */}
            {(section.primaryCta || section.secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4 animate-fade-in-up-blur [animation-delay:300ms]">
                {section.primaryCta && (
                  isHashLink(section.primaryCta.href) || isExternalLink(section.primaryCta.href) ? (
                    <motion.a
                      href={section.primaryCta.href}
                      onClick={() => handleCtaClick(section.primaryCta!.href)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/40"
                    >
                      {section.primaryCta.label}
                    </motion.a>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to={section.primaryCta.href}
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/40"
                      >
                        {section.primaryCta.label}
                      </Link>
                    </motion.div>
                  )
                )}
                {section.secondaryCta && (
                  isHashLink(section.secondaryCta.href) || isExternalLink(section.secondaryCta.href) ? (
                    <motion.a
                      href={section.secondaryCta.href}
                      onClick={() => handleCtaClick(section.secondaryCta!.href)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-slate-600 px-8 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all duration-200 hover:border-teal-400 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-500/10"
                    >
                      {section.secondaryCta.label}
                    </motion.a>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to={section.secondaryCta.href}
                        className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-slate-600 px-8 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all duration-200 hover:border-teal-400 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-500/10"
                      >
                        {section.secondaryCta.label}
                      </Link>
                    </motion.div>
                  )
                )}
              </div>
            )}

            {/* Note */}
            {section.note && (
              <p className="text-sm text-gray-500 dark:text-gray-400 animate-fade-in-up-blur [animation-delay:400ms]">
                {section.note}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

