import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface AnimatedPriceProps {
  value: string // e.g., "£19" or "£190"
  className?: string
  isYearly?: boolean
}

export default function AnimatedPrice({ value, className = '' }: AnimatedPriceProps) {
  // Extract numeric value
  const numericValue = parseFloat(value.replace(/[£,]/g, ''))
  const [prevValue, setPrevValue] = useState(numericValue)

  const motionValue = useMotionValue(prevValue)
  const spring = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
  })
  const rounded = useTransform(spring, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(prevValue)

  useEffect(() => {
    if (numericValue !== prevValue) {
      setPrevValue(numericValue)
      motionValue.set(numericValue)
    }
  }, [numericValue, prevValue, motionValue])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest)
    })
    return () => unsubscribe()
  }, [rounded])

  // Format the displayed value
  const formattedValue = displayValue.toLocaleString('en-GB', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return (
    <motion.span
      className={className}
      key={numericValue} // Force re-render on value change
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      £{formattedValue}
    </motion.span>
  )
}
