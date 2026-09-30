import { motion } from 'framer-motion'
import FadeInSection from './FadeInSection'
import AnimatedNumber from './AnimatedNumber'

interface Stat {
  value: number
  label: string
  description?: string
  prefix?: string
  suffix?: string
  decimals?: number
}

interface StatsSectionProps {
  section: {
    id: string
    title?: string
    subtitle?: string
    stats: Stat[]
    backgroundColor?: 'light' | 'dark' | 'gradient'
  }
}

export default function StatsSection({ section }: StatsSectionProps) {
  const bgClasses = {
    light: 'bg-white dark:bg-slate-950',
    dark: 'bg-slate-900 text-white',
    gradient: 'bg-gradient-to-br from-teal-50 via-blue-50 to-teal-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900'
  }

  return (
    <section id={section.id} className={`relative py-20 ${bgClasses[section.backgroundColor || 'light']}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(section.title || section.subtitle) && (
          <div className="text-center mb-16">
            {section.title && (
              <FadeInSection delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                  {section.title}
                </h2>
              </FadeInSection>
            )}
            {section.subtitle && (
              <FadeInSection delay={0.2}>
                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                  {section.subtitle}
                </p>
              </FadeInSection>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {section.stats.map((stat, index) => (
            <FadeInSection key={index} delay={0.3 + index * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.05 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-blue-400">
                  <AnimatedNumber
                    value={stat.value}
                    prefix={stat.prefix || ''}
                    suffix={stat.suffix || ''}
                    decimals={stat.decimals || 0}
                  />
                </div>
                <div className="text-lg md:text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.description}
                  </div>
                )}
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
