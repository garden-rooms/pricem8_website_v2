import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import blogPosts from '../data/blogPosts.json'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GridBackground from '../components/GridBackground'
import FadeInSection from '../components/FadeInSection'
import { BackgroundGlow } from '../components/BackgroundGlow'
import BlogChart from '../components/BlogChart'
import MarkupMarginCalculator from '../components/MarkupMarginCalculator'
import {
    Calendar,
    Clock,
    ArrowLeft,
    Share2,
    CheckCircle2,
    AlertCircle,
    Lightbulb,
    Target,
    TrendingUp,
    FileText,
    Twitter,
    Linkedin,
    Facebook,
    Copy,
    Check
} from 'lucide-react'

// Import navbar and footer from home page spec
import homePageSpec from '../data/pageSpec.json'

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>()
    const navigate = useNavigate()

    const post = blogPosts.find(p => p.slug === slug)
    const [copied, setCopied] = useState(false)
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

    const handleShare = async (platform?: string) => {
        if (!post) return

        const shareData = {
            title: post.title,
            text: post.excerpt,
            url: currentUrl,
        }

        if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`, '_blank')
            return
        }

        if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank')
            return
        }

        if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank')
            return
        }

        if (platform === 'copy') {
            try {
                await navigator.clipboard.writeText(currentUrl)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                console.error('Error copying to clipboard:', err)
            }
            return
        }

        // Native share
        if (navigator.share) {
            try {
                await navigator.share(shareData)
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    console.error('Error sharing:', err)
                }
            }
        } else {
            // Fallback to copy
            try {
                await navigator.clipboard.writeText(currentUrl)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                console.error('Error copying to clipboard:', err)
            }
        }
    }

    // Get icon component for checklist items based on heading text
    const getChecklistIcon = (headingText: string) => {
        if (headingText.includes('Pre-Estimate') || headingText.includes('1.')) {
            return FileText
        }
        if (headingText.includes('Labour') || headingText.includes('2.')) {
            return TrendingUp
        }
        if (headingText.includes('Materials') || headingText.includes('3.')) {
            return Target
        }
        if (headingText.includes('Overheads') || headingText.includes('4.')) {
            return AlertCircle
        }
        if (headingText.includes('Margin') || headingText.includes('5.')) {
            return Lightbulb
        }
        return CheckCircle2
    }

    useEffect(() => {
        if (!post) {
            navigate('/blog', { replace: true })
            return
        }

        document.title = post.seo.title

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
            metaDescription.setAttribute('content', post.seo.description)
        }

        // Update Open Graph tags
        const updateMeta = (property: string, content: string) => {
            let element = document.querySelector(`meta[property="${property}"]`)
            if (!element) {
                element = document.createElement('meta')
                element.setAttribute('property', property)
                document.head.appendChild(element)
            }
            element.setAttribute('content', content)
        }

        updateMeta('og:title', post.seo.title)
        updateMeta('og:description', post.seo.description)
        updateMeta('og:url', window.location.href)
        updateMeta('og:site_name', 'PriceM8')
        if (post.image) {
            updateMeta('og:image', `https://pricem8.uk${post.image}`)
        }

        // Update Twitter tags
        const updateTwitter = (name: string, content: string) => {
            let element = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`)
            if (!element) {
                element = document.createElement('meta')
                element.setAttribute('name', name)
                document.head.appendChild(element)
            }
            element.setAttribute('content', content)
        }

        updateTwitter('twitter:title', post.seo.title)
        updateTwitter('twitter:description', post.seo.description)
        if (post.image) {
            updateTwitter('twitter:image', `https://pricem8.uk${post.image}`)
        }

        window.scrollTo(0, 0)
    }, [post, navigate])

    const [readingProgress, setReadingProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight
            const scrollTop = window.scrollY
            const progress = (scrollTop / (documentHeight - windowHeight)) * 100
            setReadingProgress(Math.min(100, Math.max(0, progress)))
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!post) return null

    const navbarSection = (homePageSpec as any).sections.find((s: any) => s.type === 'navbar')
    const footerSection = (homePageSpec as any).sections.find((s: any) => s.type === 'footer')

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg relative overflow-hidden transition-colors duration-300">
            <GridBackground />
            {navbarSection && <Navbar section={navbarSection} />}

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-slate-800 z-50">
                <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 to-blue-500"
                    style={{ width: `${readingProgress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>

            <article className="relative pt-32 pb-20 relative z-10">
                <BackgroundGlow
                    variant="mixed"
                    className="left-1/2 top-0 h-96 w-96 -translate-x-1/2 opacity-30 dark:opacity-20"
                />

                {/* Header */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <FadeInSection delay={0}>
                        <Link
                            to="/blog"
                            className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 mb-8 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-500/10 dark:to-blue-500/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30 shadow-sm"
                            >
                                {post.category}
                            </motion.span>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-slate-700">
                                        <Calendar className="w-3.5 h-3.5" />
                                    </div>
                                    {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-slate-700">
                                        <Clock className="w-3.5 h-3.5" />
                                    </div>
                                    {post.readTime}
                                </div>
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                            {post.title}
                        </h1>
                        {post.excerpt && (
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                                {post.excerpt}
                            </p>
                        )}
                    </FadeInSection>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeInSection delay={0.1} threshold={0.05}>
                        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-xl dark:shadow-slate-900/50 border border-gray-200/50 dark:border-slate-700/50">
                            <div className="prose prose-lg prose-teal dark:prose-invert max-w-none">
                                {post.content.map((block: any, index: number) => {
                                    // Get previous heading to determine if this is a checklist section
                                    const prevHeading = index > 0 ? post.content.slice(0, index).reverse().find((b: any) => b.type === 'heading') : null
                                    const isChecklistSection = prevHeading?.text?.includes('✅') || prevHeading?.text?.includes('Checklist')

                                    if (block.type === 'paragraph') {
                                        // Check if this paragraph contains important call-out text
                                        const isImportant = block.text?.includes('<strong>') || block.text?.includes('Rule of thumb') || block.text?.includes('Important')

                                        if (isImportant) {
                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.1 }}
                                                    className="my-8 p-6 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl border-l-4 border-teal-500 dark:border-teal-400"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <Lightbulb className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-0" dangerouslySetInnerHTML={{ __html: block.text || '' }} />
                                                    </div>
                                                </motion.div>
                                            )
                                        }

                                        // Check if paragraph contains links
                                        const hasLinks = block.text?.includes('<a href=')

                                        return (
                                            <motion.p
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.02 }}
                                                className={`text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg ${hasLinks ? '[&_a]:text-teal-600 dark:[&_a]:text-teal-400 [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-teal-700 dark:[&_a]:hover:text-teal-300 [&_a]:transition-colors' : ''
                                                    }`}
                                                dangerouslySetInnerHTML={{ __html: block.text || '' }}
                                            />
                                        )
                                    }
                                    if (block.type === 'heading') {
                                        const isChecklistHeading = block.text?.includes('✅')
                                        const IconComponent = isChecklistHeading ? getChecklistIcon(block.text) : null

                                        return (
                                            <motion.h2
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.1 }}
                                                className={`text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 flex items-center gap-3 ${isChecklistHeading ? 'bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent' : ''
                                                    }`}
                                            >
                                                {IconComponent && (
                                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                                                        <IconComponent className="w-5 h-5" />
                                                    </div>
                                                )}
                                                <span>{block.text?.replace('✅', '').trim()}</span>
                                            </motion.h2>
                                        )
                                    }
                                    if (block.type === 'list') {
                                        return (
                                            <motion.ul
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.1 }}
                                                className={`space-y-3 mb-8 ${isChecklistSection ? 'bg-gray-50 dark:bg-slate-800/50 p-6 rounded-xl border border-gray-200 dark:border-slate-700' : ''}`}
                                            >
                                                {block.items?.map((item: string, i: number) => (
                                                    <motion.li
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: i * 0.05 }}
                                                        className="flex items-start gap-3 text-gray-700 dark:text-gray-300 group"
                                                    >
                                                        {isChecklistSection ? (
                                                            <div className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                                                                <CheckCircle2 className="w-4 h-4" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-2 h-2 rounded-full bg-teal-500 mt-2.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                                        )}
                                                        <span className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: item || '' }} />
                                                    </motion.li>
                                                ))}
                                            </motion.ul>
                                        )
                                    }
                                    if (block.type === 'chart') {
                                        return (
                                            <BlogChart
                                                key={index}
                                                title={block.title}
                                                data={block.data}
                                                type={block.chartType}
                                                subtitle={block.subtitle}
                                            />
                                        )
                                    }
                                    if (block.type === 'calculator') {
                                        if (block.variant === 'markup-margin') {
                                            return <MarkupMarginCalculator key={index} />
                                        }
                                    }
                                    return null
                                })}
                            </div>
                        </div>
                    </FadeInSection>
                </div>

                {/* Share Section */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                    <FadeInSection delay={0.2}>
                        <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-slate-800/50 dark:to-slate-800/50 rounded-2xl p-6 border border-teal-100 dark:border-slate-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Share2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                                Share this article
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleShare('twitter')}
                                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors shadow-sm"
                                >
                                    <Twitter className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm font-medium">Twitter</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleShare('linkedin')}
                                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors shadow-sm"
                                >
                                    <Linkedin className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-medium">LinkedIn</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleShare('facebook')}
                                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors shadow-sm"
                                >
                                    <Facebook className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-medium">Facebook</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleShare('copy')}
                                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors shadow-sm"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4 text-teal-600" />
                                            <span className="text-sm font-medium text-teal-600">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            <span className="text-sm font-medium">Copy link</span>
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </article>

            {/* CTA Section */}
            <section className="relative py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 px-8 py-16 shadow-2xl text-center">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                        <FadeInSection>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 relative z-10">
                                Ready to price your jobs properly?
                            </h2>
                            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">
                                Join thousands of UK tradespeople using PriceM8 to win more work.
                            </p>
                            <motion.a
                                href="https://app.pricem8.uk/signup"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-lg transition-all duration-200 hover:bg-gray-50 relative z-10"
                            >
                                Start Free Trial
                            </motion.a>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {footerSection && <Footer section={footerSection} />}
        </div>
    )
}
