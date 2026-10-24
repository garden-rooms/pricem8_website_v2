import { Link } from 'react-router-dom'
import SiteSheetHeader from '../../components/site-sheet/Header'
import SiteSheetFooter from '../../components/site-sheet/Footer'
import { useSEO, useJsonLd } from '../../hooks/useSEO'
import '../../styles/site-sheet.css'

// One layout for every "walkthrough" page: a real screen recording of the app plus the same moments
// as numbered still shots with a line of plain explanation each. Everything shown is the real app
// (test client, real numbers) — keep it that way: no mock-ups on these pages.

export interface WalkthroughStep {
  heading: string
  body: string
  image: string // path under /walkthroughs/
  alt: string
}

export interface WalkthroughVideo {
  src: string
  poster: string
  /** Short description, used as the accessible label and in search data. */
  label: string
  /** ISO 8601 duration, e.g. "PT52S". */
  duration: string
}

export interface WalkthroughSection {
  id: string
  label: string // e.g. "A — Measure on the map"
  title: string
  lede: string
  video: WalkthroughVideo
  steps: WalkthroughStep[]
  note?: string
}

export interface WalkthroughNext {
  to: string
  label: string
  text: string
}

interface WalkthroughProps {
  path: string
  seoTitle: string
  seoDescription: string
  eyebrow: string
  heading: string
  lede: string
  sections: WalkthroughSection[]
  next: WalkthroughNext[]
  closing: { heading: string; text: string }
}

const SITE_URL = 'https://pricem8.uk'
const UPLOAD_DATE = '2026-10-24'

export default function Walkthrough(props: WalkthroughProps) {
  const { path, seoTitle, seoDescription, eyebrow, heading, lede, sections, next, closing } = props
  const first = sections[0]

  useSEO({ title: seoTitle, description: seoDescription, path, image: `${SITE_URL}/walkthroughs/${first.video.poster}`, index: true })
  useJsonLd(
    'walkthrough-videos-jsonld',
    {
      '@context': 'https://schema.org',
      '@graph': sections.map((s) => ({
        '@type': 'VideoObject',
        name: s.title,
        description: s.lede,
        thumbnailUrl: `${SITE_URL}/walkthroughs/${s.video.poster}`,
        contentUrl: `${SITE_URL}/walkthroughs/${s.video.src}`,
        uploadDate: UPLOAD_DATE,
        duration: s.video.duration,
      })),
    },
  )

  return (
    <div className="ps-page">
      <SiteSheetHeader />

      <main id="top">
        <section>
          <div className="wrap">
            <p className="mono hero-eyebrow">{eyebrow}</p>
            <h1 className="disp" style={{ fontSize: 'var(--fs-h2)', maxWidth: '16em' }}>{heading}</h1>
            <p className="lede" style={{ marginTop: 22 }}>{lede}</p>
          </div>
        </section>

        {sections.map((section, index) => (
          <section key={section.id} id={section.id} style={index % 2 === 1 ? { background: 'var(--paper-2)' } : undefined}>
            <div className="wrap">
              <div className="sheet-rule"><span className="mono lbl">{section.label}</span><span className="ticks"></span></div>
              <div className="sec-head">
                <h2 className="disp">{section.title}</h2>
                <p className="lede">{section.lede}</p>
              </div>

              <figure className="wt-video">
                <video controls playsInline muted preload="metadata" poster={`/walkthroughs/${section.video.poster}`} aria-label={section.video.label}>
                  <source src={`/walkthroughs/${section.video.src}`} type="video/mp4" />
                  Your browser can't play this video. The steps below show the same thing as stills.
                </video>
                <figcaption className="mono">{section.video.label} · screen recording, no sound</figcaption>
              </figure>

              <ol className="wt-steps">
                {section.steps.map((step, i) => (
                  <li key={step.heading} className="wt-step">
                    <div>
                      <span className="mono n">Step {i + 1}</span>
                      <h3 className="sub">{step.heading}</h3>
                      <p>{step.body}</p>
                    </div>
                    <img src={`/walkthroughs/${step.image}`} alt={step.alt} loading="lazy" width={1280} height={672} />
                  </li>
                ))}
              </ol>

              {section.note && <p className="wt-note mono">{section.note}</p>}
            </div>
          </section>
        ))}

        <section className="close">
          <div className="wrap">
            <div className="sheet-rule"><span className="mono lbl">Next</span><span className="ticks"></span></div>
            <div style={{ marginTop: 38 }}>
              <h2 className="disp">{closing.heading}</h2>
              <p className="lede">{closing.text}</p>
              <div className="row">
                <a className="btn chalk" href="https://app.pricem8.uk/signup">Start free trial <span className="arw">→</span></a>
                <span className="mono fine">Free to try · cancel whenever · no contract</span>
              </div>
              <ul className="wt-next">
                {next.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to}><span className="mono">{n.label}</span> {n.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <SiteSheetFooter />
    </div>
  )
}
