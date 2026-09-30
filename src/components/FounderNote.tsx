import { FounderNoteSection } from '../types'
import FadeInSection from './FadeInSection'
import { BackgroundGlow } from './BackgroundGlow'

interface FounderNoteProps {
  section: FounderNoteSection
}

export default function FounderNote({ section }: FounderNoteProps) {
  return (
    <section className="relative py-24">
      <BackgroundGlow
        variant="mixed"
        className="left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-50 dark:opacity-20"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 px-8 py-12 sm:px-12 sm:py-16 shadow-2xl dark:shadow-slate-900/50">
          {/* Decorative quote mark */}
          <div className="absolute top-8 left-8 text-teal-100 dark:text-teal-500/10 transform -translate-x-1/2 -translate-y-1/2">
            <svg className="w-32 h-32 opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <FadeInSection>
              <blockquote className="text-2xl sm:text-4xl font-medium mb-10 leading-relaxed text-gray-900 dark:text-white font-serif italic">
                "{section.quote}"
              </blockquote>

              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-1 bg-teal-500 rounded-full opacity-20"></div>
                <div className="text-center">
                  <div className="font-handwriting text-3xl text-teal-600 dark:text-teal-400 mb-2 transform -rotate-2">Michal</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-semibold">
                    {section.author.split(',')[1] || 'Founder'}
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  )
}

