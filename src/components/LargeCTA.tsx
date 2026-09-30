import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CTASection } from '../types'
import FadeInSection from './FadeInSection'
import { BackgroundGlow } from './BackgroundGlow'
import BrandedText from './BrandedText'
import { useWaitingList } from '../context/WaitingListContext'
import { trackFreeTrialConversion } from '../utils/tracking'

interface LargeCTAProps {
  section: CTASection
}

export default function LargeCTA({ section }: LargeCTAProps) {
  const isHashLink = (href: string) => href.startsWith('#')
  const isExternalLink = (href: string) => href.startsWith('http') || href.startsWith('//')
  const { openWaitlist } = useWaitingList()

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#waitlist') {
      e.preventDefault()
      openWaitlist()
    } else if (href.includes('/app') || href.includes('pricem8.uk/signup')) {
      // Track free trial conversions
      trackFreeTrialConversion()
    }
  }

  const PrimaryCTA = isHashLink(section.primaryCta.href) || isExternalLink(section.primaryCta.href) ? (
    <motion.a
      href={section.primaryCta.href}
      onClick={(e) => handleCtaClick(e, section.primaryCta.href)}
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

  const SecondaryCTA = section.secondaryCta && (
    isHashLink(section.secondaryCta.href) || isExternalLink(section.secondaryCta.href) ? (
      <motion.a
        href={section.secondaryCta.href}
        onClick={(e) => handleCtaClick(e, section.secondaryCta?.href || '')}
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
  )

  return (
    <section className="relative mt-16 mb-12">
      <BackgroundGlow
        variant="mixed"
        className="left-1/2 top-0 h-72 w-[480px] -translate-x-1/2 opacity-40 dark:opacity-20"
      />
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 dark:from-teal-900/20 dark:via-blue-900/20 dark:to-purple-900/20 border border-teal-100 dark:border-teal-500/20 px-6 py-10 sm:px-10 sm:py-12 shadow-xl dark:shadow-slate-900/50">
        <FadeInSection>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <BrandedText as="span">{section.title}</BrandedText>
            </h2>
            {section.subtitle && (
              <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
                {section.subtitle}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              {PrimaryCTA}
              {SecondaryCTA}
            </div>

            {/* Benefits */}
            {section.benefits && section.benefits.length > 0 && (
              <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-600 dark:text-gray-400">
                {section.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-teal-500 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

