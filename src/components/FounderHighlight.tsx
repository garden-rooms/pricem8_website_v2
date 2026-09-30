import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FounderHighlightSection } from '../types'
import FadeInSection from './FadeInSection'
import { BackgroundGlow } from './BackgroundGlow'
import BrandedText from './BrandedText'

interface FounderHighlightProps {
  section: FounderHighlightSection
}

export default function FounderHighlight({ section }: FounderHighlightProps) {
  const isInternalLink = section.link.href.startsWith('/') && !section.link.href.startsWith('//')

  return (
    <section className="relative py-20">
      {section.image && (
        <BackgroundGlow
          variant="mixed"
          className="right-[-120px] top-1/2 h-96 w-96 -translate-y-1/2 opacity-40 dark:opacity-20"
        />
      )}
      <div className="max-w-6xl mx-auto">
        <div className={`grid ${section.image ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-12 items-center`}>
          {/* Text Content */}
          <FadeInSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              <BrandedText as="span">{section.title}</BrandedText>
            </h2>

            <div className="space-y-6 mb-8">
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>

            {isInternalLink ? (
              <motion.div whileHover={{ x: 4 }}>
                <Link
                  to={section.link.href}
                  className="inline-flex items-center text-teal-600 dark:text-teal-400 font-semibold hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200"
                >
                  {section.link.label}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ) : (
              <motion.a
                href={section.link.href}
                whileHover={{ x: 4 }}
                className="inline-flex items-center text-teal-600 dark:text-teal-400 font-semibold hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200"
              >
                {section.link.label}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            )}
          </FadeInSection>

          {/* Image */}
          {section.image && (
            <FadeInSection delay={0.2}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-slate-700 ring-1 ring-gray-100 dark:ring-slate-800"
              >
                <img
                  src={`/images/${encodeURIComponent(section.image)}.png`}
                  alt="Founder"
                  className="w-full h-auto"
                />
              </motion.div>
            </FadeInSection>
          )}
        </div>
      </div>
    </section>
  )
}

