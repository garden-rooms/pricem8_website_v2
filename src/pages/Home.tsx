import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import founderPhoto from '../founder.jpeg'
import '../styles/site-sheet.css'

const SEO_TITLE = 'PriceM8 – Quoting software for landscapers and garden room builders'
const SEO_DESCRIPTION =
  "Built by a landscaper with 20 years on the tools. PriceM8 prices materials, labour, waste and VAT for landscaping and garden room jobs, then puts it on a quote your customer takes seriously."

export default function Home() {
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
      <header className="site">
        <div className="wrap bar">
          <a className="mark" href="#top">PriceM8<i></i></a>
          <nav className="main">
            <a href="#landscaping">Landscaping</a>
            <a href="#garden-rooms">Garden rooms</a>
            <a href="#quote">The quote</a>
            <a href="#story">The story</a>
            <Link to="/pricing">Pricing</Link>
          </nav>
          <a className="btn small" href="https://app.pricem8.uk/signup">Start free trial</a>
        </div>
      </header>

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
                  <a className="btn ghost" href="#landscaping">See what it prices</a>
                </div>
                <p className="mono hero-note">Built in the UK · priced in £ · VAT where it belongs</p>
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
                    <text x={160} y={28} textAnchor="middle">One garden · built and priced by the same pair of hands</text>
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
                <li><b>Cuts &amp; waste</b><span className="mono">Real %, not a flat 5</span></li>
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
                <span className="fig">12%</span>
                <h3 className="sub">Waste on a cut-heavy layout</h3>
                <p>A square patio wastes about 5%. A circle, a curved edge or a 45° bond wastes
                  two or three times that. One number for both is a slow leak.</p>
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

        {/* ============ TWO LINES ============ */}
        <section id="landscaping">
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">B — What it prices</span><span className="ticks"></span></div>
            <div className="sec-head">
              <h2 className="disp">Two trades. Both done properly.</h2>
              <p className="lede">Not a general-purpose quoting app with a landscaping label stuck on it.
                Two build types, taken off the way you'd take them off yourself — if you had
                a quiet hour and nobody ringing you.</p>
            </div>

            <div className="lines">

              {/* Landscaping */}
              <div className="line-block">
                <div className="drawing">
                  <svg viewBox="0 0 400 250" role="img" aria-label="Setting-out plan of a rear patio, 8.4 metres by 5.2 metres, laid in stretcher bond against a house wall.">
                    <g fill="none" stroke="currentColor">
                      <path className="bold" d="M30 30 H370" />
                      <g className="hatch">
                        <path d="M30 30 L22 22" /><path d="M50 30 L42 22" /><path d="M70 30 L62 22" />
                        <path d="M90 30 L82 22" /><path d="M110 30 L102 22" /><path d="M130 30 L122 22" />
                        <path d="M150 30 L142 22" /><path d="M170 30 L162 22" /><path d="M190 30 L182 22" />
                        <path d="M210 30 L202 22" /><path d="M230 30 L222 22" /><path d="M250 30 L242 22" />
                        <path d="M270 30 L262 22" /><path d="M290 30 L282 22" /><path d="M310 30 L302 22" />
                        <path d="M330 30 L322 22" /><path d="M350 30 L342 22" /><path d="M370 30 L362 22" />
                      </g>
                      <rect className="bold" x={30} y={40} width={340} height={150} fill="none" />
                      <g className="hatch">
                        <path d="M30 70 H370" /><path d="M30 100 H370" /><path d="M30 130 H370" /><path d="M30 160 H370" />
                        <path d="M75 40 V70" /><path d="M120 40 V70" /><path d="M165 40 V70" /><path d="M210 40 V70" /><path d="M255 40 V70" /><path d="M300 40 V70" /><path d="M345 40 V70" />
                        <path d="M52 70 V100" /><path d="M97 70 V100" /><path d="M142 70 V100" /><path d="M187 70 V100" /><path d="M232 70 V100" /><path d="M277 70 V100" /><path d="M322 70 V100" />
                        <path d="M75 100 V130" /><path d="M120 100 V130" /><path d="M165 100 V130" /><path d="M210 100 V130" /><path d="M255 100 V130" /><path d="M300 100 V130" /><path d="M345 100 V130" />
                        <path d="M52 130 V160" /><path d="M97 130 V160" /><path d="M142 130 V160" /><path d="M187 130 V160" /><path d="M232 130 V160" /><path d="M277 130 V160" /><path d="M322 130 V160" />
                        <path d="M75 160 V190" /><path d="M120 160 V190" /><path d="M165 160 V190" /><path d="M210 160 V190" /><path d="M255 160 V190" /><path d="M300 160 V190" /><path d="M345 160 V190" />
                      </g>
                      <path d="M340 205 H370" strokeWidth={1} /><path d="M362 201 L370 205 L362 209" strokeWidth={1} />
                      <path d="M30 225 H370" strokeWidth={1} />
                      <path d="M26 221 L34 229" strokeWidth={1} /><path d="M366 221 L374 229" strokeWidth={1} />
                      <path d="M30 195 V232" strokeWidth={0.5} opacity={0.6} /><path d="M370 195 V232" strokeWidth={0.5} opacity={0.6} />
                    </g>
                    <text x={200} y={221} textAnchor="middle">8400</text>
                    <text x={200} y={245} textAnchor="middle">43.7 m² · 900×600 porcelain · 6 mm joint</text>
                    <text x={306} y={202}>Fall 1:80</text>
                  </svg>
                </div>

                <div className="line-title">
                  <h3 className="sub">Landscaping</h3>
                  <span className="mono n">Patios · drives · fencing · turf</span>
                </div>
                <p>Drop in the dimensions and the build-up. It takes off the sub-base by tonne at
                  your compacted depth, the bedding, the slabs plus a waste figure that changes with
                  the layout, the jointing, the edgings, the muck away — and the hours.</p>

                <ul className="takeoff">
                  <li><span>Paving — bond, cuts, waste by layout</span><span>m²</span></li>
                  <li><span>Sub-base at your compacted depth</span><span>tonnes</span></li>
                  <li><span>Edgings, kerbs, haunching</span><span>lin m</span></li>
                  <li><span>Turf, topsoil, planting, membrane</span><span>m²</span></li>
                  <li><span>Fencing, decking, sleeper walls</span><span>lin m</span></li>
                  <li><span>Muck away — skip or grab</span><span>loads</span></li>
                </ul>
              </div>

              {/* Garden rooms */}
              <div className="line-block" id="garden-rooms">
                <div className="drawing">
                  <svg viewBox="0 0 400 250" role="img" aria-label="Front elevation of a garden room, five metres wide by two point five metres high, with bifold doors, a side window and horizontal cedar cladding.">
                    <g fill="none" stroke="currentColor">
                      <path className="bold" d="M22 52 H378 L378 62 H22 Z" />
                      <path className="bold" d="M36 62 V190 H364 V62" />
                      <g className="hatch">
                        <path d="M36 76 H364" /><path d="M36 90 H364" /><path d="M36 104 H364" /><path d="M36 118 H364" />
                        <path d="M36 132 H364" /><path d="M36 146 H364" /><path d="M36 160 H364" /><path d="M36 174 H364" />
                      </g>
                      <rect className="bold" x={120} y={80} width={170} height={110} fill="none" />
                      <g strokeWidth={1}>
                        <path d="M162 80 V190" /><path d="M205 80 V190" /><path d="M247 80 V190" />
                        <path d="M120 96 H290" strokeWidth={0.5} opacity={0.55} />
                      </g>
                      <rect x={60} y={92} width={42} height={56} strokeWidth={1.3} fill="none" />
                      <path d="M60 104 H102" strokeWidth={0.5} opacity={0.55} />
                      <path className="bold" d="M10 190 H390" />
                      <g className="hatch">
                        <path d="M10 190 L2 198" /><path d="M40 190 L32 198" /><path d="M70 190 L62 198" />
                        <path d="M100 190 L92 198" /><path d="M130 190 L122 198" /><path d="M160 190 L152 198" />
                        <path d="M190 190 L182 198" /><path d="M220 190 L212 198" /><path d="M250 190 L242 198" />
                        <path d="M280 190 L272 198" /><path d="M310 190 L302 198" /><path d="M340 190 L332 198" />
                        <path d="M370 190 L362 198" />
                      </g>
                      <path d="M22 225 H378" strokeWidth={1} />
                      <path d="M18 221 L26 229" strokeWidth={1} /><path d="M374 221 L382 229" strokeWidth={1} />
                      <path d="M22 200 V232" strokeWidth={0.5} opacity={0.6} /><path d="M378 200 V232" strokeWidth={0.5} opacity={0.6} />
                      <path d="M392 52 V190" strokeWidth={1} />
                      <path d="M388 56 L396 48" strokeWidth={1} /><path d="M388 194 L396 186" strokeWidth={1} />
                    </g>
                    <text x={200} y={221} textAnchor="middle">5000</text>
                    <text x={200} y={245} textAnchor="middle">15.0 m² · studs at 400 c/c · EPDM roof</text>
                    <text x={386} y={124} transform="rotate(-90 386 124)" textAnchor="middle">2500</text>
                  </svg>
                </div>

                <div className="line-title">
                  <h3 className="sub">Garden rooms</h3>
                  <span className="mono n">Offices · studios · gyms · annexes</span>
                </div>
                <p>A £28,000 build has three hundred things in it and any one of them can be the
                  one you forgot. It generates the timber list at your stud centres, the insulation
                  and membranes, the cladding with a real waste allowance, the roof and the first fix.</p>

                <ul className="takeoff">
                  <li><span>Base — pads, screw piles or raft</span><span>each / m³</span></li>
                  <li><span>Frame at 400 or 600 centres</span><span>timber list</span></li>
                  <li><span>Insulation, VCL, breather membrane</span><span>m²</span></li>
                  <li><span>Cladding — cedar, larch or composite</span><span>m² + waste</span></li>
                  <li><span>EPDM or fibreglass roof, trims, outlet</span><span>m²</span></li>
                  <li><span>First fix, flooring, internal linings</span><span>m² / points</span></li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ============ THE QUOTE ============ */}
        <section id="quote" style={{ background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">C — What the customer opens</span><span className="ticks"></span></div>
            <div className="sec-head">
              <h2 className="disp">A price they can read is a price they can say yes to.</h2>
              <p className="lede">Most quotes lose on the page, not on the number. A single line saying
                "Patio — £9,700" invites a haggle. A broken-down one invites a deposit.</p>
            </div>

            <div className="doc-wrap">
              <div className="doc">
                <div className="doc-top">
                  <span className="who">PriceM8 — Quotation</span>
                  <span className="mono">Ref Q‑1042 · 14 Mar</span>
                </div>
                <div className="doc-job">
                  <p className="mono h">Job</p>
                  <p className="v">Rear garden patio — 60 m² porcelain, Cheshire</p>
                </div>
                <table className="items">
                  <thead>
                    <tr><th scope="col">Item</th><th scope="col">Amount</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Excavate and cart away<span className="q">60 m² × 250 mm · 4 grab loads</span></td><td>£1,140.00</td></tr>
                    <tr><td>MOT Type 1 sub-base<span className="q">9.6 t · compacted to 150 mm</span></td><td>£612.00</td></tr>
                    <tr><td>Sharp sand and cement bed<span className="q">40 mm · 2.4 t sand, 12 bags</span></td><td>£288.00</td></tr>
                    <tr><td>Porcelain paving, 900×600<span className="q">60 m² + 8% cuts and waste</span></td><td>£2,916.00</td></tr>
                    <tr><td>Jointing compound<span className="q">6 mm joints · 5 tubs</span></td><td>£245.00</td></tr>
                    <tr><td>Labour<span className="q">2 operatives × 6 days</span></td><td>£2,880.00</td></tr>
                  </tbody>
                </table>
                <div className="totals">
                  <div><span>Subtotal</span><span>£8,081.00</span></div>
                  <div><span>VAT at 20%</span><span>£1,616.20</span></div>
                  <div className="grand"><span>Total</span><span>£9,697.20</span></div>
                </div>
                <div className="doc-foot">
                  <span className="mono">Prices held 30 days · 25% on commencement</span>
                  <span className="mono">Example quote — figures illustrative</span>
                </div>
              </div>

              <div>
                <ul className="ledger">
                  <li><span className="mono k">Line by line</span><span className="v">The customer sees where the money goes, so the conversation is about the build, not the total.</span></li>
                  <li><span className="mono k">Your logo</span><span className="v">It goes out as your business, on your headed paper. PriceM8 isn't on it anywhere.</span></li>
                  <li><span className="mono k">Same day</span><span className="v">Price it in the van, send the PDF before you've pulled off the drive. First quote in usually wins.</span></li>
                  <li><span className="mono k">Your rates</span><span className="v">Material prices start sensible and you overwrite any of them with what your merchant actually charges you.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ STORY ============ */}
        <section id="story">
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">D — Who built it</span><span className="ticks"></span></div>
            <div className="story" style={{ marginTop: 36 }}>
              <div>
                <h2 className="disp">The software was the second job.</h2>
                <p className="pull">"If it doesn't survive a wet Tuesday in February, it doesn't go in."</p>
              </div>
              <div className="col">
                <p>I laid my first patio in 2005. For most of the twenty years after that I priced
                  work the way nearly everyone does — a pad in the van, a spreadsheet that got
                  copied and broken, and a gut feeling that had been right often enough to trust and
                  wrong often enough to hurt.</p>
                <p>The jobs that lost money were never the dramatic ones. They were the ones where
                  the sub-base went in deeper than I'd allowed, or the cuts round a curve ate half
                  a pallet, or I'd quoted five days and it took seven. Small, boring, repeated.</p>
                <p>So I started writing the calculations down properly. Then I started checking them
                  against jobs I'd already finished and knew the real cost of. Then it stopped being
                  a spreadsheet and became this.</p>
                <p>Every figure in PriceM8 came off a real job, not a supplier's brochure and not a
                  language model's best guess. When the numbers are wrong, it's because a merchant
                  changed a price — not because nobody who wrote it had ever held a whacker plate.</p>

                <ul className="ledger" style={{ marginTop: 32 }}>
                  <li><span className="mono k">2005–now</span><span className="v">Still on the tools. Still building gardens and rooms in them.</span></li>
                  <li><span className="mono k">Checked</span><span className="v">Every calculation tested against a job that actually happened, at its real finished cost.</span></li>
                  <li><span className="mono k">UK only</span><span className="v">Pounds, tonnes, metres, 20% VAT, UK merchant ranges. Nothing converted from somewhere else.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CLOSE ============ */}
        <section id="trial" className="close">
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">E — Next one</span><span className="ticks"></span></div>
            <div style={{ marginTop: 38 }}>
              <h2 className="disp">Price the next one properly.</h2>
              <p className="lede">Take a job you've already done and put it through. If the number
                doesn't land within a few percent of what it actually cost you, walk away — that's
                a fair test and it's the one I'd run.</p>
              <div className="row">
                <a className="btn chalk" href="https://app.pricem8.uk/signup">Start free trial <span className="arw">→</span></a>
                <span className="mono fine">Free to try · cancel whenever · no contract</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="site">
        <div className="wrap row">
          <a className="mark" href="#top">PriceM8<i></i></a>
          <nav>
            <a className="mono" href="#landscaping">Landscaping</a>
            <a className="mono" href="#garden-rooms">Garden rooms</a>
            <a className="mono" href="#quote">The quote</a>
            <a className="mono" href="#story">The story</a>
            <Link className="mono" to="/pricing">Pricing</Link>
          </nav>
          <span className="mono">Quoting software for UK landscapers and garden room builders</span>
        </div>
      </footer>
    </div>
  )
}
