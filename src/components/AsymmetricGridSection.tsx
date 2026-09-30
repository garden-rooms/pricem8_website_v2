import { motion } from 'framer-motion'
import FadeInSection from './FadeInSection'
import { getIcon } from '../utils/icons'

interface GridItem {
  title: string
  description: string
  image?: string
  icon?: string
  size?: 'small' | 'medium' | 'large'
}

interface AsymmetricGridSectionProps {
  section: {
    id: string
    title?: string
    subtitle?: string
    items: GridItem[]
  }
}

export default function AsymmetricGridSection({ section }: AsymmetricGridSectionProps) {
  // Create asymmetric grid layout
  const getGridClass = (index: number) => {
    if (index === 0) return 'md:col-span-2 md:row-span-2' // First item - large
    if (index === 1) return 'md:col-span-1 md:row-span-1' // Second item - small
    if (index === 2) return 'md:col-span-1 md:row-span-1' // Third item - small
    if (index === 3) return 'md:col-span-2 md:row-span-1' // Fourth item - wide
    return 'md:col-span-1 md:row-span-1' // Default
  }

  return (
    <section id={section.id} className="relative py-24 bg-white dark:bg-slate-950">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {section.items.map((item, index) => (
            <FadeInSection key={index} delay={0.3 + index * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 group ${getGridClass(index)}`}
              >
                {item.image ? (
                  <div className="relative h-full min-h-[300px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-white/90">{item.description}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 h-full flex flex-col">
                    {item.icon && (
                      <div className="w-16 h-16 bg-teal-50 dark:bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                        {getIcon(item.icon, "w-8 h-8")}
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 flex-grow">
                      {item.description}
                    </p>
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
