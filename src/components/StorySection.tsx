import { motion } from 'framer-motion'
import { TextBlockSection } from '../types' // Reusing TextBlockSection for now, or we can define a new one
import FadeInSection from './FadeInSection'
import { BackgroundGlow } from './BackgroundGlow'
import BrandedText from './BrandedText'

interface StorySectionProps {
    section: TextBlockSection & { image?: string } // Extending type locally for now
}

export default function StorySection({ section }: StorySectionProps) {
    return (
        <section className="relative py-24 overflow-hidden">
            <BackgroundGlow
                variant="purple"
                className="left-[-100px] top-1/3 h-96 w-96 opacity-40"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text Content */}
                    <FadeInSection>
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                                <BrandedText as="span">{section.title}</BrandedText>
                            </h2>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                {section.paragraphs.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </FadeInSection>

                    {/* Image/Visual */}
                    <FadeInSection delay={0.2}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-purple-500/20 rounded-3xl blur-2xl transform rotate-3 scale-105" />
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.5 }}
                                className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white"
                            >
                                {/* Placeholder for founder image if we had one, or a generic nice shot */}
                                <div className="aspect-[4/3] bg-gray-100 relative flex items-center justify-center overflow-hidden">
                                    {/* We can use the image from the spec if available, otherwise a placeholder */}
                                    {section.image ? (
                                        <img
                                            src={`/images/${section.image}.jpg`}
                                            alt="Founder working"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000'
                                            }}
                                        />
                                    ) : (
                                        <div className="text-gray-400 flex flex-col items-center">
                                            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>Founder Image</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center border border-teal-100 shadow-lg hidden sm:flex">
                                <span className="text-3xl">👷‍♂️</span>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </div>
        </section>
    )
}
