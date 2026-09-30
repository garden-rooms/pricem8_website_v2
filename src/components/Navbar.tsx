import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavbarSection } from '../types'
import BrandedText from './BrandedText'
import { motion, AnimatePresence } from 'framer-motion'
import { useWaitingList } from '../context/WaitingListContext'
import { trackFreeTrialConversion } from '../utils/tracking'

interface NavbarProps {
  section: NavbarSection
}

import ThemeToggle from './ThemeToggle'

export default function Navbar({ section }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { openWaitlist } = useWaitingList()
  const isHashLink = (href: string) => href.startsWith('#')
  const isExternalLink = (href: string) => href.startsWith('http') || href.startsWith('//')

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#waitlist') {
      e.preventDefault()
      openWaitlist()
      setIsOpen(false)
    } else if (href.includes('/app') || href.includes('pricem8.uk/signup')) {
      trackFreeTrialConversion()
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-gray-100 dark:border-dark-border shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              <BrandedText className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                {section.logoText}
              </BrandedText>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {section.links.map((link) => {
              if (isHashLink(link.href) || isExternalLink(link.href)) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </a>
                )
              }
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 font-medium"
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Right Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <ThemeToggle />
            {section.rightButtons.map((button, index) => {
              if (isHashLink(button.href) || isExternalLink(button.href)) {
                return (
                  <a
                    key={index}
                    href={button.href}
                    onClick={(e) => handleLinkClick(e, button.href)}
                    className={
                      button.variant === 'solid'
                        ? 'inline-flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/40 hover:-translate-y-0.5'
                        : 'px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 font-medium'
                    }
                  >
                    {button.label}
                  </a>
                )
              }
              return (
                <Link
                  key={index}
                  to={button.href}
                  className={
                    button.variant === 'solid'
                      ? 'inline-flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/40 hover:-translate-y-0.5'
                      : 'px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 font-medium'
                  }
                >
                  {button.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              type="button"
              className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none"
              aria-label="Toggle menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-dark-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {section.links.map((link) => (
                <div key={link.href}>
                  {isHashLink(link.href) || isExternalLink(link.href) ? (
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                {section.rightButtons.map((button, index) => (
                  <div key={index}>
                    {isHashLink(button.href) || isExternalLink(button.href) ? (
                      <a
                        href={button.href}
                        onClick={(e) => handleLinkClick(e, button.href)}
                        className={`block w-full text-center px-4 py-2 rounded-md text-base font-medium ${button.variant === 'solid'
                          ? 'bg-teal-600 text-white hover:bg-teal-700'
                          : 'text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                          }`}
                      >
                        {button.label}
                      </a>
                    ) : (
                      <Link
                        to={button.href}
                        className={`block w-full text-center px-4 py-2 rounded-md text-base font-medium ${button.variant === 'solid'
                          ? 'bg-teal-600 text-white hover:bg-teal-700'
                          : 'text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {button.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}


