import { motion } from 'framer-motion'
import { FeatureGridSection } from '../types'
import { getIcon } from '../utils/icons'
import FadeInSection from './FadeInSection'
import { BackgroundGlow } from './BackgroundGlow'
import BrandedText from './BrandedText'

interface FeatureGridProps {
  section: FeatureGridSection
}

export default function FeatureGrid({ section }: FeatureGridProps) {
  return (
    <section id="features" className="relative py-20">
      <BackgroundGlow
        variant="blue"
        className="left-[-100px] top-1/2 h-80 w-80 -translate-y-1/2 opacity-40 dark:opacity-20"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <BrandedText as="span">{section.title}</BrandedText>
            </h2>
            {section.subtitle && (
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {section.subtitle}
              </p>
            )}
          </div>
        </FadeInSection>

        {/* Features Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${section.columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
          {section.features.map((feature, index) => {
            const variants = [
              'dark:bg-gradient-to-br dark:from-purple-900/40 dark:to-gray-950/50 dark:border-purple-500/30',
              'dark:bg-gradient-to-br dark:from-amber-900/40 dark:to-gray-950/50 dark:border-amber-500/30',
              'dark:bg-gradient-to-br dark:from-rose-900/40 dark:to-gray-950/50 dark:border-rose-500/30',
              'dark:bg-gradient-to-br dark:from-blue-900/40 dark:to-gray-950/50 dark:border-blue-500/30'
            ]
            const variantClass = variants[index % variants.length]

            // Icon background colors to match the card theme
            const iconBgVariants = [
              'dark:from-purple-500/20 dark:to-purple-500/10 dark:text-purple-400',
              'dark:from-amber-500/20 dark:to-amber-500/10 dark:text-amber-400',
              'dark:from-rose-500/20 dark:to-rose-500/10 dark:text-rose-400',
              'dark:from-blue-500/20 dark:to-blue-500/10 dark:text-blue-400'
            ]
            const iconBgClass = iconBgVariants[index % iconBgVariants.length]

            return (
              <FadeInSection key={index} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`group rounded-2xl bg-white/50 dark:bg-gray-950/40 backdrop-blur-2xl p-8 shadow-lg dark:shadow-slate-900/50 border border-gray-200/40 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 dark:hover:shadow-teal-500/5 hover:border-teal-200 dark:hover:border-teal-500/30 ${variantClass}`}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl flex items-center justify-center mb-6 text-teal-600 group-hover:scale-110 transition-transform duration-300 ${iconBgClass}`}>
                    {getIcon(feature.icon, "w-7 h-7")}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bullets */}
                  {feature.bullets && feature.bullets.length > 0 && (
                    <ul className="space-y-2">
                      {feature.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                          <svg className="w-5 h-5 text-teal-500 dark:text-teal-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </FadeInSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}

