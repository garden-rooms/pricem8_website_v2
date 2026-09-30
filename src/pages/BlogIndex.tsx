import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import blogPosts from '../data/blogPosts.json'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GridBackground from '../components/GridBackground'
import FadeInSection from '../components/FadeInSection'
import { BackgroundGlow } from '../components/BackgroundGlow'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

// Import navbar and footer from home page spec
import homePageSpec from '../data/pageSpec.json'

export default function BlogIndex() {
    useEffect(() => {
        document.title = 'Blog — PriceM8'
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Expert advice, pricing tips and industry news for UK tradespeople. Learn how to price jobs accurately and grow your trade business.')
        }
        window.scrollTo(0, 0)
    }, [])

    const navbarSection = (homePageSpec as any).sections.find((s: any) => s.type === 'navbar')
    const footerSection = (homePageSpec as any).sections.find((s: any) => s.type === 'footer')

    const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg relative overflow-hidden transition-colors duration-300">
            <GridBackground />
            {navbarSection && <Navbar section={navbarSection} />}

            {/* Hero */}
            <section className="relative pt-32 pb-20 relative z-10">
                <BackgroundGlow
                    variant="mixed"
                    className="left-1/2 top-0 h-96 w-96 -translate-x-1/2 opacity-40 dark:opacity-20"
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="animate-fade-in-up-blur [animation-delay:100ms]">
                            <div className="inline-flex items-center px-4 py-2 mb-8 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium border border-teal-100 dark:border-teal-500/20 shadow-sm">
                                The Trade Blog
                            </div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight animate-fade-in-up-blur [animation-delay:200ms]">
                                Pricing Tips & <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">Industry Insights</span>
                            </h1>
                            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-blur [animation-delay:300ms]">
                                Expert advice to help you price accurately, win more work, and run a profitable trade business.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="relative pb-32 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedPosts.map((post, index) => (
                            <FadeInSection key={post.id} delay={index * 0.05}>
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="h-full"
                                >
                                    <Link
                                        to={`/blog/${post.slug}`}
                                        className="group block h-full rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg overflow-hidden shadow-lg dark:shadow-slate-900/50 border border-gray-100 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10 dark:hover:shadow-teal-500/5 hover:border-teal-200 dark:hover:border-teal-500/30 hover:bg-white/80 dark:hover:bg-slate-800/80 flex flex-col"
                                    >
                                        <div className="h-48 relative overflow-hidden bg-gray-100 dark:bg-slate-800">
                                            <img
                                                src={`/images/blog/${post.image}.png`}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="absolute top-4 left-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-slate-900/90 text-teal-700 dark:text-teal-400 shadow-sm backdrop-blur-sm">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {post.readTime}
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors leading-tight">
                                                {post.title}
                                            </h3>

                                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed line-clamp-3 flex-grow">
                                                {post.excerpt}
                                            </p>

                                            <span className="text-teal-600 dark:text-teal-400 font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                                                Read Article
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {footerSection && <Footer section={footerSection} />}
        </div>
    )
}
