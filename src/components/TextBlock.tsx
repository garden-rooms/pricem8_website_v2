import { TextBlockSection } from '../types'
import FadeInSection from './FadeInSection'
import { BackgroundGlow } from './BackgroundGlow'
import BrandedText from './BrandedText'

interface TextBlockProps {
  section: TextBlockSection
}

export default function TextBlock({ section }: TextBlockProps) {
  return (
    <section className="relative py-20">
      <BackgroundGlow
        variant="teal"
        className="left-[-80px] top-1/2 h-64 w-64 -translate-y-1/2 opacity-40 dark:opacity-20"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              <BrandedText as="span">{section.title}</BrandedText>
            </h2>
            <div className="space-y-6">
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}

