import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import pricingPageSpec from '../data/pricingPageSpec.json'
import { PricingPageSpec, Section } from '../types'

import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import SimpleHero from '../components/SimpleHero'
import PricingTable from '../components/PricingTable'
import FAQ from '../components/FAQ'
import GridBackground from '../components/GridBackground'
import LargeCTA from '../components/LargeCTA'
import Footer from '../components/Footer'
import FadeInSection from '../components/FadeInSection'
import BrandedText from '../components/BrandedText'
import ModularPricing from '../components/ModularPricing'
import ComparisonSection from '../components/ComparisonSection'
import FreeAddonsSection from '../components/FreeAddonsSection'
import VideoSection from '../components/VideoSection'

// Import navbar and footer from home page spec
import homePageSpec from '../data/pageSpec.json'

export default function Pricing() {
  const [spec] = useState<PricingPageSpec>(pricingPageSpec as PricingPageSpec)
  const location = useLocation()

  useEffect(() => {
    // Update document title and meta description
    document.title = spec.seo.title
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', spec.seo.description)
    }

    // Scroll to top on route change
    window.scrollTo(0, 0)
  }, [spec, location])

  const renderSection = (section: Section) => {
    switch (section.type) {
      case 'simple-hero':
        return <SimpleHero key={section.id} section={section} />
      case 'pricing-table':
        return <PricingTable key={section.id} section={section} />
      case 'feature-section':
        // For "What's included" section, no image needed, center the content
        return (
          <section key={section.id} className="relative py-20">
            <div className="max-w-4xl mx-auto">
              <FadeInSection>
                <div className="text-center mb-8">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    <BrandedText as="span">{section.title}</BrandedText>
                  </h2>
                  {section.subtitle && (
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                      {section.subtitle}
                    </p>
                  )}
                </div>
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-4">
                    {section.bullets.map((bullet, index) => (
                      <FadeInSection key={index} delay={index * 0.05}>
                        <motion.li
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-500/30 hover:shadow-md dark:hover:shadow-teal-500/5 transition-all duration-300"
                        >
                          <div className="flex-shrink-0 w-6 h-6 mt-1 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-lg text-gray-700 dark:text-gray-200 flex-1">{bullet}</span>
                        </motion.li>
                      </FadeInSection>
                    ))}
                  </ul>
                )}
              </FadeInSection>
            </div>
          </section>
        )
      case 'faq':
        return <FAQ key={section.id} section={section} />
      case 'cta-large':
        return <LargeCTA key={section.id} section={section} />
      case 'modular-pricing':
        return <ModularPricing key={section.id} section={section} />
      case 'comparison':
        return <ComparisonSection key={section.id} section={section} />
      case 'free-addons':
        return <FreeAddonsSection key={section.id} section={section} />
      case 'video':
        return <VideoSection key={section.id} section={section} />
      default:
        return null
    }
  }

  // Get navbar and footer from home page spec
  const navbarSection = (homePageSpec as any).sections.find((s: any) => s.type === 'navbar')
  const footerSection = (homePageSpec as any).sections.find((s: any) => s.type === 'footer')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg relative overflow-hidden transition-colors duration-300">
      <GridBackground />
      {navbarSection && <Navbar section={navbarSection} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {spec.sections.map((section) => renderSection(section))}
      </div>
      {footerSection && <Footer section={footerSection} />}
    </div>
  )
}

