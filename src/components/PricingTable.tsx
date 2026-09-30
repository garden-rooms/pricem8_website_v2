import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PricingTableSection } from '../types'
import FadeInSection from './FadeInSection'
import { BackgroundGlow } from './BackgroundGlow'
import BrandedText from './BrandedText'
import { useWaitingList } from '../context/WaitingListContext'

interface PricingTableProps {
  section: PricingTableSection
}

export default function PricingTable({ section }: PricingTableProps) {
  const defaultBilling = section.billing?.default || 'monthly'
  const [billingPeriod, setBillingPeriod] = useState<string>(defaultBilling)
  const { openWaitlist } = useWaitingList()

  return (
    <section id="pricing" className="relative py-24">
      <BackgroundGlow
        variant="purple"
        className="left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-30 dark:opacity-20"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-16">
            {section.badge && (
              <div className="inline-flex items-center px-4 py-2 mb-6 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium border border-teal-100 dark:border-teal-500/20 shadow-sm">
                {section.badge}
              </div>
            )}
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              <BrandedText as="span">{section.title}</BrandedText>
            </h2>
            {section.subtitle && (
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {section.subtitle}
              </p>
            )}
          </div>
        </FadeInSection>

        {/* Billing Toggle */}
        {section.billing && section.billing.options.length > 0 && (
          <FadeInSection delay={0.1}>
            <div className="flex items-center justify-center gap-4 mb-16">
              <span
                className={`text-lg font-medium cursor-pointer transition-colors ${billingPeriod === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly
              </span>

              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${billingPeriod === 'yearly' ? 'bg-teal-500' : 'bg-gray-200 dark:bg-slate-700'
                  }`}
                role="switch"
                aria-checked={billingPeriod === 'yearly'}
              >
                <span className="sr-only">Toggle billing period</span>
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition-transform ${billingPeriod === 'yearly' ? 'translate-x-7' : 'translate-x-1'
                    }`}
                />
              </button>

              <div className="flex items-center gap-3">
                <span
                  className={`text-lg font-medium cursor-pointer transition-colors ${billingPeriod === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                  onClick={() => setBillingPeriod('yearly')}
                >
                  Yearly
                </span>
                {section.billing.options.find(o => o.id === 'yearly')?.badge && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300 tracking-wide border border-green-200 dark:border-green-500/30">
                    {section.billing.options.find(o => o.id === 'yearly')?.badge}
                  </span>
                )}
              </div>
            </div>
          </FadeInSection>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {section.plans.map((plan, index) => {
            const isMonthly = billingPeriod === 'monthly'
            const price = isMonthly ? plan.priceMonthly : plan.priceYearly
            const period = isMonthly ? '/month' : '/year'
            const note = isMonthly ? plan.monthlyNote : plan.yearlyNote

            const variants = [
              'dark:bg-gradient-to-br dark:from-blue-900/40 dark:to-gray-950/50 dark:border-blue-500/30',
              'dark:bg-gradient-to-br dark:from-purple-900/40 dark:to-gray-950/50 dark:border-purple-500/30', // Pro Plan gets Purple
              'dark:bg-gradient-to-br dark:from-amber-900/40 dark:to-gray-950/50 dark:border-amber-500/30'
            ]
            const variantClass = variants[index % variants.length]

            return (
              <FadeInSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -12, scale: plan.highlight ? 1.03 : 1.01 }}
                  className={`relative h-full rounded-3xl transition-all duration-300 group overflow-hidden ${plan.highlight
                    ? 'shadow-2xl shadow-teal-500/30 dark:shadow-teal-500/20 ring-2 ring-teal-500/50 dark:ring-teal-400/50'
                    : `bg-white/60 dark:bg-gray-950/40 backdrop-blur-2xl border border-gray-200/40 shadow-lg hover:shadow-2xl hover:shadow-teal-500/10 dark:hover:shadow-slate-900/50 ${variantClass}`
                    }`}
                >
                  {plan.highlight && (
                    <>
                      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 rounded-3xl border-2 border-teal-500/60 dark:border-teal-400/60" />
                        <div className="absolute top-0 left-0 w-[300%] h-[300%] -translate-x-1/3 -translate-y-1/3 animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,theme(colors.teal.500)_360deg)] opacity-20 group-hover:opacity-30 transition-opacity duration-500 [mask-image:linear-gradient(white,white),linear-gradient(white,white)] [mask-composite:exclude] [mask-origin:border-box] [mask-clip:padding-box,border-box] p-[2px]" />
                      </div>
                      <div className="absolute inset-[2px] bg-gradient-to-br from-white via-teal-50/30 to-white dark:from-slate-800/95 dark:via-teal-900/20 dark:to-slate-800/95 backdrop-blur-xl rounded-[calc(1.5rem-2px)] z-0" />
                    </>
                  )}

                  <div className={`relative z-10 flex flex-col h-full p-8 ${!plan.highlight ? 'h-full' : ''}`}>
                    {plan.badge && (
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-teal-500/30 uppercase tracking-wide"
                        >
                          {plan.badge}
                        </motion.span>
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <h3 className={`text-2xl font-bold mb-3 ${plan.highlight ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
                        {plan.name}
                      </h3>
                      <p className={`mb-8 h-10 flex items-center justify-center ${plan.highlight ? 'text-gray-600 dark:text-gray-300 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>{plan.description}</p>

                      <div className="flex items-baseline justify-center">
                        <span className="text-3xl font-bold text-gray-400 dark:text-gray-400 mr-1">£</span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={billingPeriod}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="text-6xl font-bold text-gray-900 dark:text-white tracking-tight"
                          >
                            {price.replace('£', '')}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 font-medium mt-2">
                        {period}
                      </div>

                      {note && (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${billingPeriod}-note`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="h-6 mt-4"
                          >
                            <span className="inline-block px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300 text-xs font-bold rounded-full border border-green-100 dark:border-green-500/20">
                              {note}
                            </span>
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </div>

                    <div className="flex-grow border-t border-gray-100 dark:border-slate-700 pt-8 mb-8">
                      <ul className="space-y-4">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center mt-0.5">
                              <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-gray-600 dark:text-gray-300 font-medium text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {(() => {
                      const href = plan.ctaHref || '#waitlist'
                      const isHash = href.startsWith('#')
                      const isExternal = href.startsWith('http') || href.startsWith('//')
                      const className = `block w-full text-center py-4 px-6 font-bold text-lg transition-all duration-200 ${plan.highlight
                        ? 'rounded-full bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-500 dark:to-teal-400 text-white shadow-2xl shadow-teal-500/40 dark:shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/50 dark:hover:shadow-teal-500/40 hover:from-teal-700 hover:to-teal-600 dark:hover:from-teal-400 dark:hover:to-teal-300'
                        : 'rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-slate-600 hover:text-teal-700 dark:hover:text-teal-300'
                        }`

                      if (isHash || isExternal) {
                        return (
                          <motion.a
                            href={href}
                            onClick={(e) => {
                              if (href === '#waitlist') {
                                e.preventDefault()
                                openWaitlist()
                              }
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={className}
                          >
                            {plan.ctaLabel}
                          </motion.a>
                        )
                      }

                      return (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link to={href} className={className}>
                            {plan.ctaLabel}
                          </Link>
                        </motion.div>
                      )
                    })()}
                  </div>
                </motion.div>
              </FadeInSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
