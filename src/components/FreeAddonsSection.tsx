import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FreeAddonsSection as FreeAddonsSectionType } from '../types'
import FadeInSection from './FadeInSection'
import { BackgroundGlow } from './BackgroundGlow'
import BrandedText from './BrandedText'
import { Shield, Calendar, RefreshCw, ArrowRight, Sparkles } from 'lucide-react'
import { useWaitingList } from '../context/WaitingListContext'
import { trackFreeTrialConversion } from '../utils/tracking'

interface FreeAddonsSectionProps {
  section: FreeAddonsSectionType
}

const iconMap: Record<string, any> = {
  Shield,
  Calendar,
  RefreshCw,
}

export default function FreeAddonsSection({ section }: FreeAddonsSectionProps) {
  const { openWaitlist } = useWaitingList()

  const handleCtaClick = (e: React.MouseEvent, href: string) => {
    if (href === '#waitlist') {
      e.preventDefault()
      openWaitlist()
    } else if (href.includes('/app') || href.includes('pricem8.uk/signup')) {
      trackFreeTrialConversion()
    }
  }

  return (
    <section className="relative py-24 bg-gradient-to-b from-teal-50/50 via-white to-white dark:from-slate-900/50 dark:via-slate-900 dark:to-slate-900 overflow-hidden">
      <BackgroundGlow
        variant="teal"
        className="right-[-200px] top-1/4 h-96 w-96 opacity-30 dark:opacity-10"
      />
      <BackgroundGlow
        variant="blue"
        className="left-[-200px] bottom-1/4 h-96 w-96 opacity-20 dark:opacity-10"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <FadeInSection>
            {section.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg shadow-teal-500/30">
                <Sparkles className="w-4 h-4" />
                {section.badge}
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <BrandedText as="span">{section.title}</BrandedText>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {section.subtitle}
            </p>
          </FadeInSection>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {section.addons.map((addon, index) => {
            const Icon = iconMap[addon.icon] || Shield
            return (
              <FadeInSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative h-full rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl border-2 border-teal-200 dark:border-teal-500/30 hover:border-teal-400 dark:hover:border-teal-400 transition-all duration-300"
                >
                  {/* Value Badge - Prominent */}
                  <div className="mb-6 pb-6 border-b-2 border-teal-200 dark:border-teal-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                          Worth
                        </div>
                        <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                          {addon.worth}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {addon.name}
                    </h3>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full text-sm font-bold shadow-lg">
                      <span>FREE</span>
                      <span className="text-xs opacity-90">Included</span>
                    </div>
                  </div>

                  {/* Problem */}
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-sm font-medium text-red-700 dark:text-red-300">
                      <span className="font-bold">Problem:</span> {addon.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      <span className="font-bold text-teal-600 dark:text-teal-400">Solution:</span>{' '}
                      {addon.solution}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-lg border border-teal-200 dark:border-teal-500/30">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      <span className="text-teal-600 dark:text-teal-400">✓ Result:</span> {addon.outcome}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {addon.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="text-teal-500 mt-1 flex-shrink-0">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </FadeInSection>
            )
          })}
        </div>

        {/* CTA */}
        <FadeInSection delay={0.4}>
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={section.cta.href}
                onClick={(e) => handleCtaClick(e, section.cta.href)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-full font-bold text-lg shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/40 transition-all duration-200"
              >
                {section.cta.label}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            {section.cta.note && (
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                {section.cta.note}
              </p>
            )}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
