import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FeatureSection as FeatureSectionType } from '../types'
import FadeInSection from './FadeInSection'
import { BackgroundGlow } from './BackgroundGlow'
import BrandedText from './BrandedText'
import { RefreshCw, Package, Calculator, FileText, Users, Rocket, CheckCircle2, LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  RefreshCw,
  Package,
  Calculator,
  FileText,
  Users,
  Rocket
}

interface FeatureSectionProps {
  section: FeatureSectionType
  imagePosition?: 'left' | 'right'
}

export default function FeatureSection({ section, imagePosition = 'right' }: FeatureSectionProps) {
  const isImageRight = imagePosition === 'right'
  const Icon = section.icon ? iconMap[section.icon] : null

  return (
    <section className="relative py-24">
      <BackgroundGlow
        variant={isImageRight ? "teal" : "blue"}
        className={isImageRight ? "right-[-100px] top-1/2 h-96 w-96 -translate-y-1/2 opacity-40 dark:opacity-20" : "left-[-100px] top-1/2 h-96 w-96 -translate-y-1/2 opacity-40 dark:opacity-20"}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isImageRight ? 'lg:grid-flow-dense' : ''}`}>
          {/* Text Content */}
          <div className={!isImageRight ? 'lg:col-start-2' : ''}>
            <FadeInSection delay={0}>
              <div className="relative">
                {Icon && (
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-500/10 dark:to-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-teal-100 dark:border-teal-500/20 shadow-sm">
                    <Icon className="w-7 h-7 text-teal-600 dark:text-teal-400" strokeWidth={1.5} />
                  </div>
                )}

                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  <BrandedText as="span">{section.title}</BrandedText>
                </h2>

                {section.subtitle && (
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-medium">
                    {section.subtitle}
                  </p>
                )}

                {section.paragraphs && section.paragraphs.length > 0 && (
                  <div className="space-y-6 mb-10">
                    {section.paragraphs.map((paragraph, index) => (
                      <p key={index} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-4">
                    {section.bullets.map((bullet, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4"
                      >
                        <div className="flex-shrink-0 w-6 h-6 mt-1 bg-teal-100 dark:bg-teal-500/20 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        </div>
                        <span className="text-lg text-gray-700 dark:text-gray-300">{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}

                {section.cta && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-10"
                  >
                    <Link
                      to={section.cta.href}
                      className="inline-flex items-center justify-center rounded-full bg-gray-900 dark:bg-teal-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-gray-900/20 dark:shadow-teal-500/20 transition-all duration-200 hover:bg-gray-800 dark:hover:bg-teal-400 hover:shadow-2xl hover:shadow-gray-900/30 dark:hover:shadow-teal-500/30 ring-1 ring-white/20 hover:scale-105 active:scale-95"
                    >
                      {section.cta.label}
                    </Link>
                  </motion.div>
                )}
              </div>
            </FadeInSection>
          </div>

          {/* Image */}
          {section.image && (
            <FadeInSection delay={0.2}>
              <motion.div
                whileHover={{ scale: 1.02, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative ${!isImageRight ? 'lg:col-start-1 lg:row-start-1' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-3xl blur-2xl transform translate-y-8" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 dark:from-white/5 dark:to-white/5 pointer-events-none" />
                  <img
                    src={section.image.startsWith('/') ? section.image : (section.image.includes('.') ? `/images/${section.image}` : `/images/${encodeURIComponent(section.image)}.png`)}
                    alt={section.title}
                    className="w-full h-auto relative z-10"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://via.placeholder.com/800x600/F3F4F6/0F172A?text=${encodeURIComponent(section.title)}`
                    }}
                  />
                </div>
              </motion.div>
            </FadeInSection>
          )}
        </div>
      </div>
    </section>
  )
}

