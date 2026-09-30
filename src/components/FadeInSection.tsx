import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInSectionProps {
  children: ReactNode
  delay?: number
  threshold?: number
  className?: string
}

export default function FadeInSection({
  children,
  delay = 0,
  threshold = 0.25,
  className = ""
}: FadeInSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      viewport={{ once: true, amount: threshold }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

