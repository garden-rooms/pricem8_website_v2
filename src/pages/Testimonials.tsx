import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import testimonialsSpec from '../data/testimonialsPageSpec.json'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GridBackground from '../components/GridBackground'
import FadeInSection from '../components/FadeInSection'
import { BackgroundGlow } from '../components/BackgroundGlow'
import BrandedText from '../components/BrandedText'
import { Star, Quote } from 'lucide-react'

// Import navbar and footer from home page spec
import homePageSpec from '../data/pageSpec.json'

export default function Testimonials() {
    const [spec] = useState(testimonialsSpec)

    useEffect(() => {
        document.title = spec.seo.title
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
            metaDescription.setAttribute('content', spec.seo.description)
        }
        window.scrollTo(0, 0)
    }, [spec])

    const navbarSection = (homePageSpec as any).sections.find((s: any) => s.type === 'navbar')
    const footerSection = (homePageSpec as any).sections.find((s: any) => s.type === 'footer')

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
            <GridBackground />
            {navbarSection && <Navbar section={navbarSection} />}

            {/* Hero */}
            <section className="relative pt-32 pb-20 relative z-10">
                <BackgroundGlow
                    variant="mixed"
                    className="left-1/2 top-0 h-96 w-96 -translate-x-1/2 opacity-40 dark:opacity-20"
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <FadeInSection delay={0}>
                            <div className="inline-flex items-center px-4 py-2 mb-8 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium border border-teal-100 dark:border-teal-500/20 shadow-sm">
                                Community Stories
                            </div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight">
                                <BrandedText as="span">{spec.hero.title}</BrandedText>
                            </h1>
                            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                                {spec.hero.subtitle}
                            </p>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Masonry Grid */}
            <section className="relative pb-32 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {spec.testimonials.map((testimonial, index) => (
                            <FadeInSection key={index} delay={index * 0.05}>
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="break-inside-avoid rounded-3xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-8 shadow-lg dark:shadow-slate-900/50 border border-gray-200 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10 dark:hover:shadow-teal-500/5 hover:border-teal-200 dark:hover:border-teal-500/30 hover:bg-white dark:hover:bg-slate-800"
                                >
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 dark:text-yellow-500 fill-yellow-400 dark:fill-yellow-500" />
                                        ))}
                                    </div>

                                    <Quote className="w-10 h-10 text-teal-500/30 dark:text-teal-400/30 mb-4" />

                                    <p className="text-lg text-gray-800 dark:text-gray-200 mb-8 leading-relaxed italic">
                                        "{testimonial.quote}"
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md ring-2 ring-teal-100 dark:ring-teal-500/30">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                                            <div className="text-sm text-teal-700 dark:text-teal-400 font-medium">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative pb-32 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-slate-950 dark:to-slate-900 px-8 py-16 shadow-2xl text-center border border-gray-700 dark:border-slate-700">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 dark:opacity-5" />
                        <FadeInSection>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 relative z-10">
                                {spec.cta.title}
                            </h2>
                            <p className="text-xl text-gray-300 dark:text-gray-200 mb-10 max-w-2xl mx-auto relative z-10">
                                {spec.cta.subtitle}
                            </p>
                            <motion.a
                                href={spec.cta.primaryHref}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center rounded-full bg-white dark:bg-slate-100 px-8 py-4 text-base font-bold text-gray-900 dark:text-gray-900 shadow-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-white relative z-10"
                            >
                                {spec.cta.primaryLabel}
                            </motion.a>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {footerSection && <Footer section={footerSection} />}
        </div>
    )
}
