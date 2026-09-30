import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { tradesContent, TradeId } from '../data/trades'
import FadeInSection from '../components/FadeInSection'
import { BackgroundGlow } from '../components/BackgroundGlow'
import FAQ from '../components/FAQ'
import BrandedText from '../components/BrandedText'
import GridBackground from '../components/GridBackground'
import { Droplets, Zap, Shovel, BrickWall, Home, Warehouse, CheckCircle2, AlertCircle, Package, Hammer, ClipboardList, ArrowRight } from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import homePageSpec from '../data/pageSpec.json'

const iconMap: Record<string, any> = {
  Droplets,
  Zap,
  Shovel,
  BrickWall,
  Home,
  Warehouse
}

export default function TradePage() {
  const { tradeId } = useParams<{ tradeId: string }>()
  const navigate = useNavigate()

  // Get trade content or redirect to plumbing
  const trade = tradeId && tradeId in tradesContent
    ? tradesContent[tradeId as TradeId]
    : null

  useEffect(() => {
    if (!trade) {
      navigate('/trades/plumbing', { replace: true })
      return
    }

    const pageUrl = `https://pricem8.uk${trade.path}`

    // Update document title
    document.title = trade.seo.title

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', trade.seo.description)
    }

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', pageUrl)

    // Update Open Graph tags
    const updateMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute('property', property)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    updateMeta('og:title', trade.seo.title)
    updateMeta('og:description', trade.seo.description)
    updateMeta('og:url', pageUrl)
    updateMeta('og:site_name', 'PriceM8')

    // Update Twitter tags
    const updateTwitter = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute('property', property)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    updateTwitter('twitter:title', trade.seo.title)
    updateTwitter('twitter:description', trade.seo.description)
    updateTwitter('twitter:url', pageUrl)

    // Remove existing trade-specific schema scripts
    const existingTradeSchemas = document.querySelectorAll('script[data-trade-schema="true"]')
    existingTradeSchemas.forEach(script => script.remove())

    // Create comprehensive schema markup for trade pages
    const tradeDescriptions: Record<string, string> = {
      'plumbing': 'Plumbing estimating and quoting software for UK plumbers. Price bathrooms, boiler swaps and call-outs fast with live material prices and professional PDF quotes.',
      'electrical': 'Electrical estimating and quoting software for UK electricians. Create professional electrical quotes with live cable prices, pre-built rewire packs and NICEIC-ready details.',
      'landscaping': 'Landscaping estimating and quoting software for UK landscapers. Quote patios, decking, fencing and garden rooms with live aggregate and timber prices.',
      'building': 'Builder estimating and quoting software designed for extensions, renovations and general building work.',
      'garden-rooms': 'Garden room estimating and quoting software for UK garden room specialists. Price garden offices, studios and gyms accurately with live timber and cladding prices.'
    }

    // SoftwareApplication Schema
    const softwareApplicationSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': `PriceM8 - ${trade.name} Estimating Software`,
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'Web',
      'description': tradeDescriptions[trade.id] || trade.seo.description,
      'url': pageUrl,
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'GBP',
        'availability': 'https://schema.org/InStock',
        'priceValidUntil': new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.8',
        'ratingCount': '50'
      },
      'author': {
        '@type': 'Organization',
        'name': 'PriceM8',
        'url': 'https://pricem8.uk'
      },
      'featureList': trade.pack.materials.slice(0, 5).concat(trade.pack.labour.slice(0, 3))
    }

    // FAQPage Schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': trade.faq.items.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    }

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://pricem8.uk/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Trades',
          'item': 'https://pricem8.uk/trades'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': trade.name,
          'item': pageUrl
        }
      ]
    }

    // Add schema scripts to head
    const addSchemaScript = (schema: any) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-trade-schema', 'true')
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    }

    addSchemaScript(softwareApplicationSchema)
    addSchemaScript(faqSchema)
    addSchemaScript(breadcrumbSchema)

    // Scroll to top on route change
    window.scrollTo(0, 0)
  }, [trade, navigate])

  if (!trade) {
    return null // Will redirect
  }

  const Icon = iconMap[trade.icon] || Home

  // Get navbar and footer from home page spec
  const navbarSection = (homePageSpec as any).sections.find((s: any) => s.type === 'navbar')
  const footerSection = (homePageSpec as any).sections.find((s: any) => s.type === 'footer')

  const isHashLink = (href: string) => href.startsWith('#')
  const isExternalLink = (href: string) => href.startsWith('http') || href.startsWith('//')

  const getCTAHref = () => {
    // If it's a hash link or external, return as-is
    if (isHashLink(trade.cta.primaryHref) || isExternalLink(trade.cta.primaryHref)) {
      return trade.cta.primaryHref
    }
    // If it's /pricing, convert to hash link for home page pricing section
    if (trade.cta.primaryHref === '/pricing') {
      return '/#pricing'
    }
    return trade.cta.primaryHref
  }

  const ctaHref = getCTAHref()
  const CTAButton = isHashLink(ctaHref) || isExternalLink(ctaHref) ? (
    <motion.a
      href={ctaHref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-teal-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/40"
    >
      {trade.cta.primaryLabel}
    </motion.a>
  ) : (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        to={ctaHref}
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-teal-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/40"
      >
        {trade.cta.primaryLabel}
      </Link>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg relative overflow-hidden transition-colors duration-300">
      <GridBackground />
      {navbarSection && <Navbar section={navbarSection} />}

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 relative z-10">
        <BackgroundGlow
          variant="mixed"
          className="left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 opacity-30"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInSection delay={0}>
              <div className="text-left">
                {trade.hero.badge && (
                  <div className="inline-flex items-center px-4 py-2 mb-8 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-100 shadow-sm">
                    {trade.hero.badge}
                  </div>
                )}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight">
                  <BrandedText as="span">{trade.hero.title}</BrandedText>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-xl leading-relaxed">
                  {trade.hero.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href="/pricing"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-4 text-base font-bold text-white shadow-lg shadow-gray-900/20 transition-all duration-200 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/30"
                  >
                    Start free trial
                  </motion.a>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="relative hidden lg:flex justify-center items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full blur-3xl" />
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative w-full max-w-[500px] bg-white/60 dark:bg-gray-950/40 backdrop-blur-2xl rounded-[2rem] sm:rounded-[3rem] shadow-2xl dark:shadow-slate-900/50 border border-gray-200/40 dark:border-white/5 flex items-center justify-center rotate-3 group/hero"
                >
                  {/* Inner container to clip image/gradient but not floating elements */}
                  <div className="absolute inset-0 rounded-[2rem] sm:rounded-[3rem] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-500/5 dark:to-blue-500/5 opacity-50" />

                    {trade.hero.heroImage && (
                      <img
                        src={`/images/${trade.hero.heroImage}`}
                        alt={trade.name}
                        className="w-full h-auto relative z-10 scale-[1.02] group-hover/hero:scale-105 transition-transform duration-700"
                      />
                    )}
                  </div>

                  {!trade.hero.heroImage && (
                    <div className="p-20 relative z-10">
                      <Icon className="w-40 h-40 text-teal-600 drop-shadow-2xl" strokeWidth={1} />
                    </div>
                  )}

                  {/* Floating elements - now relative and z-30 to stay on top */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl p-4 rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-gray-200/40 dark:border-white/5 z-30"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-6 -left-6 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl p-4 rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-gray-200/40 dark:border-white/5 z-30"
                  >
                    <div className="text-sm font-bold text-gray-900 dark:text-white">Saved time</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">2hrs / quote</div>
                  </motion.div>
                </motion.div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="relative py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                <BrandedText as="span">{trade.pains.title}</BrandedText>
              </h2>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trade.pains.items.map((item, index) => (
              <FadeInSection key={index} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-white/50 dark:bg-slate-800/40 backdrop-blur-2xl border border-gray-200/40 dark:border-slate-700 shadow-lg dark:shadow-slate-900/50 hover:border-red-200 dark:hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-500/5 transition-all duration-300 h-full"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-lg text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* How PriceM8 Helps Section */}
      <section className="relative py-24 relative z-10">
        <BackgroundGlow
          variant="teal"
          className="right-[-80px] top-1/2 h-96 w-96 -translate-y-1/2 opacity-30"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                <BrandedText as="span">{trade.howHelps.title}</BrandedText>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed" dangerouslySetInnerHTML={{ __html: trade.howHelps.intro }} />
              <ul className="space-y-6">
                {trade.howHelps.bullets.map((bullet, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 mt-1 bg-teal-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-lg text-gray-700 dark:text-gray-300">{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 dark:border-slate-800 bg-slate-900 dark:bg-slate-950 aspect-[4/3] group">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 group-hover:opacity-75 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-10 h-10 text-teal-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Tailored for {trade.name}</h3>
                    <p className="text-teal-100/60">Pre-loaded with {trade.name} packs</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      {trade.showcase && (
        <section className="relative py-24 bg-slate-50 dark:bg-slate-900/10">
          <BackgroundGlow
            variant="blue"
            className="left-[-120px] top-1/2 h-96 w-96 -translate-y-1/2 opacity-30 dark:opacity-20"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <FadeInSection>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  <BrandedText as="span">{trade.showcase.title}</BrandedText>
                </h2>
                {trade.showcase.description && (
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                    {trade.showcase.description}
                  </p>
                )}
              </FadeInSection>
            </div>

            <FadeInSection delay={0.2}>
              <div className="relative group">
                {/* Decorative background element */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 ring-1 ring-gray-900/5 dark:ring-white/5">
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 to-blue-500/5 pointer-events-none" />
                  <img
                    src={`/images/${trade.showcase.image}`}
                    alt={trade.showcase.title}
                    className="w-full h-auto relative z-10"
                  />
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* How It Fits Together Section (if exists) */}
      {trade.howFitsTogether && (
        <section className="relative py-24 relative z-10">
          <BackgroundGlow
            variant="teal"
            className="left-[-80px] top-1/2 h-64 w-64 -translate-y-1/2 opacity-40 dark:opacity-20"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <FadeInSection>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  <BrandedText as="span">{trade.howFitsTogether.title}</BrandedText>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {trade.howFitsTogether.intro}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Learn how estimates are built in our{' '}
                  <Link
                    to="/construction-estimating-software"
                    className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium underline"
                  >
                    {trade.howFitsTogether.estimatingLink}
                  </Link>
                  , or see how approved quotes move into jobs with our{' '}
                  <Link
                    to="/construction-quoting-software"
                    className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium underline"
                  >
                    {trade.howFitsTogether.quotingLink}
                  </Link>
                  .
                </p>
              </FadeInSection>
            </div>
          </div>
        </section>
      )}

      {/* Trade Pack Section */}
      <section className="relative py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                <BrandedText as="span">{trade.pack.title}</BrandedText>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {trade.pack.intro}
              </p>
            </FadeInSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Materials */}
            <FadeInSection delay={0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="h-full rounded-3xl bg-white/50 dark:bg-slate-800/40 backdrop-blur-2xl p-8 shadow-lg dark:shadow-slate-900/50 border border-gray-200/40 dark:border-slate-700 transition-all duration-300 hover:shadow-xl hover:border-teal-200 dark:hover:border-teal-500/30"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Materials</h3>
                <ul className="space-y-3">
                  {trade.pack.materials.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </FadeInSection>

            {/* Labour */}
            <FadeInSection delay={0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                className="h-full rounded-3xl bg-white/50 dark:bg-slate-800/40 backdrop-blur-2xl p-8 shadow-lg dark:shadow-slate-900/50 border border-gray-200/40 dark:border-slate-700 transition-all duration-300 hover:shadow-xl hover:border-teal-200 dark:hover:border-teal-500/30"
              >
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6">
                  <Hammer className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Labour</h3>
                <ul className="space-y-3">
                  {trade.pack.labour.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </FadeInSection>

            {/* Typical Tasks */}
            <FadeInSection delay={0.2}>
              <motion.div
                whileHover={{ y: -8 }}
                className="h-full rounded-3xl bg-white/50 dark:bg-slate-800/40 backdrop-blur-2xl p-8 shadow-lg dark:shadow-slate-900/50 border border-gray-200/40 dark:border-slate-700 transition-all duration-300 hover:shadow-xl hover:border-teal-200 dark:hover:border-teal-500/30"
              >
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
                  <ClipboardList className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Typical Tasks</h3>
                <ul className="space-y-3">
                  {trade.pack.tasks.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Full Tasks List Section */}
      {trade.tasks && (
        <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900/50 dark:to-slate-900 relative z-10">
          <BackgroundGlow
            variant="teal"
            className="right-[-120px] top-1/2 h-96 w-96 -translate-y-1/2 opacity-20 dark:opacity-10"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <FadeInSection>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  <BrandedText as="span">{trade.tasks.title}</BrandedText>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {trade.tasks.intro}
                </p>
              </FadeInSection>
            </div>

            <div className="space-y-12">
              {trade.tasks.categories.map((category, categoryIndex) => (
                <FadeInSection key={categoryIndex} delay={categoryIndex * 0.1}>
                  <div className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-2xl rounded-3xl border border-gray-200/40 dark:border-slate-700 p-8 md:p-10 shadow-lg dark:shadow-slate-900/50">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b border-gray-200 dark:border-slate-700">
                      {category.name}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {category.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: itemIndex * 0.05 }}
                          viewport={{ once: true }}
                          className={`p-6 rounded-2xl transition-all duration-300 ${
                            item.highlight
                              ? 'bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border-2 border-teal-200 dark:border-teal-500/30 shadow-md'
                              : 'bg-gray-50/50 dark:bg-slate-700/30 border border-gray-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-500/30'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                              item.highlight
                                ? 'bg-teal-500 text-white'
                                : 'bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400'
                            }`}>
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-bold text-lg mb-2 ${
                                item.highlight
                                  ? 'text-gray-900 dark:text-white'
                                  : 'text-gray-800 dark:text-gray-200'
                              }`}>
                                {item.name}
                              </h4>
                              {item.description && (
                                Array.isArray(item.description) ? (
                                  <ul className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-2 mt-2">
                                    {item.description.map((feature, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <span className="text-teal-500 mt-1.5 flex-shrink-0">•</span>
                                        <span>{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {item.description}
                                  </p>
                                )
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>

            <FadeInSection delay={0.3}>
              <div className="mt-16 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/pricing"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-500 dark:to-teal-400 text-white rounded-full font-bold text-lg shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/40 transition-all duration-200"
                  >
                    See pricing for {trade.name} Pack
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <FAQ title={trade.faq.title} items={trade.faq.items} />

      {/* CTA Section */}
      <section className="relative mt-16 mb-12 relative z-10">
        <BackgroundGlow
          variant="mixed"
          className="left-1/2 top-0 h-72 w-[480px] -translate-x-1/2 opacity-50"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-white/60 dark:bg-gray-950/40 backdrop-blur-2xl border border-gray-200/40 dark:border-white/5 px-8 py-16 shadow-2xl dark:shadow-slate-900/50 text-center">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500" />

            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                <BrandedText as="span">{trade.cta.title}</BrandedText>
              </h2>
              {trade.cta.subtitle && (
                <p className="text-xl mb-10 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {trade.cta.subtitle}
                </p>
              )}
              {CTAButton}
            </FadeInSection>
          </div>
        </div>
      </section>

      {footerSection && <Footer section={footerSection} />}
    </div>
  )
}

