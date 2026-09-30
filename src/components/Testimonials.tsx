import { motion } from 'framer-motion'
import { TestimonialsSection } from '../types'
import FadeInSection from './FadeInSection'
import { BackgroundGlow } from './BackgroundGlow'
import BrandedText from './BrandedText'

interface TestimonialsProps {
  section: TestimonialsSection
}

export default function Testimonials({ section }: TestimonialsProps) {
  return (
    <section id="testimonials" className="relative py-20">
      <BackgroundGlow
        variant="mixed"
        className="left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-40 dark:opacity-20"
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {section.items.map((testimonial, index) => {
            const variants = [
              'dark:bg-gradient-to-br dark:from-amber-900/40 dark:to-gray-950/50 dark:border-amber-500/30',
              'dark:bg-gradient-to-br dark:from-blue-900/40 dark:to-gray-950/50 dark:border-blue-500/30',
              'dark:bg-gradient-to-br dark:from-purple-900/40 dark:to-gray-950/50 dark:border-purple-500/30'
            ]
            const variantClass = variants[index % variants.length]

            return (
              <FadeInSection key={index} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`rounded-2xl bg-white/50 dark:bg-gray-950/40 backdrop-blur-2xl p-8 shadow-lg dark:shadow-slate-900/50 border border-gray-200/40 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 dark:hover:shadow-teal-500/5 hover:border-teal-200 dark:hover:border-teal-500/30 ${variantClass}`}
                >
                  {/* Quote */}
                  <div className="mb-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <svg className="w-8 h-8 text-teal-400/40 dark:text-teal-400/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden ring-2 ring-teal-100 dark:ring-teal-500/30">
                      {testimonial.image ? (
                        <img
                          src={`/images/${testimonial.image}.png`}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            const parent = target.parentElement
                            if (parent) {
                              parent.textContent = testimonial.name.charAt(0).toUpperCase()
                            }
                          }}
                        />
                      ) : (
                        <span>{testimonial.name.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </div>
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

