import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import aboutPageSpec from '../data/aboutPageSpec.json'
import { AboutPageSpec } from '../types'

import Navbar from '../components/Navbar'
import SimpleHero from '../components/SimpleHero'
import TextBlock from '../components/TextBlock'
import BulletedList from '../components/BulletedList'
import FounderNote from '../components/FounderNote'
import Footer from '../components/Footer'
import GridBackground from '../components/GridBackground'

// Import navbar and footer from home page spec
import homePageSpec from '../data/pageSpec.json'

export default function About() {
  const [spec] = useState<AboutPageSpec>(aboutPageSpec as AboutPageSpec)
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

  const renderSection = (section: AboutPageSpec['sections'][0]) => {
    switch (section.type) {
      case 'simple-hero':
        return <SimpleHero key={section.id} section={section} />
      case 'text-block':
        return <TextBlock key={section.id} section={section} />
      case 'bulleted-list':
        return <BulletedList key={section.id} section={section} />
      case 'founder-note':
        return <FounderNote key={section.id} section={section} />
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
        <div className="space-y-12 sm:space-y-24 pb-24">
          {spec.sections.map((section) => renderSection(section))}
        </div>
      </div>
      {footerSection && <Footer section={footerSection} />}
    </div>
  )
}

