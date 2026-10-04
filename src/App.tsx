import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import HowToCharge from './pages/blog/HowToCharge'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import RoastMyQuote from './pages/RoastMyQuote'
import LinkInBio from './pages/LinkInBio'
import ConstructionEstimatingSoftware from './pages/ConstructionEstimatingSoftware'
import ConstructionQuotingSoftware from './pages/ConstructionQuotingSoftware'
import GetStartedPage from './pages/GetStartedPage'
import { WaitingListProvider } from './context/WaitingListContext'
import WaitingListModal from './components/WaitingListModal'

function App() {
  return (
    <WaitingListProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Home's own story/maths sections now make this page's case */}
          <Route path="/real-data" element={<Navigate to="/#story" replace />} />
          {/* About, Features, Trades and Testimonials are now sections on the homepage */}
          <Route path="/about" element={<Navigate to="/#story" replace />} />
          <Route path="/features" element={<Navigate to="/#landscaping" replace />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/trades" element={<Navigate to="/#landscaping" replace />} />
          <Route path="/trades/:tradeId" element={<Navigate to="/" replace />} />
          <Route path="/testimonials" element={<Navigate to="/#quote" replace />} />
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
          {/* Consolidated into one landing page — see GetStartedPage.tsx */}
          <Route path="/offer" element={<Navigate to="/get-started" replace />} />
          <Route path="/offer-retro" element={<Navigate to="/get-started" replace />} />
          <Route path="/lp/quote-in-minutes" element={<Navigate to="/get-started" replace />} />
          <Route path="/get-started" element={<GetStartedPage />} />
        </Routes>
        <WaitingListModal />
      </BrowserRouter>
    </WaitingListProvider>
  )
}

export default App
