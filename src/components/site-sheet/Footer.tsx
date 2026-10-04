import { Link } from 'react-router-dom'

export default function SiteSheetFooter() {
  return (
    <footer className="site">
      <div className="wrap row">
        <a className="mark" href="/#top">PriceM8<i></i></a>
        <nav>
          <a className="mono" href="/#landscaping">Landscaping</a>
          <a className="mono" href="/#garden-rooms">Garden rooms</a>
          <a className="mono" href="/#quote">The quote</a>
          <a className="mono" href="/#story">The story</a>
          <Link className="mono" to="/pricing">Pricing</Link>
          <Link className="mono" to="/blog">The Site Office</Link>
          <Link className="mono" to="/roast-my-quote">Roast My Quote</Link>
          <Link className="mono" to="/contact">Contact</Link>
          <a className="mono" href="https://app.pricem8.uk/login">Log in</a>
        </nav>
        <span className="mono">Quoting software for UK landscapers and garden room builders</span>
      </div>
      <div className="wrap row" style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--band-rule)' }}>
        <span className="mono">© {new Date().getFullYear()} PriceM8</span>
        <nav>
          <Link className="mono" to="/privacy-policy">Privacy Policy</Link>
          <Link className="mono" to="/terms-of-service">Terms of Service</Link>
        </nav>
      </div>
    </footer>
  )
}
