import { motion } from 'framer-motion'
import { TextWithBulletsSection } from '../types'
import FadeInSection from './FadeInSection'
import { BackgroundGlow } from './BackgroundGlow'
import BrandedText from './BrandedText'

interface TextWithBulletsProps {
  section: TextWithBulletsSection
}

export default function TextWithBullets({ section }: TextWithBulletsProps) {
  return (
    <section className="relative py-20">
      <BackgroundGlow
        variant="teal"
        className="left-[-80px] top-1/2 h-64 w-64 -translate-y-1/2 opacity-40 dark:opacity-20"
      />
      <div className="max-w-4xl mx-auto">
        <FadeInSection>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            <BrandedText as="span">{section.title}</BrandedText>
          </h2>

          <div className="space-y-6 mb-10">
            {section.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="space-y-4">
            {section.bullets.map((bullet, index) => (
              <FadeInSection key={index} delay={index * 0.05}>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-slate-800 backdrop-blur-2xl border border-gray-200/40 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-500/30 hover:shadow-md dark:hover:shadow-teal-500/5 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 mt-0.5 bg-teal-50 dark:bg-teal-500/10 rounded-full flex items-center justify-center ring-1 ring-teal-100 dark:ring-teal-500/20">
                    <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700 dark:text-gray-200 flex-1">{bullet}</span>
                </motion.li>
              </FadeInSection>
            ))}
          </ul>
        </FadeInSection>
      </div>
    </section>
  )
}

