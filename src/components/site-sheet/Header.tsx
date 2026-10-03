import { Link } from 'react-router-dom'

export default function SiteSheetHeader() {
  return (
    <header className="site">
      <div className="wrap bar">
        <a className="mark" href="/#top">PriceM8<i></i></a>
        <nav className="main">
          <a href="/#landscaping">Landscaping</a>
          <a href="/#garden-rooms">Garden rooms</a>
          <a href="/#quote">The quote</a>
          <a href="/#story">The story</a>
          <Link to="/pricing">Pricing</Link>
        </nav>
        <a className="btn small" href="https://app.pricem8.uk/signup">Start free trial</a>
      </div>
    </header>
  )
}
