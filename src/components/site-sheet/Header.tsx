import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function SiteSheetHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the route (or in-page hash) changes.
  useEffect(() => { setOpen(false) }, [location.pathname, location.hash])

  const links = (
    <>
      <a href="/#landscaping" onClick={() => setOpen(false)}>Landscaping</a>
      <a href="/#garden-rooms" onClick={() => setOpen(false)}>Garden rooms</a>
      <a href="/#quote" onClick={() => setOpen(false)}>The quote</a>
      <a href="/#story" onClick={() => setOpen(false)}>The story</a>
      <Link to="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
      <Link to="/blog" onClick={() => setOpen(false)}>The Site Office</Link>
    </>
  )

  return (
    <header className="site">
      <div className="wrap bar">
        <a className="mark" href="/#top">PriceM8<i></i></a>
        <nav className="main">{links}</nav>
        <a className="login-link" href="https://app.pricem8.uk/login">Log in</a>
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <a className="btn small" href="https://app.pricem8.uk/signup">Start free trial</a>
      </div>
      {open && (
        <div className="wrap">
          <nav className="main-mobile mono">
            {links}
            <a href="https://app.pricem8.uk/login" onClick={() => setOpen(false)}>Log in</a>
          </nav>
        </div>
      )}
    </header>
  )
}
