import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import featuresPageSpec from '../data/featuresPageSpec.json'
import { FeaturesPageSpec } from '../types'

import Navbar from '../components/Navbar'
import SimpleHero from '../components/SimpleHero'
import FeatureSection from '../components/FeatureSection'
import LargeCTA from '../components/LargeCTA'
import Footer from '../components/Footer'

// Import navbar and footer from home page spec
import homePageSpec from '../data/pageSpec.json'

import GridBackground from '../components/GridBackground'

export default function Features() {
  const [spec] = useState<FeaturesPageSpec>(featuresPageSpec as FeaturesPageSpec)
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

  const renderSection = (section: FeaturesPageSpec['sections'][0], index: number) => {
    switch (section.type) {
      case 'simple-hero':
        return <SimpleHero key={section.id} section={section} />
      case 'feature-section':
        // Alternate image position for visual variety
        const imagePosition = index % 2 === 0 ? 'right' : 'left'
        return <FeatureSection key={section.id} section={section} imagePosition={imagePosition} />
      case 'cta-large':
        return <LargeCTA key={section.id} section={section} />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {spec.sections.map((section, index) => renderSection(section, index))}
      </div>
      {footerSection && <Footer section={footerSection} />}
    </div>
  )
}

