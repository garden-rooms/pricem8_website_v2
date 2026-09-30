import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeInSection from './FadeInSection'
import { BackgroundGlow } from './BackgroundGlow'
import BrandedText from './BrandedText'
import { FAQSection } from '../types'
import { useWaitingList } from '../context/WaitingListContext'

interface FAQProps {
  section?: FAQSection
  title?: string
  items?: { question: string; answer: string }[]
}

export default function FAQ({ section, title, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { openWaitlist } = useWaitingList()

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Support both APIs: section prop or title/items props
  const faqTitle = section?.title || title || ''
  const faqItems = section?.items || items || []
  const sectionId = section?.id
  const footerText = (section as any)?.footer

  return (
    <section className="relative py-20" id={sectionId}>
      <BackgroundGlow
        variant="purple"
        className="left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-40 dark:opacity-20"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              <BrandedText as="span">{faqTitle}</BrandedText>
            </h2>
          </FadeInSection>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <FadeInSection key={index} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="bg-white/50 dark:bg-slate-800 backdrop-blur-2xl rounded-2xl border border-gray-200/40 dark:border-slate-700 shadow-lg dark:shadow-slate-900/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 dark:hover:shadow-teal-500/5 hover:border-teal-200 dark:hover:border-teal-500/30"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                  >
                    <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                      {item.question}
                    </span>
                    <motion.svg
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-4 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-slate-700 space-y-3">
                          {item.answer.split('\n').map((line, i) => {
                            if (line.trim().startsWith('-')) {
                              return (
                                <div key={i} className="flex gap-2 pl-2">
                                  <span className="text-teal-500">•</span>
                                  <span>{line.trim().substring(1).trim()}</span>
                                </div>
                              )
                            }
                            return <p key={i}>{line}</p>
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeInSection>
            ))}
          </div>

          {footerText && (
            <FadeInSection delay={0.3}>
              <div className="mt-16 text-center">
                <div className="inline-block p-8 rounded-3xl bg-teal-50/50 dark:bg-teal-500/5 border border-teal-100 dark:border-teal-500/20">
                  {footerText.split('\n').map((line: string, i: number) => (
                    <p key={i} className={i === 0 ? "text-xl font-bold text-gray-900 dark:text-white mb-2" : "text-gray-600 dark:text-gray-300"}>
                      {line}
                    </p>
                  ))}
                  <motion.button
                    onClick={openWaitlist}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-8 py-3 bg-teal-600 text-white rounded-full font-bold shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all"
                  >
                    Start your free trial
                  </motion.button>
                </div>
              </div>
            </FadeInSection>
          )}
        </div>
      </div>
    </section>
  )
}


