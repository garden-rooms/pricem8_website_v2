import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { tradesContent } from '../data/trades'
import FadeInSection from '../components/FadeInSection'
import { BackgroundGlow } from '../components/BackgroundGlow'
import { formatPriceM8 } from '../components/BrandedText'
import GridBackground from '../components/GridBackground'
import { Droplets, Zap, Shovel, BrickWall, Home, Warehouse, ArrowRight } from 'lucide-react'

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

export default function TradesIndex() {
  const trades = Object.values(tradesContent)

  useEffect(() => {
    document.title = 'Product Lines — PriceM8'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'PriceM8 covers two product lines: Landscaping and Garden Rooms, with dedicated packs, calculators and pricing for each.')
    }
    window.scrollTo(0, 0)
  }, [])

  const navbarSection = (homePageSpec as any).sections.find((s: any) => s.type === 'navbar')
  const footerSection = (homePageSpec as any).sections.find((s: any) => s.type === 'footer')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg relative overflow-hidden transition-colors duration-300">
      <GridBackground />
      {navbarSection && <Navbar section={navbarSection} />}

      {/* Hero */}
      <section className="relative pt-32 pb-20 relative z-10">
        <BackgroundGlow
          variant="teal"
          className="left-1/2 top-0 h-96 w-96 -translate-x-1/2 opacity-40 dark:opacity-20"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up-blur [animation-delay:100ms]">
              <div className="inline-flex items-center px-4 py-2 mb-8 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium border border-teal-100 dark:border-teal-500/20 shadow-sm">
                Product Lines
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight animate-fade-in-up-blur [animation-delay:200ms]">
                Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">Landscaping & Garden Rooms</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-blur [animation-delay:300ms]">
                {formatPriceM8('PriceM8 gives you tailored packs and pricing tools for both sides of the business — Landscaping and Garden Rooms.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trades Grid */}
      <section className="relative pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trades.map((trade, index) => {
                const Icon = iconMap[trade.icon] || Home
                return (
                  <FadeInSection key={trade.id} delay={index * 0.05}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="h-full"
                    >
                      <Link
                        to={trade.path}
                        className="group block h-full rounded-3xl bg-white/50 dark:bg-slate-800/40 backdrop-blur-2xl p-8 shadow-lg dark:shadow-slate-900/50 border border-gray-200/40 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10 dark:hover:shadow-teal-500/5 hover:border-teal-200 dark:hover:border-teal-500/30 hover:bg-white/60 dark:hover:bg-slate-800/60"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-500/10 dark:to-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-teal-100 dark:border-teal-500/20">
                          <Icon className="w-7 h-7 text-teal-600 dark:text-teal-400" strokeWidth={1.5} />
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                          {trade.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed min-h-[3rem]">
                          {trade.hero.subtitle}
                        </p>

                        <span className="text-teal-600 dark:text-teal-400 font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                          View Trade Pack
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </Link>
                    </motion.div>
                  </FadeInSection>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {footerSection && <Footer section={footerSection} />}
    </div>
  )
}

