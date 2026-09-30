import { motion } from 'framer-motion'
import { StepsSection } from '../types'
import FadeInSection from './FadeInSection'
import { BackgroundGlow } from './BackgroundGlow'
import BrandedText from './BrandedText'

interface StepsProps {
  section: StepsSection
}

export default function Steps({ section }: StepsProps) {
  return (
    <section id="how-it-works" className="relative py-20">
      <BackgroundGlow
        variant="teal"
        className="right-[-100px] top-1/2 h-72 w-72 -translate-y-1/2 opacity-40 dark:opacity-20"
      />
      <div className="max-w-4xl mx-auto">
        <FadeInSection>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            <BrandedText as="span">{section.title}</BrandedText>
          </h2>
        </FadeInSection>

        <div className="space-y-6">
          {section.steps.map((step, index) => {
            const variants = [
              'dark:bg-gradient-to-br dark:from-teal-900/40 dark:to-gray-950/50 dark:border-teal-500/30',
              'dark:bg-gradient-to-br dark:from-blue-900/40 dark:to-gray-950/50 dark:border-blue-500/30',
              'dark:bg-gradient-to-br dark:from-purple-900/40 dark:to-gray-950/50 dark:border-purple-500/30'
            ]
            const variantClass = variants[index % variants.length]

            return (
              <FadeInSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`group rounded-2xl bg-white/50 dark:bg-gray-950/40 backdrop-blur-2xl p-8 shadow-lg dark:shadow-slate-900/50 border border-gray-200/40 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 dark:hover:shadow-teal-500/5 hover:border-teal-200 dark:hover:border-teal-500/30 ${variantClass}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl border-2 border-teal-100 dark:border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-xl shadow-sm group-hover:border-teal-200 dark:group-hover:border-teal-500/40 group-hover:scale-110 transition-all duration-300">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        {step.body}
                      </p>
                    </div>
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

