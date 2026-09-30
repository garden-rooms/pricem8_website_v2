import React from 'react'

interface BrandedTextProps {
  children: string
  className?: string
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/**
 * Component that automatically styles "PriceM8" text, making "M8" appear in an orange gradient.
 * Can be used as a wrapper for headings, titles, and other text elements.
 */
export default function BrandedText({ children, className = '', as: Component = 'span' }: BrandedTextProps) {
  // Split the text by "PriceM8" (case-insensitive)
  const parts = children.split(/(PriceM8)/i)
  
  return (
    <Component className={className}>
      {parts.map((part, index) => {
        // If this part is "PriceM8" (case-insensitive match)
        if (/PriceM8/i.test(part)) {
          return (
            <React.Fragment key={index}>
              <span>Price</span>
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
                M8
              </span>
            </React.Fragment>
          )
        }
        return <React.Fragment key={index}>{part}</React.Fragment>
      })}
    </Component>
  )
}

/**
 * Utility function to process text and return JSX with styled PriceM8
 * Useful when you need to process text that might contain PriceM8
 */
export function formatPriceM8(text: string): React.ReactNode {
  const parts = text.split(/(PriceM8)/i)
  
  return parts.map((part, index) => {
    if (/PriceM8/i.test(part)) {
      return (
        <React.Fragment key={index}>
          <span>Price</span>
          <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
            M8
          </span>
        </React.Fragment>
      )
    }
    return <React.Fragment key={index}>{part}</React.Fragment>
  })
}

