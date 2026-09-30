import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight, ShieldCheck, Play, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FadeInSection from '../components/FadeInSection'
import homePageSpec from '../data/pageSpec.json'

const footerSection = (homePageSpec as any).sections.find((s: any) => s.type === 'footer')
const navbarSection = (homePageSpec as any).sections.find((s: any) => s.type === 'navbar')

// Trade-specific variants
const tradeVariants: Record<string, any> = {
  landscaping: {
    hero: {
      headline: "Landscaping quotes in minutes — not hours.",
      subheadline: "Build one real quote today using live merchant prices — and see your profit before you send it."
    },
    tradeName: "Landscapers",
    exampleLanguage: {
      step1: "Pick the Landscaping pack",
      step2: "Enter patio dimensions or decking area",
      example: "paving estimate",
      material: "MOT Type 1, sharp sand, and cement"
    }
  },
  building: {
    hero: {
      headline: "Extension quotes without guesswork.",
      subheadline: "Build one real quote today using live merchant prices — and see your profit before you send it."
    },
    tradeName: "Builders",
    exampleLanguage: {
      step1: "Pick the Building pack",
      step2: "Enter wall lengths or room dimensions",
      example: "extension quote",
      material: "blocks, insulation, and timber"
    }
  },
  plumbing: {
    hero: {
      headline: "Bathroom quotes in minutes — not hours.",
      subheadline: "Build one real quote today using live merchant prices — and see your profit before you send it."
    },
    tradeName: "Plumbers",
    exampleLanguage: {
      step1: "Pick the Plumbing pack",
      step2: "Enter bathroom layout or boiler specs",
      example: "bathroom quote",
      material: "copper, fittings, and fixtures"
    }
  },
  electrical: {
    hero: {
      headline: "Rewire quotes in minutes — not hours.",
      subheadline: "Build one real quote today using live merchant prices — and see your profit before you send it."
    },
    tradeName: "Electricians",
    exampleLanguage: {
      step1: "Pick the Electrical pack",
      step2: "Enter circuit counts or room layouts",
      example: "rewire quote",
      material: "cable, consumer units, and accessories"
    }
  }
}

// A/B test variants for hero (default/generic)
const heroVariants = {
  a: {
    headline: "Stop guessing. Price jobs with confidence — in minutes.",
    subheadline: "Build one real quote today using live merchant prices — and see your profit before you send it."
  },
  b: {
    headline: "The no-guesswork pricing system for UK tradies.",
    subheadline: "Build one real quote today using live merchant prices — and see your profit before you send it."
  }
}

// All copy in one object for easy iteration
const copy = {
  hero: {
    primaryCta: "Start free trial",
    secondaryCta: "Watch 60-second demo",
    trustPoints: [
      "Build your first real quote in minutes",
      "Cancel anytime",
      "No obligation"
    ]
  },
  pain: {
    headline: "Quoting shouldn't be a gamble.",
    bullets: [
      "Material prices change — your quotes don't",
      "Fixings, waste, and sundries get forgotten",
      "Margins disappear without warning",
      "Evenings wasted formatting PDFs"
    ],
    closing: "These mistakes don't show up on the quote — they show up in your bank account."
  },
  howItWorks: {
    headline: "How PriceM8 works",
    steps: [
      {
        title: "Pick your trade pack",
        time: "30 seconds",
        description: "Choose a pre-built pack for your trade instead of starting from a blank page."
      },
      {
        title: "Enter measurements",
        time: "2–3 minutes",
        description: "PriceM8 calculates quantities, waste, and materials automatically."
      },
      {
        title: "Check profit & send",
        time: "1 click",
        description: "See margin instantly, then send a branded PDF and client link in one click."
      }
    ]
  },
  mechanism: {
    headline: "Accurate quotes. Guaranteed.",
    contrast: "Most software averages numbers.\nPriceM8 calculates them.",
    body: "PriceM8 uses deterministic data — not guesswork.\nEvery calculation is based on your inputs and current UK merchant pricing, so you know the numbers before the job starts.",
    bullets: [
      "Live merchant pricing",
      "Automatic waste & sundries",
      "Deterministic takeoffs, not averages"
    ]
  },
  trades: {
    headline: "Built for real UK trades",
    items: ["Plumbers", "Electricians", "Landscapers", "Builders"],
    subtext: "Each pack reflects how the work is actually done on site — not generic software assumptions."
  },
  bonuses: {
    headline: "Limited Time: Get These Premium Add-Ons FREE",
    subheadline: "Included for early users while we onboard the next wave of UK tradies.",
    valueAnchor: "You're not just getting software — you're getting a complete pricing system.",
    items: [
      {
        title: "Ultimate Profit Protector",
        description: "Stops you underpricing jobs before you send the quote.",
        worth: "£29",
        highlight: true,
        killsExcuse: "Included free for early users"
      },
      {
        title: "Client-Ready PDF Kit",
        description: "Look professional instantly, even if you hate paperwork.",
        worth: "£19",
        killsExcuse: "Included free for early users"
      },
      {
        title: "Never-Forget Sundries System",
        description: "Automatically adds fixings, consumables, and waste so nothing gets missed.",
        worth: "£15",
        killsExcuse: "Included free for early users"
      },
      {
        title: "Scale-Up Job Pack Templates",
        description: "When you start winning more work, quote faster using saved job structures.",
        worth: "£39",
        killsExcuse: "Included free for early users"
      }
    ],
    valueLine: "Total value £100+ — included free for early users.",
    futureProblem: "Most users only realise they needed this after they start winning more work."
  },
  guarantee: {
    headline: "Take the risk off your shoulders.",
    title: "First-Quote Confidence Guarantee",
    copy: "Build one real quote during your trial.\nIf you don't feel more confident about your pricing, cancel — no stress, no obligation.",
    clarifying: "No contracts. No pressure. Cancel anytime."
  },
  founder: {
    label: "BUILT BY A UK CONTRACTOR",
    headline: "Built by a tradie, not a tech company.",
    copy: "I built PriceM8 because I was tired of guessing prices on my own jobs at Quality Outdoor Rooms.\nI wanted a system that shows the real numbers before sending the quote — not after the job is done.\nPriceM8 is the tool I wish I had years ago.",
    concrete: "Used daily on real jobs at Quality Outdoor Rooms."
  },
  finalCta: {
    headline: "Ready to price jobs with confidence?",
    subheadline: "Start a free trial and build one real quote today — you'll know in minutes if it's right for you.",
    button: "Start free trial",
    urgency: "Early-user bonuses are only included while we onboard our next wave of UK tradies."
  }
}

// Tracking helper
const trackConversion = (label: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': 'AW-CONVERSION_ID/LABEL',
      'event_category': 'signup',
      'event_label': label
    })
    ;(window as any).gtag('event', 'sign_up', {
      method: 'landing_page'
    })
  }
}

export default function QuoteInMinutesLanding() {
  const [searchParams] = useSearchParams()
  const variant = searchParams.get('variant') || 'a'
  const tradeParam = searchParams.get('trade') || ''
  
  // Get trade-specific content if trade parameter is provided
  const tradeContent = tradeParam ? tradeVariants[tradeParam] : null
  const hero = tradeContent 
    ? tradeContent.hero 
    : (heroVariants[variant as keyof typeof heroVariants] || heroVariants.a)
  
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const howItWorksRef = useRef<HTMLDivElement>(null)
  
  // Get trade-specific copy adjustments
  const getTradeCopy = () => {
    if (!tradeContent) return copy
    
    return {
      ...copy,
      howItWorks: {
        ...copy.howItWorks,
        steps: copy.howItWorks.steps.map((step, i) => {
          if (i === 0) {
            return { ...step, title: tradeContent.exampleLanguage.step1 }
          }
          if (i === 1) {
            return { ...step, description: tradeContent.exampleLanguage.step2 + ". " + step.description.split(". ").slice(1).join(". ") }
          }
          return step
        })
      },
      trades: {
        ...copy.trades,
        headline: `Built for ${tradeContent.tradeName.toLowerCase()}`,
        items: [tradeContent.tradeName]
      }
    }
  }
  
  const pageCopy = getTradeCopy()

  useEffect(() => {
    const tradeTitle = tradeContent 
      ? `${tradeContent.tradeName} Quotes in Minutes - PriceM8`
      : "Price Jobs with Confidence - PriceM8"
    document.title = tradeTitle
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      const desc = tradeContent
        ? `Build accurate ${tradeContent.exampleLanguage.example} using live merchant prices. PriceM8 helps ${tradeContent.tradeName.toLowerCase()} quote faster. Start free trial.`
        : 'Stop guessing prices. PriceM8 helps UK tradies build accurate quotes using real merchant pricing. Start free trial.'
      metaDescription.setAttribute('content', desc)
    }
    window.scrollTo(0, 0)

    // Show sticky CTA after scrolling past hero
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight
        setShowStickyCTA(window.scrollY > heroBottom)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-white">
      {navbarSection && <Navbar section={navbarSection} />}

      {/* 1. Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInSection>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
                {hero.headline}
              </h1>
              <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                {hero.subheadline}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <motion.a
                  href="https://app.pricem8.uk/signup"
                  onClick={() => trackConversion('hero_primary_cta')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 transform hover:-translate-y-1"
                >
                  {pageCopy.hero.primaryCta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.a>
                <motion.button
                  onClick={scrollToHowItWorks}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex justify-center items-center px-8 py-4 border-2 border-teal-600 text-lg font-bold rounded-xl text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all"
                >
                  <Play className="mr-2 w-5 h-5" />
                  {pageCopy.hero.secondaryCta}
                </motion.button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                {pageCopy.hero.trustPoints.map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                Most users build their first real quote in under 10 minutes.
              </p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 2. Pain Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
              {pageCopy.pain.headline}
            </h2>
            <div className="space-y-4 mb-8">
              {pageCopy.pain.bullets.map((bullet, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-800"
                >
                  <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{bullet}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-lg text-slate-600 dark:text-slate-400 italic">
              {pageCopy.pain.closing}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* 3. How It Works */}
      <section ref={howItWorksRef} className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white">
              {pageCopy.howItWorks.headline}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {pageCopy.howItWorks.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                      <p className="text-sm text-teal-600 dark:text-teal-400 font-semibold">{step.time}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-12">
              <motion.a
                href="https://app.pricem8.uk/signup"
                onClick={() => trackConversion('how_it_works_cta')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {pageCopy.hero.primaryCta}
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 4. Core Mechanism */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-600/10 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <img src="/images/paving-estimate.png" alt="PriceM8 Interface" className="rounded-xl shadow-2xl border border-white/10" />
            </div>
            <div className="order-1 md:order-2">
              <FadeInSection>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  {pageCopy.mechanism.headline}
                </h2>
                <p className="text-xl text-teal-400 font-bold mb-6 leading-relaxed whitespace-pre-line">
                  {pageCopy.mechanism.contrast}
                </p>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed whitespace-pre-line">
                  {pageCopy.mechanism.body}
                </p>
                <ul className="space-y-4 mb-10">
                  {pageCopy.mechanism.bullets.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center mt-0.5">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="ml-3 text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="https://app.pricem8.uk/signup"
                  onClick={() => trackConversion('mechanism_cta')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-teal-500 hover:bg-teal-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-teal-500/30"
                >
                  {pageCopy.hero.primaryCta}
                </motion.a>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Built for Your Trade */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
              {pageCopy.trades.headline}
            </h2>
            <div className={`grid gap-4 mb-6 ${tradeContent ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-2 md:grid-cols-4'}`}>
              {pageCopy.trades.items.map((trade, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-xl text-center font-bold text-lg border-2 ${
                    i === 0 ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800' :
                    i === 1 ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800' :
                    i === 2 ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800' :
                    'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 border-orange-200 dark:border-orange-800'
                  }`}
                >
                  {trade}
                </motion.div>
              ))}
            </div>
            <p className="text-center text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {pageCopy.trades.subtext}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* 6. Bonus Stack */}
      <section className="py-24 bg-gradient-to-b from-teal-50/50 via-white to-white dark:from-slate-900/50 dark:via-slate-900 dark:to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                {pageCopy.bonuses.headline}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto mb-4">
                {pageCopy.bonuses.subheadline}
              </p>
              <p className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-8">
                {pageCopy.bonuses.valueAnchor}
              </p>
            </FadeInSection>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {pageCopy.bonuses.items.map((bonus, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative h-full rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl border-2 ${
                    bonus.highlight 
                      ? 'border-teal-500 dark:border-teal-400' 
                      : 'border-teal-200 dark:border-teal-500/30'
                  } hover:border-teal-400 dark:hover:border-teal-400 transition-all duration-300`}
                >
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {bonus.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {bonus.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                          Worth
                        </div>
                        <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                          {bonus.worth}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {bonus.killsExcuse}
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full text-sm font-bold shadow-lg">
                        <span>FREE</span>
                        <span className="text-xs opacity-90">Included</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection>
            <p className="text-center text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">
              {pageCopy.bonuses.valueLine}
            </p>
            <p className="text-center text-slate-600 dark:text-slate-400 italic mb-8">
              {pageCopy.bonuses.futureProblem}
            </p>
            <p className="text-center text-sm font-semibold text-slate-600 dark:text-slate-400 italic mb-8">
              {pageCopy.finalCta.urgency}
            </p>
            <motion.a
              href="https://app.pricem8.uk/signup"
              onClick={() => trackConversion('bonus_stack_cta')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              {pageCopy.hero.primaryCta}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </FadeInSection>
        </div>
      </section>

      {/* 7. Guarantee */}
      <section className="py-24 bg-gradient-to-b from-teal-50/50 to-white dark:from-slate-900/50 dark:to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                {pageCopy.guarantee.headline}
              </h2>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-teal-200 dark:border-teal-500/30 p-8 md:p-12 shadow-xl">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-teal-100 dark:bg-teal-500/20 rounded-full text-teal-700 dark:text-teal-300 text-lg font-bold mb-6">
                  <ShieldCheck className="w-6 h-6" />
                  {pageCopy.guarantee.title}
                </div>
                <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-4 whitespace-pre-line">
                  {pageCopy.guarantee.copy}
                </p>
                <p className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-8">
                  {pageCopy.guarantee.clarifying}
                </p>
                <motion.a
                  href="https://app.pricem8.uk/signup"
                  onClick={() => trackConversion('guarantee_cta')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-full font-bold text-lg shadow-xl shadow-teal-500/30 hover:shadow-2xl transition-all"
                >
                  {pageCopy.hero.primaryCta}
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 8. Founder Trust */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-2 bg-teal-100 dark:bg-teal-500/20 rounded-full text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-widest mb-4">
                {pageCopy.founder.label}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                {pageCopy.founder.headline}
              </h2>
              <p className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-8">
                {pageCopy.founder.concrete}
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-center">
                {pageCopy.founder.copy}
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 text-slate-900 dark:text-white">
              {pageCopy.finalCta.headline}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              {pageCopy.finalCta.subheadline}
            </p>
            <motion.a
              href="https://app.pricem8.uk/signup"
              onClick={() => trackConversion('final_cta')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 text-lg font-bold rounded-xl text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 mb-4"
            >
              {pageCopy.finalCta.button}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 italic">
              {pageCopy.finalCta.urgency}
            </p>
          </FadeInSection>
        </div>
      </section>

      {footerSection && <Footer section={footerSection} />}

      {/* Sticky Mobile CTA */}
      {showStickyCTA && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 md:hidden z-50 shadow-lg"
        >
          <a
            href="https://app.pricem8.uk/signup"
            onClick={() => trackConversion('sticky_mobile_cta')}
            className="flex w-full justify-center items-center px-6 py-3.5 text-base font-bold rounded-lg text-white bg-teal-600 hover:bg-teal-700 shadow-lg"
          >
            {pageCopy.hero.primaryCta}
          </a>
        </motion.div>
      )}

      {/* Spacer for sticky CTA on mobile */}
      <div className="h-20 md:hidden"></div>
    </div>
  )
}
