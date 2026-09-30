import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TradeIconsSection } from '../types'
import { getIcon } from '../utils/icons'
import FadeInSection from './FadeInSection'
import { BackgroundGlow } from './BackgroundGlow'
import BrandedText from './BrandedText'

interface TradeIconsProps {
  section: TradeIconsSection
}

// Map trade labels to their paths
const tradePaths: Record<string, string> = {
  'Landscaping': '/trades/landscaping',
  'Garden rooms': '/trades/garden-rooms',
}

export default function TradeIcons({ section }: TradeIconsProps) {
  return (
    <section id="trades-strip" className="relative py-20">
      <BackgroundGlow
        variant="blue"
        className="right-[-100px] top-1/2 h-80 w-80 -translate-y-1/2 opacity-40 dark:opacity-20"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-16">
            {section.badge && (
              <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-500/10 dark:to-blue-500/10 text-teal-600 dark:text-teal-400 rounded-full text-sm font-medium border border-teal-100 dark:border-teal-500/20">
                {section.badge}
              </div>
            )}
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

        {/* Trade Icons Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {section.items.map((item, index) => {
            const tradePath = tradePaths[item.label] || '/trades'
            return (
              <FadeInSection
                key={index}
                delay={index * 0.05}
                className="w-[calc(50%-8px)] sm:w-[calc(33.33%-12px)] md:flex-1 md:min-w-[180px] md:max-w-[200px]"
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="group h-full"
                >
                  <Link
                    to={tradePath}
                    className="flex flex-col items-center p-6 rounded-2xl bg-white/50 dark:bg-gray-950/30 backdrop-blur-2xl border border-gray-200/40 dark:border-white/5 shadow-lg dark:shadow-slate-900/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 dark:hover:shadow-teal-500/5 hover:border-teal-200 dark:hover:border-teal-500/30 cursor-pointer h-full"
                  >
                    <div className="w-16 h-16 bg-teal-50 dark:bg-teal-500/10 rounded-xl flex items-center justify-center mb-4 text-teal-600 dark:text-teal-400 group-hover:bg-teal-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      {getIcon(item.icon, "w-8 h-8")}
                    </div>
                    <span className="text-base font-semibold text-gray-900 dark:text-white text-center group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              </FadeInSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}

