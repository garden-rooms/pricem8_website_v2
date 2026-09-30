import { motion } from 'framer-motion'
import FadeInSection from './FadeInSection'

interface TrustedByProps {
    section: {
        id: string
        title?: string
        logos: string[]
    }
}

export default function TrustedBy({ section }: TrustedByProps) {
    // Duplicate logos to ensure seamless looping
    const logos = [...section.logos, ...section.logos]

    return (
        <section className="py-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeInSection>
                    {section.title && (
                        <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-12">
                            {section.title}
                        </p>
                    )}

                    <div
                        className="relative w-full max-w-5xl mx-auto"
                        style={{
                            maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
                        }}
                    >
                        <div className="flex overflow-hidden">
                            <motion.div
                                className="flex gap-16 md:gap-24 items-center whitespace-nowrap"
                                animate={{ x: "-50%" }}
                                transition={{
                                    repeat: Infinity,
                                    ease: "linear",
                                    duration: 40,
                                }}
                            >
                                {logos.map((logo, index) => (
                                    <div
                                        key={index}
                                        className="text-2xl md:text-3xl font-extrabold text-slate-400/80 dark:text-slate-500/80 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-300 cursor-default select-none"
                                    >
                                        {logo}
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </section>
    )
}
