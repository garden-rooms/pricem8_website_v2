import { Link } from 'react-router-dom'
import { FooterSection } from '../types'
import { getIcon } from '../utils/icons'
import BrandedText from './BrandedText'

interface FooterProps {
  section: FooterSection
}

// Map footer link labels to their routes
const linkRoutes: Record<string, string> = {
  'Features': '/features',
  'Pricing': '/pricing',
  'About Us': '/about',
  'Trades': '/trades',
  'Contact': '/contact',
  'Help Center': '/help',
  'Documentation': '/docs',
  'Blog': '/blog',
  'Privacy Policy': '/privacy-policy',
  'Terms of Service': '/terms-of-service',
}

export default function Footer({ section }: FooterProps) {
  const getLinkHref = (link: string): string => {
    return linkRoutes[link] || '#'
  }

  const isInternalLink = (link: string): boolean => {
    const href = getLinkHref(link)
    return href !== '#' && !href.startsWith('http') && !href.startsWith('//')
  }

  return (
    <footer className="bg-gray-50 dark:bg-dark-bg text-gray-600 dark:text-gray-400 py-12 border-t border-gray-200 dark:border-dark-border relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold mb-4 block">
              <BrandedText className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                PriceM8
              </BrandedText>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {section.brandText}
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {section.social.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center hover:bg-teal-50 dark:hover:bg-slate-700 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-200 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-500/30"
                  aria-label={item.platform}
                >
                  {getIcon(item.platform, "w-5 h-5")}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(section.columns).map(([columnTitle, links], index) => (
            <div key={index}>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-4">{columnTitle}</h4>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => {
                  const href = getLinkHref(link)
                  const internal = isInternalLink(link)

                  return (
                    <li key={linkIndex}>
                      {internal ? (
                        <Link
                          to={href}
                          className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
                        >
                          {link}
                        </Link>
                      ) : (
                        <a
                          href={href}
                          className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
                        >
                          {link}
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {section.copyright}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {section.tagline}
          </p>
        </div>
      </div>
    </footer>
  )
}

