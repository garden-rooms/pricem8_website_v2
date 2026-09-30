import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GridBackground from '../components/GridBackground'
import FadeInSection from '../components/FadeInSection'
import BrandedText from '../components/BrandedText'
import { BackgroundGlow } from '../components/BackgroundGlow'
import homePageSpec from '../data/pageSpec.json'

export default function ConstructionEstimatingSoftware() {
  const location = useLocation()

  useEffect(() => {
    const pageUrl = 'https://pricem8.uk/construction-estimating-software'
    const pageTitle = 'Construction Estimating Software for UK Trades | PriceM8'
    const pageDescription = 'Construction estimating software built for UK trades. Accurate material costs, smart labour pricing, instant quotes & real margins.'
    const ogDescription = 'Price construction jobs accurately with UK-focused estimating software. Real costs, real margins, no spreadsheets.'

    // Update document title
    document.title = pageTitle

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription)
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

    updateMeta('og:title', pageTitle)
    updateMeta('og:description', ogDescription)
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

    updateTwitter('twitter:title', pageTitle)
    updateTwitter('twitter:description', ogDescription)
    updateTwitter('twitter:url', pageUrl)

    // Scroll to top on route change
    window.scrollTo(0, 0)
  }, [location])

  // Get navbar and footer from home page spec
  const navbarSection = (homePageSpec as any).sections.find((s: any) => s.type === 'navbar')
  const footerSection = (homePageSpec as any).sections.find((s: any) => s.type === 'footer')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg relative overflow-hidden transition-colors duration-300">
      <GridBackground />
      {navbarSection && <Navbar section={navbarSection} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInSection>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-6 leading-tight">
                <BrandedText as="span">Construction Estimating Software Built for UK Trades</BrandedText>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                PriceM8 is construction estimating software designed for real trade work — not theory, not spreadsheets, and not generic templates.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                It helps UK contractors price jobs accurately, apply the right margins, and produce clear, professional estimates without wasting hours rebuilding numbers every time. Materials, labour, overheads and profit are all calculated in one place, so you know exactly where you stand before you send a quote.
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* Why Construction Estimating Still Goes Wrong */}
        <section className="relative py-20">
          <BackgroundGlow
            variant="teal"
            className="left-[-80px] top-1/2 h-64 w-64 -translate-y-1/2 opacity-40 dark:opacity-20"
          />
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                <BrandedText as="span">Why Construction Estimating Still Goes Wrong</BrandedText>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Most estimating problems aren't caused by lack of experience — they're caused by poor systems.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Spreadsheets go out of date. Labour is guessed. Material prices change weekly. Margins are added at the end, if at all. The result is jobs that look fine on paper but underperform in reality.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  PriceM8 was built to remove those weak points and give trades proper control over pricing.
                </p>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* What Makes PriceM8 Different */}
        <section className="relative py-20">
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12">
                <BrandedText as="span">What Makes PriceM8 Different</BrandedText>
              </h2>
            </FadeInSection>

            {/* Built Around Real Construction Tasks */}
            <FadeInSection delay={0.1}>
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Built Around Real Construction Tasks
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  PriceM8 uses task-based estimating, not blank templates.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                  Each task is structured around how the work is actually done — materials, labour time, waste, access and complexity are all factored in automatically. This keeps estimates consistent and removes the guesswork that leads to underpricing.
                </p>
              </div>
            </FadeInSection>

            {/* Accurate Material Pricing */}
            <FadeInSection delay={0.2}>
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Accurate Material Pricing
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Material costs move constantly. PriceM8 is designed to adapt.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                  You work from a structured material price base that can be updated quickly, with margins applied consistently across every estimate. No more relying on old supplier quotes or rough allowances.
                </p>
              </div>
            </FadeInSection>

            {/* See Your Margin Before You Commit */}
            <FadeInSection delay={0.3}>
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  See Your Margin Before You Commit
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  With PriceM8, profit isn't hidden.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                  Every estimate shows:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 text-lg text-gray-600 dark:text-gray-300 ml-4">
                  <li>material cost</li>
                  <li>labour cost</li>
                  <li>overhead allowance</li>
                  <li>final margin and profit</li>
                </ul>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                  You know if a job works before it goes to the client — not after it's finished.
                </p>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Competitive Comparison */}
        <section className="relative py-20">
          <BackgroundGlow
            variant="teal"
            className="right-[-80px] top-1/2 h-64 w-64 -translate-y-1/2 opacity-40 dark:opacity-20"
          />
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Unlike generic estimating tools designed for multiple industries, PriceM8 is built specifically for construction and trade workflows.
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* Keyword-rich paragraph for SEO */}
        <section className="relative py-12">
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                PriceM8 works as both construction estimating software and construction cost estimating software, giving contractors a clear breakdown of materials, labour, overheads and margin on every job.
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* Who PriceM8 Is Built For */}
        <section className="relative py-20">
          <BackgroundGlow
            variant="teal"
            className="right-[-80px] top-1/2 h-64 w-64 -translate-y-1/2 opacity-40 dark:opacity-20"
          />
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                <BrandedText as="span">Who PriceM8 Is Built For</BrandedText>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                PriceM8 is built for UK construction trades who want clarity and control over their pricing, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-600 dark:text-gray-300 ml-4 mb-6">
                <li>general builders</li>
                <li>construction contractors</li>
                <li>refurbishment and renovation specialists</li>
                <li>landscaping and external works</li>
                <li>garden room and outbuilding installers</li>
              </ul>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                If you need more trade-specific tools, you can{' '}
                <Link
                  to="/trades"
                  className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium underline"
                >
                  explore dedicated estimating setups for different trades
                </Link>
                .
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* One System from Estimate to Job */}
        <section className="relative py-20">
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                <BrandedText as="span">One System from Estimate to Job</BrandedText>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                PriceM8 isn't just estimating software. Once your estimate is ready, it becomes a professional quote with clear approval tracking. Learn more about our{' '}
                <Link
                  to="/construction-quoting-software"
                  className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium underline"
                >
                  construction quoting software
                </Link>
                .
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                You can:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-600 dark:text-gray-300 ml-4">
                <li>turn estimates into professional PDF quotes</li>
                <li>send secure links for client approval</li>
                <li>track accepted jobs</li>
                <li>schedule work and resources</li>
                <li>generate clear material lists for ordering</li>
              </ul>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-6">
                Everything stays connected, so nothing gets missed or re-entered.
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* Built for the UK Construction Market */}
        <section className="relative py-20">
          <BackgroundGlow
            variant="teal"
            className="left-[-80px] top-1/2 h-64 w-64 -translate-y-1/2 opacity-40 dark:opacity-20"
          />
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                <BrandedText as="span">Built for the UK Construction Market</BrandedText>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                PriceM8 is designed specifically for UK trades:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-600 dark:text-gray-300 ml-4">
                <li>pricing in GBP</li>
                <li>VAT-aware calculations</li>
                <li>UK labour rates and workflows</li>
                <li>domestic construction job types</li>
              </ul>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-6">
                You're not adapting overseas software. This is built for how construction works in the UK.
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* PriceM8 vs Traditional Estimating */}
        <section className="relative py-20">
          <div className="max-w-4xl mx-auto">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                <BrandedText as="span">PriceM8 vs Traditional Estimating</BrandedText>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                      <th className="px-6 py-4 text-left font-semibold">Method</th>
                      <th className="px-6 py-4 text-left font-semibold">Accuracy</th>
                      <th className="px-6 py-4 text-left font-semibold">Speed</th>
                      <th className="px-6 py-4 text-left font-semibold">Margin Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                    <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Spreadsheets</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Low</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Slow</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Guesswork</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Generic software</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Medium</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Medium</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Limited</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors bg-teal-50/50 dark:bg-teal-900/20">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        <BrandedText as="span">PriceM8</BrandedText>
                      </td>
                      <td className="px-6 py-4 text-teal-600 dark:text-teal-400 font-semibold">High</td>
                      <td className="px-6 py-4 text-teal-600 dark:text-teal-400 font-semibold">Fast</td>
                      <td className="px-6 py-4 text-teal-600 dark:text-teal-400 font-semibold">Built-in</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Estimate with Confidence */}
        <section className="relative py-20">
          <BackgroundGlow
            variant="teal"
            className="right-[-80px] top-1/2 h-64 w-64 -translate-y-1/2 opacity-40 dark:opacity-20"
          />
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                <BrandedText as="span">Estimate with Confidence</BrandedText>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                If you're tired of:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-600 dark:text-gray-300 ml-4 mb-8">
                <li>second-guessing prices</li>
                <li>losing margin without knowing why</li>
                <li>rebuilding quotes from scratch</li>
              </ul>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                PriceM8 gives you a clear, repeatable system for pricing construction work properly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/40"
                >
                  Explore the features
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-slate-600 px-8 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all duration-200 hover:border-teal-400 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-500/10"
                >
                  See pricing
                </Link>
                <Link
                  to="/trades"
                  className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-slate-600 px-8 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all duration-200 hover:border-teal-400 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-500/10"
                >
                  View trade-specific tools
                </Link>
              </div>
            </FadeInSection>
          </div>
        </section>
      </div>

      {footerSection && <Footer section={footerSection} />}
    </div>
  )
}

