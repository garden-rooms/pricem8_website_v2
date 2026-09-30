import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
  value: number // e.g., 2450.00
  prefix?: string // e.g., "£"
  decimals?: number // number of decimal places (default: 2)
  className?: string
}

export default function AnimatedCounter({ 
  value, 
  prefix = '', 
  decimals = 2,
  className = ''
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, {
    stiffness: 50,
    damping: 30,
  })
  const rounded = useTransform(spring, (latest) => latest)

  useEffect(() => {
    if (!hasAnimated) {
      motionValue.set(value)
      setHasAnimated(true)
    }
  }, [value, motionValue, hasAnimated])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest)
    })
    return () => unsubscribe()
  }, [rounded])

  // Format the displayed value
  const formattedValue = displayValue.toLocaleString('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <motion.span
      className={className}
      key={value} // Force re-render on value change
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}{formattedValue}
    </motion.span>
  )
}
