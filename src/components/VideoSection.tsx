import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import FadeInSection from './FadeInSection'

interface VideoSectionProps {
  section: {
    id: string
    title?: string
    subtitle?: string
    videoSrc: string
  }
}

export default function VideoSection({ section }: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            // Load video when in view
            if (videoRef.current && !hasLoaded) {
              videoRef.current.load()
              setHasLoaded(true)
              
              // Try to play after loading
              setTimeout(() => {
                if (videoRef.current) {
                  videoRef.current.play().catch((err) => {
                    console.log('Autoplay blocked or error:', err)
                    setIsPlaying(false)
                  })
                }
              }, 100)
            } else if (videoRef.current && hasLoaded && !isPlaying) {
              // If already loaded but not playing, try to play
              videoRef.current.play().catch(() => {
                setIsPlaying(false)
              })
            }
          } else {
            // Pause video when out of view
            if (videoRef.current) {
              videoRef.current.pause()
              setIsPlaying(false)
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [hasLoaded, isPlaying])

  // Force video background color based on dark mode
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateVideoBackground = () => {
      const isDark = document.documentElement.classList.contains('dark')
      const bgColor = isDark ? 'rgb(30 41 59)' : 'white'
      video.style.backgroundColor = bgColor
      video.style.background = bgColor
    }

    // Set initial background
    updateVideoBackground()

    // Watch for dark mode changes
    const observer = new MutationObserver(updateVideoBackground)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  // Handle video play/pause events and errors
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => {
      setIsPlaying(true)
      setHasError(false)
    }
    const handlePause = () => setIsPlaying(false)
    const handleError = (e: Event) => {
      console.error('Video error:', e)
      setHasError(true)
      setIsPlaying(false)
    }
    const handleLoadedData = () => {
      setHasError(false)
      // Update background when loaded
      const isDark = document.documentElement.classList.contains('dark')
      const bgColor = isDark ? 'rgb(30 41 59)' : 'white'
      video.style.backgroundColor = bgColor
      video.style.background = bgColor
      // Try to play once data is loaded
      if (isInView) {
        video.play().catch(() => {
          setIsPlaying(false)
        })
      }
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('error', handleError)
    video.addEventListener('loadeddata', handleLoadedData)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('error', handleError)
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [hasLoaded, isInView])

  // Handle hash navigation to this section
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === `#${section.id}`) {
        videoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }

    // Check on mount
    if (window.location.hash === `#${section.id}`) {
      setTimeout(() => {
        videoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [section.id])

  return (
    <section id={section.id} className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInSection delay={0.1}>
          {/* White card container */}
          <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
            {(section.title || section.subtitle) && (
              <div className="text-center mb-8 md:mb-12">
                {section.title && (
                  <FadeInSection delay={0.1}>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                      {section.title}
                    </h2>
                  </FadeInSection>
                )}
                {section.subtitle && (
                  <FadeInSection delay={0.2}>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                      {section.subtitle}
                    </p>
                  </FadeInSection>
                )}
              </div>
            )}

            <FadeInSection delay={0.3}>
              {/* Video container - matches video's black background from CapCut */}
              <div ref={containerRef} className="relative rounded-xl overflow-hidden shadow-2xl bg-slate-900 dark:bg-black border border-slate-700 dark:border-slate-800">
                <video
                  ref={videoRef}
                  className="w-full h-auto"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  controls={false}
                >
                  <source src={section.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Error message */}
                {hasError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm text-slate-900 dark:text-white p-4">
                    <div className="text-center">
                      <p className="text-lg font-semibold mb-2">Video failed to load</p>
                      <button
                        onClick={() => {
                          setHasError(false)
                          if (videoRef.current) {
                            videoRef.current.load()
                          }
                        }}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Play button overlay (if video is paused or not playing) */}
                {!hasError && (!isPlaying || !hasLoaded) && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-800/90 transition-colors"
                    onClick={() => {
                      if (videoRef.current) {
                        if (!hasLoaded) {
                          videoRef.current.load()
                          setHasLoaded(true)
                        }
                        videoRef.current.play().catch((err) => {
                          console.error('Play error:', err)
                        })
                      }
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 bg-teal-600 hover:bg-teal-700 rounded-full flex items-center justify-center shadow-xl"
                    >
                      <svg
                        className="w-10 h-10 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
                )}
              </div>
            </FadeInSection>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
