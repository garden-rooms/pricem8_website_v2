import SiteSheetHeader from '../components/site-sheet/Header'
import SiteSheetFooter from '../components/site-sheet/Footer'
import { useSEO, useJsonLd } from '../hooks/useSEO'
import '../styles/site-sheet.css'

const SEO_TITLE = 'Pricing – PriceM8'
const SEO_DESCRIPTION =
  'One Landscaping subscription at £25/month with a 14-day free trial, plus an optional £99 one-off Garden Rooms add-on. No packs, no bundles, no pre-season discount tricks.'

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need a card to start the free trial?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Stripe needs it to start checkout, but nothing is charged until the 14-day trial ends — cancel any time before then and you pay nothing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I buy the Garden Rooms pack on its own, without a Landscaping subscription?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No. Garden Rooms is a one-off add-on for subscribers, not sold separately. You can try it first with the 2 free quotes that come with your Landscaping subscription.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a contract or minimum term?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. You can cancel any time, with no minimum term.',
      },
    },
  ],
}

export default function Pricing() {
  useSEO({ title: SEO_TITLE, description: SEO_DESCRIPTION, path: '/pricing' })
  useJsonLd('faq-jsonld', FAQ_JSON_LD)

  return (
    <div className="ps-page">
      <SiteSheetHeader />

      <main id="top">

        {/* ============ INTRO ============ */}
        <section className="hero" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <p className="mono hero-eyebrow">What it costs</p>
            <h1 className="disp">One price. One add-on. That's the whole price list.</h1>
            <p className="lede" style={{ marginTop: 22 }}>
              No Core-plus-packs maths, no bundles, no "30% off, today only." A Landscaping
              subscription runs the business. Garden Rooms is there if and when you need it.
            </p>
          </div>
        </section>

        {/* ============ THE SUBSCRIPTION ============ */}
        <section id="subscription">
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">A — The subscription</span><span className="ticks"></span></div>

            <div className="offer-grid" style={{ marginTop: 28 }}>
              <div className="offer">
                <p className="mono offer-eyebrow">Landscaping</p>
                <h2 className="disp" style={{ fontSize: 'var(--fs-h3)', marginBottom: 18 }}>
                  Everything you need to run landscaping jobs properly.
                </h2>
                <div className="price-fig">£25<span className="unit">/ month</span></div>
                <div className="offer-terms">
                  <strong>14 days free, then £25/month.</strong> A card is required to start —
                  you won't be charged until the trial ends, and you can cancel any time before then.
                </div>
                <a className="btn" href="https://app.pricem8.uk/signup">Start free trial <span className="arw">→</span></a>
                <p className="offer-note mono">Secured by Stripe · cancel anytime · no contract</p>
              </div>

              <div>
                <ul className="ledger">
                  <li><span className="mono k">Quotes</span><span className="v">Unlimited quotes and invoices, branded as your business, sent as a PDF the same day.</span></li>
                  <li><span className="mono k">Takeoff</span><span className="v">Materials and labour worked out automatically — paving, sub-base, fencing, turf, muck away.</span></li>
                  <li><span className="mono k">Clients</span><span className="v">A proper client list attached to every quote — no separate spreadsheet of names and numbers.</span></li>
                  <li><span className="mono k">Materials</span><span className="v">Sensible starting prices you can edit yourself, down to what your actual merchant charges you.</span></li>
                  <li><span className="mono k">Branding</span><span className="v">Your logo on every quote and invoice. PriceM8 isn't on it anywhere.</span></li>
                  <li><span className="mono k">Access</span><span className="v">Works on your phone in the van, your tablet on site, your laptop at home.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ GARDEN ROOMS ============ */}
        <section id="garden-rooms-pricing" style={{ background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">B — The add-on</span><span className="ticks"></span></div>

            <div className="offer-grid" style={{ marginTop: 28 }}>
              <div className="offer">
                <p className="mono offer-eyebrow">Garden rooms</p>
                <h2 className="disp" style={{ fontSize: 'var(--fs-h3)', marginBottom: 18 }}>
                  Premium estimating for £12k–£60k builds.
                </h2>
                <div className="price-fig">£99<span className="unit">one‑off</span></div>
                <div className="offer-terms">
                  A one-time purchase on top of a Landscaping subscription — it isn't sold
                  on its own. Your subscription includes <strong>2 free Garden Room quotes</strong>,
                  so you can try it properly before deciding to buy.
                </div>
                <a className="btn ghost" href="https://app.pricem8.uk/signup">Start free trial <span className="arw">→</span></a>
                <p className="offer-note mono">Bought inside PriceM8, once you're subscribed</p>
              </div>

              <div>
                <ul className="ledger">
                  <li><span className="mono k">Bundle</span><span className="v">One task prices the whole build — foundation, frame, cladding, roof, electrics, internal finishes.</span></li>
                  <li><span className="mono k">Cladding</span><span className="v">Cedar, larch, composite or metal — set separately for the front and for the sides and back.</span></li>
                  <li><span className="mono k">Frame</span><span className="v">Studs at a fixed 400mm centres, priced with the rest of the timber list automatically.</span></li>
                  <li><span className="mono k">Try first</span><span className="v">2 free Garden Room quotes come with your Landscaping subscription, before you need to buy.</span></li>
                  <li><span className="mono k">One-time</span><span className="v">No separate subscription for this part — pay once, use it on every garden room job after.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ QUESTIONS ============ */}
        <section id="questions">
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">C — Questions</span><span className="ticks"></span></div>

            <ul className="ledger" style={{ marginTop: 28, maxWidth: '44em' }}>
              <li><span className="mono k">Card upfront?</span><span className="v">Yes. Stripe needs it to start checkout, but nothing is charged until the 14-day trial ends — cancel any time before then and you pay nothing.</span></li>
              <li><span className="mono k">Garden Rooms alone?</span><span className="v">No. It's a one-off add-on for subscribers, not sold separately. Try it first with the 2 free quotes that come with your subscription.</span></li>
              <li><span className="mono k">Contract?</span><span className="v">No. Cancel any time, no minimum term.</span></li>
            </ul>
          </div>
        </section>

        {/* ============ CLOSE ============ */}
        <section id="trial" className="close">
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">D — Next one</span><span className="ticks"></span></div>
            <div style={{ marginTop: 38 }}>
              <h2 className="disp">Price the next one properly.</h2>
              <p className="lede">Take a job you've already done and put it through. If the number
                doesn't land within a few percent of what it actually cost you, walk away — that's
                a fair test and it's the one I'd run.</p>
              <div className="row">
                <a className="btn chalk" href="https://app.pricem8.uk/signup">Start free trial <span className="arw">→</span></a>
                <span className="mono fine">14 days free · card required · cancel before it ends and pay nothing</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <SiteSheetFooter />
    </div>
  )
}
