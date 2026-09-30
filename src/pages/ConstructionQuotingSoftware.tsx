import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GridBackground from '../components/GridBackground'
import FadeInSection from '../components/FadeInSection'
import BrandedText from '../components/BrandedText'
import { BackgroundGlow } from '../components/BackgroundGlow'
import homePageSpec from '../data/pageSpec.json'

export default function ConstructionQuotingSoftware() {
  const location = useLocation()

  useEffect(() => {
    const pageUrl = 'https://pricem8.uk/construction-quoting-software'
    const pageTitle = 'Construction Quoting Software for UK Trades | PriceM8'
    const pageDescription = 'Construction quoting software that connects estimates to approved jobs with clear client approval and job workflow.'
    const ogDescription = 'Turn estimates into professional quotes with clear approval tracking. Built for UK construction trades who want control over the quoting process.'

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
                <BrandedText as="span">Construction Quoting Software Built Around Job Workflow</BrandedText>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                PriceM8 is construction quoting software designed to take you from estimate to approved job without breaking the workflow in between.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Instead of sending static PDFs and chasing replies, PriceM8 connects estimating, quoting, client approval, and job planning in one system — so nothing gets lost once the quote is sent.
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* Quoting Is Where Most Jobs Break Down */}
        <section className="relative py-20">
          <BackgroundGlow
            variant="teal"
            className="left-[-80px] top-1/2 h-64 w-64 -translate-y-1/2 opacity-40 dark:opacity-20"
          />
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                <BrandedText as="span">Quoting Is Where Most Jobs Break Down</BrandedText>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Creating a quote is rarely the issue. What happens after usually is.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Typical problems:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg text-gray-600 dark:text-gray-300 ml-4">
                  <li>quotes sent with no clear approval trail</li>
                  <li>revisions creating multiple versions</li>
                  <li>clients accepting by message, not formally</li>
                  <li>no link between the quote and the job</li>
                </ul>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  This leads to confusion, missed details, and disputes later on.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  PriceM8 fixes that by keeping everything connected.
                </p>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* How PriceM8 Handles Construction Quotes */}
        <section className="relative py-20">
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12">
                <BrandedText as="span">How PriceM8 Handles Construction Quotes</BrandedText>
              </h2>
            </FadeInSection>

            {/* Quotes Built Directly from Estimates */}
            <FadeInSection delay={0.1}>
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Quotes Built Directly from Estimates
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Quotes in PriceM8 aren't rebuilt from scratch.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                  They're generated directly from your estimate, keeping:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 text-lg text-gray-600 dark:text-gray-300 ml-4">
                  <li>item structure</li>
                  <li>pricing logic</li>
                  <li>margins and totals</li>
                </ul>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                  This means no re-entry, no mismatches, and no lost details.
                </p>
              </div>
            </FadeInSection>

            {/* Clear Client Approval Process */}
            <FadeInSection delay={0.2}>
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Clear Client Approval Process
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Instead of "sounds good" messages, PriceM8 gives you:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 text-lg text-gray-600 dark:text-gray-300 ml-4">
                  <li>secure quote links</li>
                  <li>clear accept / decline actions</li>
                  <li>visible approval status</li>
                </ul>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                  You always know which jobs are agreed and ready to move forward.
                </p>
              </div>
            </FadeInSection>

            {/* Changes Stay Under Control */}
            <FadeInSection delay={0.3}>
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Changes Stay Under Control
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  When a quote changes, PriceM8 keeps track.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                  Revisions are clear, structured, and traceable — so you're not guessing which version the client agreed to.
                </p>
              </div>
            </FadeInSection>

            {/* From Approved Quote to Scheduled Job */}
            <FadeInSection delay={0.4}>
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  From Approved Quote to Scheduled Job
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Once a quote is accepted, it doesn't stop there.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                  PriceM8 allows you to:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 text-lg text-gray-600 dark:text-gray-300 ml-4">
                  <li>convert accepted quotes into jobs</li>
                  <li>schedule work and resources</li>
                  <li>track progress</li>
                  <li>generate material lists for ordering</li>
                </ul>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                  The handover from pricing to delivery is seamless.
                </p>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Built for Construction Trades in the UK */}
        <section className="relative py-20">
          <BackgroundGlow
            variant="teal"
            className="right-[-80px] top-1/2 h-64 w-64 -translate-y-1/2 opacity-40 dark:opacity-20"
          />
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                <BrandedText as="span">Built for Construction Trades in the UK</BrandedText>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                PriceM8 is built specifically for UK construction workflows:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-600 dark:text-gray-300 ml-4">
                <li>GBP pricing</li>
                <li>VAT-aware totals</li>
                <li>domestic construction job types</li>
                <li>trade-first logic</li>
              </ul>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-6">
                You're not adapting office software to site work — this is built for how construction actually runs.
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* Construction Quoting Software That Works With Estimating */}
        <section className="relative py-20">
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                <BrandedText as="span">Construction Quoting Software That Works With Estimating</BrandedText>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                PriceM8 is designed as both:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-600 dark:text-gray-300 ml-4 mb-6">
                <li>construction estimating software, and</li>
                <li>construction quoting software</li>
              </ul>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                The two work together — not as separate tools.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                👉 If you want to see how estimates are built before quoting, explore our{' '}
                <Link
                  to="/construction-estimating-software"
                  className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium underline"
                >
                  construction estimating software
                </Link>
                .
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* PriceM8 vs Traditional Quoting Methods */}
        <section className="relative py-20">
          <div className="max-w-4xl mx-auto">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                <BrandedText as="span">PriceM8 vs Traditional Quoting Methods</BrandedText>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                      <th className="px-6 py-4 text-left font-semibold">Method</th>
                      <th className="px-6 py-4 text-left font-semibold">Control</th>
                      <th className="px-6 py-4 text-left font-semibold">Traceability</th>
                      <th className="px-6 py-4 text-left font-semibold">Workflow</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                    <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Email + PDF</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Low</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">None</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Broken</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Generic quote tools</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Medium</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Limited</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Disconnected</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors bg-teal-50/50 dark:bg-teal-900/20">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        <BrandedText as="span">PriceM8</BrandedText>
                      </td>
                      <td className="px-6 py-4 text-teal-600 dark:text-teal-400 font-semibold">High</td>
                      <td className="px-6 py-4 text-teal-600 dark:text-teal-400 font-semibold">Built-in</td>
                      <td className="px-6 py-4 text-teal-600 dark:text-teal-400 font-semibold">Connected</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Quote with Clarity, Deliver with Confidence */}
        <section className="relative py-20">
          <BackgroundGlow
            variant="teal"
            className="right-[-80px] top-1/2 h-64 w-64 -translate-y-1/2 opacity-40 dark:opacity-20"
          />
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                <BrandedText as="span">Quote with Clarity, Deliver with Confidence</BrandedText>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                If you want:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-600 dark:text-gray-300 ml-4 mb-8">
                <li>clear approvals</li>
                <li>fewer misunderstandings</li>
                <li>a smooth path from quote to job</li>
              </ul>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                PriceM8 gives you a structured system instead of a paper trail.
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

