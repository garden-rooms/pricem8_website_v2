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
        </nav>
        <span className="mono">Quoting software for UK landscapers and garden room builders</span>
      </div>
    </footer>
  )
}
