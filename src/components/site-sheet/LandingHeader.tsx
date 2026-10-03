// A deliberately nav-free header for paid-traffic landing pages — one exit path (the CTA),
// not a dozen (full site nav). SiteSheetHeader is for the real site; this is for ads.
export default function SiteSheetLandingHeader() {
  return (
    <header className="site">
      <div className="wrap bar">
        <a className="mark" href="#top">PriceM8<i></i></a>
        <a className="btn small" style={{ marginLeft: 'auto' }} href="https://app.pricem8.uk/signup">Start free trial</a>
      </div>
    </header>
  )
}
