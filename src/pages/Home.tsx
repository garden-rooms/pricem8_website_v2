import { useEffect, useState } from 'react'
import pageSpec from '../data/pageSpec.json'
import { PageSpec, Section } from '../types'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FeatureGrid from '../components/FeatureGrid'

import TradeIcons from '../components/TradeIcons'
import PricingTable from '../components/PricingTable'
import Testimonials from '../components/Testimonials'
import LargeCTA from '../components/LargeCTA'
import Footer from '../components/Footer'
import TextWithBullets from '../components/TextWithBullets'
import Steps from '../components/Steps'
import FounderHighlight from '../components/FounderHighlight'
import MiniPricing from '../components/MiniPricing'
import FAQ from '../components/FAQ'
import GridBackground from '../components/GridBackground'
import TrustedBy from '../components/TrustedBy'
import FeatureSection from '../components/FeatureSection'
import VideoSection from '../components/VideoSection'
import StatsSection from '../components/StatsSection'
import FullWidthImageSection from '../components/FullWidthImageSection'
import AsymmetricGridSection from '../components/AsymmetricGridSection'

export default function Home() {
  const [spec] = useState<PageSpec>(pageSpec as PageSpec)

  useEffect(() => {
    // Update document title and meta description
    document.title = spec.seo.title
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', spec.seo.description)
    }
  }, [spec])

  const renderSection = (section: Section) => {
    switch (section.type) {
      case 'navbar':
        return <Navbar key={section.id} section={section} />
      case 'hero':
        return <Hero key={section.id} section={section} />
      case 'trusted-by':
        return <TrustedBy key={section.id} section={section as any} />
      case 'video':
        return <VideoSection key={section.id} section={section as any} />
      case 'stats':
        return <StatsSection key={section.id} section={section as any} />
      case 'full-width-image':
        return <FullWidthImageSection key={section.id} section={section as any} />
      case 'asymmetric-grid':
        return <AsymmetricGridSection key={section.id} section={section as any} />
      case 'text-with-bullets':
        return <TextWithBullets key={section.id} section={section} />
      case 'feature-grid':
        return <FeatureGrid key={section.id} section={section} />
      case 'feature-section':
        return <FeatureSection key={section.id} section={section as any} />
      case 'steps':
        return <Steps key={section.id} section={section} />
      case 'trade-icons':
        return <TradeIcons key={section.id} section={section} />
      case 'founder-highlight':
        return <FounderHighlight key={section.id} section={section} />
      case 'pricing-table':
        return <PricingTable key={section.id} section={section} />
      case 'mini-pricing':
        return <MiniPricing key={section.id} section={section} />
      case 'testimonials':
        return <Testimonials key={section.id} section={section} />
      case 'faq':
        return <FAQ key={section.id} section={section} />
      case 'cta-large':
        return <LargeCTA key={section.id} section={section} />
      case 'footer':
        return <Footer key={section.id} section={section} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg relative overflow-hidden transition-colors duration-300">
      <GridBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
        {spec.sections.map((section) => renderSection(section))}
      </div>
    </div>
  )
}
