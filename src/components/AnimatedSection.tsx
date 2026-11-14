import { motion, useInView, useReducedMotion } from 'framer-motion'
import { CSSProperties, ReactNode, useRef } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  as?: 'div' | 'article' | 'li' | 'span'
  style?: CSSProperties
  id?: string
}

// Same restrained entrance curve as the hero's dimension-line draw-in
// (site-sheet.css, @keyframes ps-draw) — kept quiet on purpose, not springy.
const EASE: [number, number, number, number] = [0.2, 0.7, 0.3, 1]

const TAGS = {
  div: motion.div,
  article: motion.article,
  li: motion.li,
  span: motion.span
}

export default function AnimatedSection({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  as = 'div',
  style,
  id
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const reduceMotion = useReducedMotion()

  const offset = (() => {
    switch (direction) {
      case 'up': return { y: 20 }
      case 'down': return { y: -20 }
      case 'left': return { x: 20 }
      case 'right': return { x: -20 }
      default: return {}
    }
  })()

  if (reduceMotion) {
    const Static = as
    return <Static className={className} style={style} id={id}>{children}</Static>
  }

  const Component = TAGS[as]

  return (
    <Component
      ref={ref}
      id={id}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  )
}

