import founderPhoto from '../founder.jpeg'
import SiteSheetLandingHeader from '../components/site-sheet/LandingHeader'
import { useSEO } from '../hooks/useSEO'
import '../styles/site-sheet.css'

const SEO_TITLE = 'Start free trial – PriceM8'
const SEO_DESCRIPTION =
  'Built by a landscaper with 20 years on the tools. Start a free 14-day trial of PriceM8 and price your next landscaping or garden room job properly.'

// The single consolidated landing page for paid traffic — replaces four near-duplicate
// "start your trial" variants (GetStartedPage, AdLandingPage/offer, OfferRetro/offer-retro,
// QuoteInMinutesLanding) that had drifted into different visual styles and stale pricing. One
// focused page, one CTA, same voice and numbers as the real site — see /offer, /offer-retro and
// /lp/quote-in-minutes, which now redirect here.
export default function GetStartedPage() {
  // noindex: this page's content substantially duplicates Home.tsx (same hero/maths copy) by
  // design, reused rather than rewritten. It's meant for paid-traffic clicks, not organic
  // discovery — indexing it would just compete with Home for the same queries.
  useSEO({ title: SEO_TITLE, description: SEO_DESCRIPTION, path: '/get-started', index: false })

  return (
    <div className="ps-page">
      <SiteSheetLandingHeader />

      <main id="top">

        {/* ============ HERO ============ */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <p className="mono hero-eyebrow">Twenty years on the tools · then the software</p>
                <h1 className="disp">I priced jobs badly for years.<br />So I built the thing that <em>doesn't</em>.</h1>
                <p className="lede" style={{ marginTop: 22 }}>
                  PriceM8 works out the materials, the labour, the waste and the VAT for
                  landscaping and garden room jobs — then puts it on a quote the
                  customer takes seriously. No spreadsheet. No "I'll ring you with a number."
                </p>
                <div className="hero-cta">
                  <a className="btn" href="https://app.pricem8.uk/signup">Start free trial <span className="arw">→</span></a>
                </div>
                <p className="mono hero-note">14 days free · card required · not charged until day 14</p>
              </div>

              <div className="plate">
                <figure>
                  <div className="shot">
                    <img src={founderPhoto} alt="Michal, founder of PriceM8, standing on a stone patio in a garden he built, wearing a green hoodie and work trousers." />
                  </div>
                  <svg className="dimline" viewBox="0 0 320 30" preserveAspectRatio="none" aria-hidden="true">
                    <g stroke="currentColor" fill="none" strokeWidth={1}>
                      <path d="M3 6 V18" /><path d="M317 6 V18" />
                      <path className="draw" style={{ '--len': 314 } as React.CSSProperties} d="M3 12 H317" />
                      <path d="M0 9 L8 15" strokeWidth={1.2} /><path d="M312 9 L320 15" strokeWidth={1.2} />
                    </g>
                    <text x={160} y={28} textAnchor="middle">Built and priced by the same pair of hands</text>
                  </svg>
                  <figcaption>
                    <span className="mono">Plate 01 — Michal, on his own patio</span>
                    <span className="mono">Est. 2005 on site</span>
                  </figcaption>
                </figure>
              </div>
            </div>

            <div className="specstrip">
              <ul>
                <li><b>MOT Type 1</b><span className="mono">By the tonne, at your depth</span></li>
                <li><b>Cuts &amp; waste</b><span className="mono">A set allowance, not a guess</span></li>
                <li><b>Labour</b><span className="mono">Day rate that covers the van</span></li>
                <li><b>VAT</b><span className="mono">20% · shown, not buried</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============ THE MATHS ============ */}
        <section className="band">
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">A — The sums you're doing in your head</span><span className="ticks"></span></div>
            <div className="sec-head">
              <h2 className="disp">Every job you underprice, you find out four days in.</h2>
              <p className="lede">These are the three that catch people out most. None of them are
                complicated. All of them are easy to get wrong standing in someone's back
                garden with a tape measure in one hand.</p>
            </div>

            <div className="maths">
              <article>
                <span className="fig">9.6 t</span>
                <h3 className="sub">Not six tonnes</h3>
                <p>A 60 m² patio on 150 mm of compacted MOT Type 1 needs about 9.6 tonnes.
                  Guess low and you've eaten the margin before the first slab goes down.</p>
              </article>
              <article>
                <span className="fig">20%</span>
                <h3 className="sub">Soil that won't fit back in the hole</h3>
                <p>Dig out a cubic metre and it doesn't compact back to a cubic metre — excavated
                  soil bulks by around 20%. Guess the raw volume and you'll under-order the skip.</p>
              </article>
              <article>
                <span className="fig">£41/hr</span>
                <h3 className="sub">What an hour actually costs</h3>
                <p>Your day rate isn't your cost. Van, fuel, insurance, the hour loading up,
                  the trip to the merchant you didn't plan on. It all lands somewhere.</p>
              </article>
            </div>

            <div className="band-foot">
              <p className="big">PriceM8 does all three before you've got back in the van —
                and shows you the working, so you can argue with it.</p>
            </div>
          </div>
        </section>

        {/* ============ WHAT IT PRICES ============ */}
        <section>
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">B — What it prices</span><span className="ticks"></span></div>
            <div className="sec-head">
              <h2 className="disp">Two trades. Both done properly.</h2>
              <p className="lede">Not a general-purpose quoting app with a landscaping label stuck on it.
                Two build types, taken off the way you'd take them off yourself.</p>
            </div>

            <div className="lines">
              <div className="line-block">
                <div className="line-title">
                  <h3 className="sub">Landscaping</h3>
                  <span className="mono n">Patios · drives · fencing · turf</span>
                </div>
                <ul className="takeoff">
                  <li><span>Paving — slabs, bond pattern, waste allowance</span><span>m²</span></li>
                  <li><span>Sub-base at your compacted depth</span><span>tonnes</span></li>
                  <li><span>Edgings, kerbs, haunching</span><span>lin m</span></li>
                  <li><span>Turf, topsoil, membrane</span><span>m²</span></li>
                  <li><span>Fencing, decking, sleeper walls</span><span>lin m</span></li>
                  <li><span>Muck away — skip or grab</span><span>loads</span></li>
                </ul>
              </div>

              <div className="line-block">
                <div className="line-title">
                  <h3 className="sub">Garden rooms</h3>
                  <span className="mono n">Offices · studios · gyms · annexes</span>
                </div>
                <ul className="takeoff">
                  <li><span>Base — pads, screw piles or raft</span><span>each / m³</span></li>
                  <li><span>Frame at 400mm centres</span><span>timber list</span></li>
                  <li><span>Insulation, VCL, breather membrane</span><span>m²</span></li>
                  <li><span>Cladding — cedar, larch, composite or metal</span><span>m² + waste</span></li>
                  <li><span>EPDM or fibreglass roof, trims, outlet</span><span>m²</span></li>
                  <li><span>First fix, flooring, internal linings</span><span>m² / points</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PRICE ============ */}
        <section style={{ background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">C — What it costs</span><span className="ticks"></span></div>
            <div className="offer-grid" style={{ marginTop: 28 }}>
              <div className="offer">
                <p className="mono offer-eyebrow">Landscaping</p>
                <div className="price-fig">£25<span className="unit">/ month</span></div>
                <div className="offer-terms">
                  <strong>14 days free, then £25/month.</strong> A card is required to start —
                  you won't be charged until the trial ends, and you can cancel any time before then.
                </div>
                <a className="btn" href="https://app.pricem8.uk/signup">Start free trial <span className="arw">→</span></a>
              </div>
              <div className="offer">
                <p className="mono offer-eyebrow">Garden rooms</p>
                <div className="price-fig">£99<span className="unit">one‑off</span></div>
                <div className="offer-terms">
                  A one-time add-on once you're subscribed — not sold on its own.
                  Your subscription includes <strong>2 free Garden Room quotes</strong> to try it first.
                </div>
              </div>
            </div>
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

      <footer className="site">
        <div className="wrap row">
          <a className="mark" href="#top">PriceM8<i></i></a>
          <span className="mono">Quoting software for UK landscapers and garden room builders</span>
        </div>
      </footer>
    </div>
  )
}
