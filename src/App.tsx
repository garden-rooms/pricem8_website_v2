import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import TradePage from './pages/TradePage'
import TradesIndex from './pages/TradesIndex'
import Testimonials from './pages/Testimonials'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import HowToCharge from './pages/blog/HowToCharge'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import RoastMyQuote from './pages/RoastMyQuote'
import LinkInBio from './pages/LinkInBio'
import RealDataPage from './pages/RealDataPage'
import ConstructionEstimatingSoftware from './pages/ConstructionEstimatingSoftware'
import ConstructionQuotingSoftware from './pages/ConstructionQuotingSoftware'
import AdLandingPage from './pages/AdLandingPage'
import QuoteInMinutesLanding from './pages/QuoteInMinutesLanding'
import OfferRetro from './pages/OfferRetro'
import GetStartedPage from './pages/GetStartedPage'
import { WaitingListProvider } from './context/WaitingListContext'
import WaitingListModal from './components/WaitingListModal'

function App() {
  return (
    <WaitingListProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/real-data" element={<RealDataPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/trades" element={<TradesIndex />} />
          <Route path="/trades/:tradeId" element={<TradePage />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/how-much-to-charge" element={<HowToCharge />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/roast-my-quote" element={<RoastMyQuote />} />
          <Route path="/links" element={<LinkInBio />} />
          <Route path="/construction-estimating-software" element={<ConstructionEstimatingSoftware />} />
          <Route path="/construction-quoting-software" element={<ConstructionQuotingSoftware />} />
          <Route path="/offer" element={<AdLandingPage />} />
          <Route path="/offer-retro" element={<OfferRetro />} />
          <Route path="/lp/quote-in-minutes" element={<QuoteInMinutesLanding />} />
          <Route path="/get-started" element={<GetStartedPage />} />
        </Routes>
        <WaitingListModal />
      </BrowserRouter>
    </WaitingListProvider>
  )
}

export default App
