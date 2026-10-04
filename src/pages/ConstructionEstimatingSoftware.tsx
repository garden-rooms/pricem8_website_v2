import { useEffect } from 'react'
import SiteSheetHeader from '../components/site-sheet/Header'
import SiteSheetFooter from '../components/site-sheet/Footer'
import '../styles/site-sheet.css'

const SEO_TITLE = 'Construction Estimating Software for Landscapers & Garden Room Builders | PriceM8'
const SEO_DESCRIPTION = 'Estimating software for UK landscaping and garden room construction. Task-based takeoffs, editable material prices and automatic margins — not a blank spreadsheet.'

export default function ConstructionEstimatingSoftware() {
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
            <p className="mono hero-eyebrow">Construction estimating software</p>
            <h1 className="disp">Estimating software for landscaping and garden room construction.</h1>
            <p className="lede" style={{ marginTop: 22 }}>
              Not a blank spreadsheet and not a generic template built for every trade at once.
              PriceM8 takes off materials, labour, waste and margin for the two build types it
              actually knows well.
            </p>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">A — Where estimating goes wrong</span><span className="ticks"></span></div>
            <div className="prose" style={{ marginTop: 28 }}>
              <p>Most estimating problems aren't caused by lack of experience — they're caused by poor systems.</p>
              <p>Spreadsheets go out of date. Labour gets guessed. Material prices move weekly. Margin gets added at the end, if at all. The result is jobs that look fine on paper and underperform on site.</p>
              <p>PriceM8 was built to remove those weak points for landscaping and garden room work specifically.</p>
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">B — What's different</span><span className="ticks"></span></div>
            <ul className="ledger" style={{ marginTop: 28 }}>
              <li><span className="mono k">Task-based</span><span className="v">Each task — paving, fencing, a garden room bundle — is structured around how the work is actually done. Materials, labour, waste and access are factored in automatically, not re-typed per job.</span></li>
              <li><span className="mono k">Editable prices</span><span className="v">Materials start with sensible costs and you overwrite any of them with what your merchant actually charges. No stale supplier quotes.</span></li>
              <li><span className="mono k">Margin applied</span><span className="v">Set your material and labour margin once in Settings. Every estimate applies it automatically, so it's never missing by accident.</span></li>
            </ul>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">C — Who it's for</span><span className="ticks"></span></div>
            <div className="prose" style={{ marginTop: 28 }}>
              <p>PriceM8 is built for two UK trades specifically:</p>
              <ul>
                <li>landscapers — patios, drives, fencing, turf, decking, garden structures</li>
                <li>garden room builders — offices, studios, gyms and annexes</li>
              </ul>
              <p>It isn't a generic multi-trade tool. If your work is landscaping or garden rooms, see <a href="/#landscaping">what it prices</a> on the homepage.</p>
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">D — PriceM8 vs the alternatives</span><span className="ticks"></span></div>
            <table className="compare" style={{ marginTop: 28 }}>
              <thead>
                <tr><th>Method</th><th>Accuracy</th><th>Speed</th><th>Margin control</th></tr>
              </thead>
              <tbody>
                <tr><td>Spreadsheets</td><td>Low</td><td>Slow</td><td>Guesswork</td></tr>
                <tr><td>Generic multi-trade software</td><td>Medium</td><td>Medium</td><td>Limited</td></tr>
                <tr className="lead"><td>PriceM8</td><td>High</td><td>Fast</td><td>Built in</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="trial" className="close">
          <div className="wrap">
            <h2 className="disp" style={{ fontSize: 'var(--fs-h2)' }}>Estimate with confidence.</h2>
            <p className="lede" style={{ marginTop: 18 }}>
              A clear, repeatable system for pricing landscaping and garden room work properly —
              not another spreadsheet, not a blank template.
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
