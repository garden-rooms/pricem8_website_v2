import { Link } from 'react-router-dom'
import SiteSheetHeader from '../../components/site-sheet/Header'
import SiteSheetFooter from '../../components/site-sheet/Footer'
import { useSEO } from '../../hooks/useSEO'
import '../../styles/site-sheet.css'

const SEO_TITLE = 'Watch PriceM8 work: real screen recordings – PriceM8 walkthroughs'
const SEO_DESCRIPTION =
  'Short screen recordings of the real app: measuring a garden on the satellite map, turning a quote into an invoice, and asking for a bank payment on a part-paid invoice.'

const WALKTHROUGHS = [
  {
    to: '/walkthroughs/measure-a-garden-on-the-map',
    n: '1',
    kicker: 'Measuring',
    title: 'Measure it from the map, then price it',
    text: 'Click round a drive or lawn on the satellite view and the area goes straight into the quote. Plus the sketch pad for when the map can\'t help.',
    poster: '/walkthroughs/measure-on-map-poster.webp',
    length: '2 recordings · about 1 min each',
  },
  {
    to: '/walkthroughs/quote-to-invoice',
    n: '2',
    kicker: 'Quotes and invoices',
    title: 'From the numbers to a quote you can send',
    text: 'The breakdown behind a price, the version your customer reads, and the invoice made from it in one click.',
    poster: '/walkthroughs/quote-to-invoice-poster.webp',
    length: '1 recording · about 1 min',
  },
  {
    to: '/walkthroughs/get-paid-by-bank-payment',
    n: '3',
    kicker: 'Getting paid',
    title: 'From a deposit to the balance, paid from their banking app',
    text: 'A part-paid invoice, one button to ask for the balance by bank payment, and the page your customer pays on.',
    poster: '/walkthroughs/get-paid-bank-payment-poster.webp',
    length: '1 recording · under 20 seconds',
  },
]

export default function Walkthroughs() {
  useSEO({ title: SEO_TITLE, description: SEO_DESCRIPTION, path: '/walkthroughs', image: 'https://pricem8.uk/walkthroughs/measure-on-map-poster.webp', index: true })

  return (
    <div className="ps-page">
      <SiteSheetHeader />

      <main id="top">
        <section>
          <div className="wrap">
            <p className="mono hero-eyebrow">Walkthroughs</p>
            <h1 className="disp" style={{ fontSize: 'var(--fs-h2)', maxWidth: '16em' }}>See it done, in the real app.</h1>
            <p className="lede" style={{ marginTop: 22 }}>
              Short screen recordings with a test client, no mock-ups. Each one has the same moments as
              numbered stills underneath, so you can skim it without pressing play.
            </p>

            <div className="lines" style={{ marginTop: 44 }}>
              {WALKTHROUGHS.map((w) => (
                <div className="line-block" key={w.to}>
                  <Link to={w.to} className="wt-card-img" aria-label={w.title}>
                    <img src={w.poster} alt="" loading="lazy" width={1280} height={672} />
                  </Link>
                  <div className="line-title">
                    <h3 className="sub">{w.title}</h3>
                    <span className="mono n">{w.kicker}</span>
                  </div>
                  <p>{w.text}</p>
                  <p className="mono" style={{ color: 'var(--ink-2)' }}>{w.length}</p>
                  <p><Link to={w.to}>Watch walkthrough {w.n} →</Link></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="close">
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">Next</span><span className="ticks"></span></div>
            <div style={{ marginTop: 38 }}>
              <h2 className="disp">Try it on one of your own jobs.</h2>
              <p className="lede">Take a job you've already done and put it through. That's a fair test of any quoting tool.</p>
              <div className="row">
                <a className="btn chalk" href="https://app.pricem8.uk/signup">Start free trial <span className="arw">→</span></a>
                <span className="mono fine">Free to try · cancel whenever · no contract</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteSheetFooter />
    </div>
  )
}
