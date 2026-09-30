import { motion, useInView } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  staggerChildren?: number
}

export default function AnimatedSection({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  staggerChildren = 0
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 40 }
      case 'down': return { opacity: 0, y: -40 }
      case 'left': return { opacity: 0, x: 40 }
      case 'right': return { opacity: 0, x: -40 }
      case 'none': return { opacity: 0 }
      default: return { opacity: 0, y: 40 }
    }
  }

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up': case 'down': return { opacity: 1, y: 0 }
      case 'left': case 'right': return { opacity: 1, x: 0 }
      case 'none': return { opacity: 1 }
      default: return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration: 0.8,
        delay,
        type: "spring",
        bounce: 0.2,
        staggerChildren
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

