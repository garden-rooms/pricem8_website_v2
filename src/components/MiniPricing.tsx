import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MiniPricingSection } from '../types'
import FadeInSection from './FadeInSection'
import { BackgroundGlow } from './BackgroundGlow'
import { Package, Wrench, Flame, LucideIcon } from 'lucide-react'
import { useWaitingList } from '../context/WaitingListContext'

const iconMap: Record<string, LucideIcon> = {
  Package,
  Wrench,
  Flame
}

interface MiniPricingProps {
  section: MiniPricingSection
}

export default function MiniPricing({ section }: MiniPricingProps) {
  const isInternalLink = section.cta.href.startsWith('/') && !section.cta.href.startsWith('//')
  const { openWaitlist } = useWaitingList()

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#waitlist') {
      e.preventDefault()
      openWaitlist()
    }
  }

  return (
    <section id="pricing-teaser" className="relative py-16">
      <BackgroundGlow
        variant="teal"
        className="left-[-80px] top-1/2 h-64 w-64 -translate-y-1/2 opacity-40 dark:opacity-20"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 italic tracking-tight">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
                {section.subtitle}
              </p>
            )}
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {section.plans.map((plan, index) => {
            const Icon = plan.icon ? iconMap[plan.icon] : null
            const variants = [
              'dark:bg-gradient-to-br dark:from-teal-900/40 dark:to-gray-950/50 dark:border-teal-500/30',
              'dark:bg-gradient-to-br dark:from-blue-900/40 dark:to-gray-950/50 dark:border-blue-500/30',
              'dark:bg-gradient-to-br dark:from-orange-900/40 dark:to-gray-950/50 dark:border-orange-500/30'
            ]
            const iconColors = [
              'text-teal-600 dark:text-teal-400',
              'text-blue-600 dark:text-blue-400',
              'text-orange-600 dark:text-orange-400'
            ]
            const variantClass = variants[index % variants.length]
            const iconColor = iconColors[index % iconColors.length]

            return (
              <FadeInSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative rounded-[2rem] bg-white/50 dark:bg-slate-900/40 backdrop-blur-2xl p-8 shadow-xl dark:shadow-slate-950/50 border border-gray-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10 dark:hover:shadow-teal-500/10 hover:border-teal-200 dark:hover:border-teal-500/30 ${variantClass}`}
                >
                  {Icon && (
                    <div className={`w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-6 border border-gray-100 dark:border-slate-700`}>
                      <Icon className={`w-6 h-6 ${iconColor}`} />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {plan.description}
                  </p>
                </motion.div>
              </FadeInSection>
            )
          })}
        </div>

        <FadeInSection delay={0.3}>
          <div className="text-center">
            {isInternalLink ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={section.cta.href}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-teal-600 to-teal-500 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-teal-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/40"
                >
                  {section.cta.label}
                </Link>
              </motion.div>
            ) : (
              <motion.a
                href={section.cta.href}
                onClick={(e) => handleCtaClick(e, section.cta.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-teal-600 to-teal-500 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-teal-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/40"
              >
                {section.cta.label}
              </motion.a>
            )}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

