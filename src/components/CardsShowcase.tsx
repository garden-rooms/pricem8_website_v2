import { CardsShowcaseSection } from '../types'
import AnimatedSection from './AnimatedSection'

interface CardsShowcaseProps {
  section: CardsShowcaseSection
}

export default function CardsShowcase({ section }: CardsShowcaseProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-light">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-accent mb-4">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {section.subtitle}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {section.cards.map((card, index) => (
            <AnimatedSection key={index} delay={index * 0.05}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100/60">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <img
                    src={`/images/${card.image}.png`}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://via.placeholder.com/600x400/00B8A9/FFFFFF?text=${encodeURIComponent(card.title)}`
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-accent mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

