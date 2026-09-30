import { motion } from 'framer-motion'
import { HeroSection } from '../types'
import { formatPriceM8 } from './BrandedText'
import { useWaitingList } from '../context/WaitingListContext'
import { trackFreeTrialConversion } from '../utils/tracking'

interface HeroProps {
  section: HeroSection
}

export default function Hero({ section }: HeroProps) {
  const titleParts = section.highlight ? section.title.split(section.highlight) : [section.title]
  const { openWaitlist } = useWaitingList()

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#waitlist') {
      e.preventDefault()
      openWaitlist()
    } else if (href.startsWith('#')) {
      // Handle hash links with smooth scroll
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    } else if (href.includes('/app') || href.includes('pricem8.uk/signup')) {
      // Track free trial conversions
      trackFreeTrialConversion()
    }
  }

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in-up-blur [animation-delay:100ms]">
              {section.badge && (
                <div className="inline-flex items-center px-4 py-2 mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-teal-100 dark:border-teal-500/30 rounded-full shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-teal-500 mr-2 animate-pulse"></span>
                  <span className="text-sm font-medium text-teal-800 dark:text-teal-300">{section.badge}</span>
                </div>
              )}

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-gray-900 dark:text-white animate-fade-in-up-blur [animation-delay:200ms]">
                {formatPriceM8(titleParts[0])}
                {section.highlight && (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 px-2">
                    {formatPriceM8(section.highlight)}
                  </span>
                )}
                {formatPriceM8(titleParts[1] || '')}
              </h1>

              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light animate-fade-in-up-blur [animation-delay:300ms]">
                {section.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up-blur [animation-delay:400ms]">
                <a
                  href={section.primaryCta.href}
                  onClick={(e) => handleCtaClick(e, section.primaryCta.href)}
                  className="inline-flex items-center justify-center rounded-full bg-gray-900 dark:bg-teal-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-gray-900/20 dark:shadow-teal-500/20 transition-all duration-200 hover:bg-gray-800 dark:hover:bg-teal-400 hover:shadow-2xl hover:shadow-gray-900/30 dark:hover:shadow-teal-500/30 ring-1 ring-white/20 hover:scale-105 active:scale-95"
                >
                  {section.primaryCta.label}
                </a>
                {section.secondaryCta && (
                  <a
                    href={section.secondaryCta.href}
                    onClick={(e) => handleCtaClick(e, section.secondaryCta?.href || '')}
                    className="inline-flex items-center justify-center rounded-full bg-white dark:bg-slate-800 px-8 py-4 text-base font-semibold text-gray-700 dark:text-white shadow-lg shadow-gray-200/50 dark:shadow-slate-900/50 ring-1 ring-gray-200 dark:ring-slate-700 transition-all duration-200 hover:ring-gray-300 dark:hover:ring-slate-600 hover:text-gray-900 dark:hover:text-white hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-slate-900/60 hover:scale-105 active:scale-95"
                  >
                    {section.secondaryCta.label}
                  </a>
                )}
              </div>

              {/* Benefits */}
              {section.benefits && section.benefits.length > 0 && (
                <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center lg:justify-start text-sm font-medium text-gray-500 dark:text-gray-400 animate-fade-in-up-blur [animation-delay:500ms]">
                  {section.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <div className="w-5 h-5 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative lg:h-[600px] flex items-center justify-center animate-fade-in-up-blur [animation-delay:600ms]">
            <div
              style={{ perspective: 1000 }}
              className="relative z-10 w-full max-w-[600px]"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotateZ: [0, 1, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-teal-900/20 dark:shadow-teal-500/10 ring-1 ring-gray-900/5 dark:ring-white/10 bg-white dark:bg-slate-800"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 mix-blend-overlay pointer-events-none" />
                <img
                  src={`/images/${encodeURIComponent(section.rightImage)}.png`}
                  alt="PriceM8 Dashboard"
                  className="w-full aspect-[16/10] object-cover object-bottom"
                />
              </motion.div>
            </div>

            {/* Background Glow behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-teal-200/30 to-blue-200/30 dark:from-teal-500/20 dark:to-blue-500/20 blur-3xl rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

