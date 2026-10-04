import { useEffect } from 'react'
import SiteSheetHeader from '../components/site-sheet/Header'
import SiteSheetFooter from '../components/site-sheet/Footer'
import '../styles/site-sheet.css'

const SEO_TITLE = 'Construction Quoting Software for Landscapers & Garden Room Builders | PriceM8'
const SEO_DESCRIPTION = 'Quoting software that turns a landscaping or garden room estimate straight into a branded PDF quote — and into an invoice once the job is accepted.'

export default function ConstructionQuotingSoftware() {
  useEffect(() => {
    document.title = SEO_TITLE
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', SEO_DESCRIPTION)
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="ps-page">
      <SiteSheetHeader />

      <main id="top">
        <section className="hero" style={{ paddingBottom: 0 }}>
          <div className="wrap" style={{ maxWidth: 760 }}>
            <p className="mono hero-eyebrow">Construction quoting software</p>
            <h1 className="disp">From estimate to a quote your customer takes seriously.</h1>
            <p className="lede" style={{ marginTop: 22 }}>
              The estimate and the quote are the same numbers — not re-typed, not rebuilt.
              PriceM8 turns a landscaping or garden room takeoff straight into a branded PDF,
              then into an invoice once the job's accepted.
            </p>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">A — Where quotes lose jobs</span><span className="ticks"></span></div>
            <div className="prose" style={{ marginTop: 28 }}>
              <p>Most quotes lose on the page, not on the number.</p>
              <p>A single line saying "Patio — £9,700" invites a haggle. A quote that's been retyped from an estimate, by hand, into an email, invites mistakes. A quote with no logo on it looks like it came from nowhere in particular.</p>
              <p>None of that is about price. It's about presentation and accuracy — both fixable.</p>
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">B — How PriceM8 handles it</span><span className="ticks"></span></div>
            <ul className="ledger" style={{ marginTop: 28 }}>
              <li><span className="mono k">Built from the estimate</span><span className="v">The quote isn't rebuilt from scratch — it's generated directly from your takeoff, so the item list, pricing and totals always match what you actually calculated.</span></li>
              <li><span className="mono k">Branded PDF</span><span className="v">Your logo, your business name, on every quote and invoice. It goes out as your business — PriceM8 isn't on it anywhere.</span></li>
              <li><span className="mono k">Quote to invoice</span><span className="v">Once a job's agreed, turn the accepted quote straight into an invoice — one line per task, no re-typing the whole job.</span></li>
              <li><span className="mono k">Clear VAT</span><span className="v">Subtotal, VAT and total shown separately on every document, not buried in one number.</span></li>
            </ul>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">C — Built for the UK market</span><span className="ticks"></span></div>
            <div className="prose" style={{ marginTop: 28 }}>
              <p>PriceM8 is built specifically for UK trades: GBP pricing, VAT-aware totals, and domestic landscaping and garden room job types. Not office software adapted for site work.</p>
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">D — PriceM8 vs the alternatives</span><span className="ticks"></span></div>
            <table className="compare" style={{ marginTop: 28 }}>
              <thead>
                <tr><th>Method</th><th>Accuracy</th><th>Presentation</th><th>Quote → invoice</th></tr>
              </thead>
              <tbody>
                <tr><td>Email + PDF by hand</td><td>Low</td><td>Inconsistent</td><td>Manual re-entry</td></tr>
                <tr><td>Generic quote tools</td><td>Medium</td><td>Generic template</td><td>Often separate</td></tr>
                <tr className="lead"><td>PriceM8</td><td>High</td><td>Branded, consistent</td><td>One click</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="trial" className="close">
          <div className="wrap">
            <h2 className="disp" style={{ fontSize: 'var(--fs-h2)' }}>Quote with clarity.</h2>
            <p className="lede" style={{ marginTop: 18 }}>
              A price they can read is a price they can say yes to.
            </p>
            <div className="row" style={{ marginTop: 28 }}>
              <a className="btn chalk" href="https://app.pricem8.uk/signup">Start free trial <span className="arw">→</span></a>
              <span className="mono fine">or <a href="/pricing" style={{ color: 'var(--band-cedar)' }}>see pricing</a></span>
            </div>
          </div>
        </section>
      </main>

      <SiteSheetFooter />
    </div>
  )
}
