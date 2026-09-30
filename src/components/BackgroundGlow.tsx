import React from "react"
import clsx from "clsx"

type BackgroundGlowProps = {
  className?: string
  variant?: "teal" | "blue" | "mixed" | "purple" | "pink"
}

export const BackgroundGlow: React.FC<BackgroundGlowProps> = ({
  className,
  variant = "teal",
}) => {
  const base =
    "pointer-events-none absolute -z-10 blur-3xl opacity-20 dark:opacity-30"

  const variants: Record<string, string> = {
    teal: "bg-teal-400/30",
    blue: "bg-blue-400/30",
    purple: "bg-purple-400/25",
    pink: "bg-pink-400/25",
    mixed: "bg-gradient-to-br from-teal-400/25 via-blue-400/20 to-purple-400/20",
  }

  return (
    <div
      aria-hidden="true"
      className={clsx(base, variants[variant], className)}
    />
  )
}

