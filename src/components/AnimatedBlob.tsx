import { motion, useScroll, useTransform } from 'framer-motion'
import clsx from 'clsx'

type AnimatedBlobProps = {
  className?: string
  variant?: "teal" | "blue" | "purple" | "pink" | "mixed"
  size?: "sm" | "md" | "lg"
  initialY?: number
  initialX?: number
  speed?: number
}

export const AnimatedBlob: React.FC<AnimatedBlobProps> = ({
  className,
  variant = "teal",
  size = "md",
  initialY = 0,
  initialX = 0,
  speed = 1,
}) => {
  // Use global scroll progress for smooth animations
  const { scrollYProgress } = useScroll()
  
  // Animate position based on scroll with different speeds for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [initialY, initialY + (80 * speed)])
  const x = useTransform(scrollYProgress, [0, 1], [initialX, initialX + (50 * speed)])
  
  // Subtle scale animation that pulses as you scroll
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1.08, 1.05, 1])
  
  // Opacity animation - subtle variation
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.12, 0.16, 0.18, 0.16, 0.12])

  const sizeClasses = {
    sm: "h-32 w-32 sm:h-40 sm:w-40",
    md: "h-48 w-48 sm:h-64 sm:w-64",
    lg: "h-64 w-64 sm:h-80 sm:w-80",
  }

  const variants: Record<string, string> = {
    teal: "bg-teal-400/40",
    blue: "bg-blue-400/40",
    purple: "bg-purple-400/20",
    pink: "bg-pink-400/15",
    mixed: "bg-gradient-to-br from-teal-400/15 via-blue-400/12 to-purple-400/12",
  }

  return (
    <motion.div
      aria-hidden="true"
      className={clsx(
        "pointer-events-none fixed -z-10 rounded-full blur-3xl",
        sizeClasses[size],
        variants[variant],
        className
      )}
      style={{
        y,
        x,
        scale,
        opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 30,
      }}
    />
  )
}

