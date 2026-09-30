import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import FadeInSection from '../components/FadeInSection'
import { Check, ArrowRight, Zap, ChevronDown, ChevronUp, Star, X, Wrench, FileText, Smartphone, ShieldCheck, Shield, Calendar, RefreshCw, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import AnimatedCounter from '../components/AnimatedCounter'
import VideoSection from '../components/VideoSection'
import homePageSpec from '../data/pageSpec.json'
import { trackFreeTrialConversion } from '../utils/tracking'

const footerSection = (homePageSpec as any).sections.find((s: any) => s.type === 'footer')

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="border-b border-slate-200 dark:border-slate-800">
            <button
                className="w-full py-4 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-semibold text-slate-900 dark:text-white">{question}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-teal-500" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <p className="pb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {answer}
                </p>
            </motion.div>
        </div>
    )
}

export default function AdLandingPage() {
    const [shouldAnimate, setShouldAnimate] = useState(false)
    const widgetRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.title = "Create Accurate Quotes in Minutes - PriceM8"
        window.scrollTo(0, 0)

        // Trigger animation when widget is visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShouldAnimate(true)
                    }
                })
            },
            { threshold: 0.5 }
        )

        if (widgetRef.current) {
            observer.observe(widgetRef.current)
        }

        return () => {
            if (widgetRef.current) {
                observer.unobserve(widgetRef.current)
            }
        }
    }, [])

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-white">
            {/* SIMPLIFIED NAVBAR */}
            <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Price<span className="text-teal-500">M8</span>
                        </Link>
                        <a
                            href="https://app.pricem8.uk/signup"
                            onClick={trackFreeTrialConversion}
                            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all shadow-lg hover:shadow-teal-500/20"
                        >
                            Start Free Trial
                        </a>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        <div className="text-center lg:text-left">
                            <FadeInSection delay={0.1}>
                                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-teal-700 bg-teal-50 border border-teal-200 mb-6 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800">
                                    <Check className="w-4 h-4 mr-2" /> Live Material Prices Included
                                </div>
                            </FadeInSection>
                            <FadeInSection delay={0.2}>
                                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
                                    The Only Quoting App <br className="hidden lg:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
                                        Powered by Real Data.
                                    </span>
                                </h1>
                            </FadeInSection>
                            <FadeInSection delay={0.3}>
                                <p className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                                    Don't just write quotes—calculate them. PriceM8 connects to live merchant prices so you can build accurate estimates for Heating, Electrical, Building & Landscaping in minutes.
                                </p>
                            </FadeInSection>

                            <FadeInSection delay={0.4}>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                                    <motion.a
                                        href="https://app.pricem8.uk/signup"
                                        onClick={trackFreeTrialConversion}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-xl hover:shadow-2xl hover:shadow-teal-500/20"
                                    >
                                        Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                                    </motion.a>
                                    <div className="flex items-center justify-center px-6 py-4 text-slate-500 dark:text-slate-400 text-sm font-medium">
                                        <ShieldCheck className="w-5 h-5 mr-2 text-teal-500" /> No credit card required
                                    </div>
                                </div>
                            </FadeInSection>

                            <FadeInSection delay={0.5}>
                                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 dark:text-slate-400">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.5 + i * 0.1 }}
                                                className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-950 flex items-center justify-center text-xs overflow-hidden"
                                            >
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} alt="User" />
                                            </motion.div>
                                        ))}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.9 }}
                                            className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 border-2 border-white dark:border-slate-950 flex items-center justify-center text-xs font-bold text-teal-700 dark:text-teal-400"
                                        >
                                            +2k
                                        </motion.div>
                                    </div>
                                    <div>Trusted by 1,000+ UK Tradespeople</div>
                                </div>
                            </FadeInSection>
                        </div>

                        <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
                            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden aspect-[4/3] group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/90 to-slate-800/50 z-10"></div>
                                {/* Abstract UI Representation */}
                                <div className="absolute inset-0 z-0 opacity-50">
                                    <img src="/hero-dashboard-preview.png" alt="Dashboard Preview" className="w-full h-full object-cover object-top" />
                                </div>

                                <div ref={widgetRef} className="absolute inset-0 z-20 flex flex-col justify-center items-center p-8 text-center">
                                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 max-w-sm w-full transform transition-all duration-500 group-hover:scale-105">
                                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                                            <span className="text-slate-300 text-sm">Quote #1024</span>
                                            <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">PROFITABLE</span>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-white">
                                                <span>Materials</span>
                                                <span className="font-mono">
                                                    {shouldAnimate ? (
                                                        <AnimatedCounter value={2450.00} prefix="£" className="text-white" />
                                                    ) : (
                                                        <span className="text-white">£0.00</span>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-white">
                                                <span>Labour (Est.)</span>
                                                <span className="font-mono">
                                                    {shouldAnimate ? (
                                                        <AnimatedCounter value={1200.00} prefix="£" className="text-white" />
                                                    ) : (
                                                        <span className="text-white">£0.00</span>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="h-px bg-white/10 my-2"></div>
                                            <div className="flex justify-between items-center text-teal-400 text-lg font-bold">
                                                <span>Total</span>
                                                <span className="font-mono">
                                                    {shouldAnimate ? (
                                                        <AnimatedCounter value={3650.00} prefix="£" className="text-teal-400" />
                                                    ) : (
                                                        <span className="text-teal-400">£0.00</span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-6 text-slate-400 text-sm">
                                        <Zap className="inline w-4 h-4 text-yellow-400 mr-1" />
                                        Prices auto-updated 3 mins ago
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PROBLEM / AGITATION */}
            <div className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <FadeInSection delay={0.1}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                            Are you still <span className="text-red-500 line-through decoration-4 decoration-slate-900/20">guessing</span> your prices?
                        </h2>
                    </FadeInSection>
                    <FadeInSection delay={0.2}>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">
                            Material prices change every week. If you're using a spreadsheet from last year (or just guessing in your head), you're paying for your customer's renovation out of your own pocket.
                        </p>
                    </FadeInSection>

                    {/* COMPARISON TABLE */}
                    <FadeInSection delay={0.3}>
                        <div className="mt-16 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
                            <div className="grid grid-cols-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4">
                                <div className="col-span-1 text-left font-bold text-slate-500">Feature</div>
                                <div className="col-span-1 text-center font-bold text-slate-500">Spreadsheets</div>
                                <div className="col-span-1 text-center font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 rounded-t-lg -mb-4 pt-1">PriceM8</div>
                            </div>
                            {[
                                { feature: "Live Material Prices", old: false, new: true },
                                { feature: "Automatic VAT & Profit", old: "Manual Formulas", new: true },
                                { feature: "Professional PDF Export", old: false, new: true },
                                { feature: "Mobile Friendly", old: false, new: true },
                                { feature: "Client Portal", old: false, new: true },
                            ].map((row, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`grid grid-cols-3 p-4 items-center ${i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50 dark:bg-slate-900/50'}`}
                                >
                                    <div className="col-span-1 text-left font-medium text-slate-700 dark:text-slate-300 text-sm md:text-base">{row.feature}</div>
                                    <div className="col-span-1 flex justify-center text-slate-400">
                                        {row.old === false ? <X className="w-6 h-6 text-red-400" /> : <span className="text-sm">{row.old}</span>}
                                    </div>
                                    <div className="col-span-1 flex justify-center text-teal-600 bg-teal-50/30 dark:bg-teal-900/10 -mx-4 py-2">
                                        <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center">
                                            <Check className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </FadeInSection>
                </div>
            </div>

            {/* FREE ADD-ONS SECTION */}
            <div className="py-24 bg-gradient-to-b from-teal-50/50 via-white to-white dark:from-slate-900/50 dark:via-slate-900 dark:to-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <FadeInSection delay={0.1}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg shadow-teal-500/30">
                                <Sparkles className="w-4 h-4" />
                                Limited Time Offer
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.2}>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                Get These Premium Add-Ons <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">FREE</span>
                            </h2>
                        </FadeInSection>
                        <FadeInSection delay={0.3}>
                            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
                                For a limited time, we're including these powerful features at no extra cost. Start your trial now to lock them in forever.
                            </p>
                        </FadeInSection>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {[
                            {
                                icon: Shield,
                                name: "Ultimate Profit Protector",
                                worth: "£29",
                                problem: "Losing profit on jobs you thought were winners",
                                solution: "Never quote a losing job again. Instant alerts flag low-margin quotes before you send them, protecting your profit on every job.",
                                outcome: "Stop working for wages. Start pricing for profit. See exactly which quotes are winners and which will cost you money.",
                                features: [
                                    "Instant profit margin alerts on every quote",
                                    "Flags jobs below your minimum margin threshold",
                                    "Real-time profit risk scoring",
                                    "Protects you from underpricing mistakes"
                                ]
                            },
                            {
                                icon: Calendar,
                                name: "Never-Fail Scheduler",
                                worth: "£12/month",
                                problem: "Jobs overrunning and throwing your whole schedule off",
                                solution: "Rapid schedule recovery that automatically shifts remaining work when jobs overrun. Your schedule adapts instantly, so you never miss deadlines.",
                                outcome: "Never lose a client because of scheduling conflicts. Keep your calendar accurate and your reputation intact, even when jobs take longer than expected.",
                                features: [
                                    "Automatic schedule adjustment when jobs overrun",
                                    "Shifts remaining work instantly",
                                    "Prevents double-booking disasters",
                                    "Keeps your calendar accurate in real-time"
                                ]
                            },
                            {
                                icon: RefreshCw,
                                name: "Instant Price Sync",
                                worth: "£10/month",
                                problem: "Material prices changing weekly and your quotes using outdated costs",
                                solution: "Live material price updates from UK suppliers. Your quotes always use current prices, so you never lose profit to price increases.",
                                outcome: "Quote with confidence knowing your prices are always current. Win more jobs with accurate pricing, and protect your margins from material cost spikes.",
                                features: [
                                    "Weekly price updates from real UK suppliers",
                                    "Automatic quote price adjustments",
                                    "Protects margins from material cost increases",
                                    "No manual price checking needed"
                                ]
                            }
                        ].map((addon, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="relative h-full rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl border-2 border-teal-200 dark:border-teal-500/30 hover:border-teal-400 dark:hover:border-teal-400 transition-all duration-300"
                            >
                                {/* Value Badge - Prominent */}
                                <div className="mb-6 pb-6 border-b-2 border-teal-200 dark:border-teal-500/30">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                                            <addon.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                                                Worth
                                            </div>
                                            <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                                                {addon.worth}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                        {addon.name}
                                    </h3>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full text-sm font-bold shadow-lg">
                                        <span>FREE</span>
                                        <span className="text-xs opacity-90">Included</span>
                                    </div>
                                </div>

                                {/* Problem */}
                                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                    <p className="text-sm font-medium text-red-700 dark:text-red-300">
                                        <span className="font-bold">Problem:</span> {addon.problem}
                                    </p>
                                </div>

                                {/* Solution */}
                                <div className="mb-4">
                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                        <span className="font-bold text-teal-600 dark:text-teal-400">Solution:</span>{' '}
                                        {addon.solution}
                                    </p>
                                </div>

                                {/* Outcome */}
                                <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-lg border border-teal-200 dark:border-teal-500/30">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                        <span className="text-teal-600 dark:text-teal-400">✓ Result:</span> {addon.outcome}
                                    </p>
                                </div>

                                {/* Features */}
                                <ul className="space-y-2">
                                    {addon.features.map((feature, fi) => (
                                        <li key={fi} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                            <span className="text-teal-500 mt-1 flex-shrink-0">✓</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <a
                            href="https://app.pricem8.uk/signup"
                            onClick={trackFreeTrialConversion}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-full font-bold text-lg shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/40 transition-all duration-200"
                        >
                            Start Free Trial & Lock In These Add-Ons
                            <ArrowRight className="w-5 h-5" />
                        </a>
                        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Available for new users who start their trial now. These add-ons will be included in your subscription at no extra cost.
                        </p>
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="py-24 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <FadeInSection delay={0.1}>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Pricing jobs shouldn't take all night</h2>
                        </FadeInSection>
                        <FadeInSection delay={0.2}>
                            <p className="text-xl text-slate-600 dark:text-slate-400">Three simple steps to your first professional quote.</p>
                        </FadeInSection>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Wrench, title: "1. Select Trade Pack", desc: "Choose from pre-loaded packs for Plumbing, Electrical, Building, or Landscaping." },
                            { icon: FileText, title: "2. Enter Dimensions", desc: "Input lengths or quantities. We calculate the materials, waste, and labour for you." },
                            { icon: Smartphone, title: "3. Send Quote", desc: "Review the profit margin and send a branded PDF directly to your client." }
                        ].map((step, i) => (
                            <FadeInSection key={i} delay={0.3 + i * 0.1}>
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:shadow-md transition-all"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-slate-200 select-none group-hover:scale-110 transition-transform">{i + 1}</div>
                                    <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-xl flex items-center justify-center mb-6 relative z-10">
                                        <step.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 relative z-10">{step.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">{step.desc}</p>
                                </motion.div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </div>

            {/* TARGETED SOLUTIONS GRID */}
            <div className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4">
                    <FadeInSection delay={0.1}>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Built for your trade</h2>
                        </div>
                    </FadeInSection>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: "Plumbers", color: "bg-blue-50 text-blue-700" },
                            { name: "Electricians", color: "bg-yellow-50 text-yellow-700" },
                            { name: "Landscapers", color: "bg-green-50 text-green-700" },
                            { name: "Builders", color: "bg-orange-50 text-orange-700" }
                        ].map((trade, index) => (
                            <FadeInSection key={trade.name} delay={0.2 + index * 0.1}>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -4 }}
                                    className={`${trade.color} dark:bg-opacity-10 p-6 rounded-xl text-center font-bold text-lg border border-transparent dark:border-white/10`}
                                >
                                    {trade.name}
                                </motion.div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </div>

            {/* SOLUTION */}
            <div className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-teal-600/10 z-0"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <img src="/images/paving-estimate.png" alt="PriceM8 Interface" className="rounded-xl shadow-2xl border border-white/10" />
                        </div>
                        <div className="order-1 md:order-2">
                            <FadeInSection delay={0.1}>
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                    Accurate Quotes.<br />
                                    <span className="text-teal-400">Guaranteed.</span>
                                </h2>
                            </FadeInSection>
                            <FadeInSection delay={0.2}>
                                <p className="text-lg text-slate-300 mb-8">
                                    PriceM8 is built on "Deterministic Data". That means we calculate exactly what you need based on up-to-date merchant prices.
                                </p>
                            </FadeInSection>
                            <ul className="space-y-4 mb-10">
                                {[
                                    'Live connection to major UK merchants',
                                    'Automatic waste & sundries calculation',
                                    'Pre-built packs for Plumbing, Electrical, Building & more',
                                    'Send quotes via email, WhatsApp or PDF'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center mt-0.5">
                                            <Check className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <span className="ml-3 text-slate-200">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="https://app.pricem8.uk/signup"
                                onClick={trackFreeTrialConversion}
                                className="inline-block bg-teal-500 hover:bg-teal-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-teal-500/30"
                            >
                                Get Started For Free
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* PRICING SECTION */}
            <div className="py-24 bg-gradient-to-b from-white via-teal-50/30 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <FadeInSection delay={0.1}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg shadow-teal-500/30">
                                <Sparkles className="w-4 h-4" />
                                PRE-SEASON OFFER
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.2}>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                Get 30% OFF
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600"> All Plans</span>
                            </h2>
                        </FadeInSection>
                        <FadeInSection delay={0.3}>
                            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
                                Lock in early-bird pricing. All prices shown are already discounted by 30%.
                            </p>
                        </FadeInSection>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {/* Core */}
                        <FadeInSection delay={0.2}>
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="relative h-full rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl border border-slate-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-500 transition-all"
                            >
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">PriceM8 Core</h3>
                                <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">30% OFF</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-bold text-teal-600 dark:text-teal-400">£19</span>
                                        <span className="text-slate-600 dark:text-slate-400 font-semibold">/month</span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">£228/year</p>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                                        <span>Quote & job management</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                                        <span>Smart scheduling</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                                        <span>Client portal</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                                        <span>Branded PDF quotes</span>
                                    </li>
                                </ul>
                            </motion.div>
                        </FadeInSection>

                        {/* Estimating Packs */}
                        <FadeInSection delay={0.3}>
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="relative h-full rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl border border-slate-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-500 transition-all"
                            >
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Estimating Packs</h3>
                                <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">30% OFF</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-bold text-teal-600 dark:text-teal-400">£7–£12</span>
                                        <span className="text-slate-600 dark:text-slate-400 font-semibold">/month</span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">£84–£144/year each</p>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                                        <span>Building (1st & 2nd Fix)</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                                        <span>Plumbing</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                                        <span>Electrical</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                                        <span>Landscaping</span>
                                    </li>
                                </ul>
                            </motion.div>
                        </FadeInSection>

                        {/* All-In Plan */}
                        <FadeInSection delay={0.4}>
                            <motion.div
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="relative h-full rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl border-2 border-teal-500/50 hover:border-teal-400 transition-all ring-1 ring-teal-500/30 dark:from-slate-800 dark:to-slate-900"
                            >
                                <div className="absolute top-6 right-6">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full text-xs font-bold shadow-lg">
                                        Best Value
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Builder All-In</h3>
                                <div className="mb-6 pb-6 border-b border-slate-700">
                                    <p className="text-xs font-semibold text-teal-300 uppercase tracking-wide mb-2">30% OFF</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-bold text-teal-400">£25</span>
                                        <span className="text-teal-200 font-semibold">/month</span>
                                    </div>
                                    <p className="text-sm text-teal-100/80 mt-2">£300/year</p>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-sm text-teal-100">
                                        <Check className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                                        <span>Core + All Packs</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-teal-100">
                                        <Check className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                                        <span>1st + 2nd Fix</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-teal-100">
                                        <Check className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                                        <span>Plumbing & Electrical</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-teal-100">
                                        <Check className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                                        <span>Landscaping included</span>
                                    </li>
                                </ul>
                            </motion.div>
                        </FadeInSection>
                    </div>

                    {/* Specialist Add-on */}
                    <FadeInSection delay={0.5}>
                        <div className="max-w-2xl mx-auto mb-12">
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl border border-slate-200 dark:border-slate-700 text-center"
                            >
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Garden Rooms Estimator</h3>
                                <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">30% OFF</p>
                                    <div className="text-5xl font-bold text-teal-600 dark:text-teal-400 mb-2">£99</div>
                                    <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm">One-time payment</p>
                                </div>
                                <p className="text-slate-700 dark:text-slate-300">Professional garden room system for £12k–£60k projects</p>
                            </motion.div>
                        </div>
                    </FadeInSection>

                    {/* CTA */}
                    <FadeInSection delay={0.6}>
                        <div className="text-center">
                            <a
                                href="https://app.pricem8.uk/signup"
                                onClick={trackFreeTrialConversion}
                                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-full font-bold text-lg shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/40 transition-all duration-200"
                            >
                                Claim 30% Discount Now
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
                                ⏰ Limited time offer – Annual plans locked in at 30% discount
                            </p>
                        </div>
                    </FadeInSection>
                </div>
            </div>

            {/* VIDEO DEMO */}
            <div className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-5xl mx-auto px-4">
                    <FadeInSection delay={0.1}>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                See PriceM8 in action
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                                Watch how easy it is to create accurate quotes in minutes
                            </p>
                        </div>
                    </FadeInSection>
                    <VideoSection section={{ id: 'video-demo', type: 'video', videoSrc: '/Video/patio_quote.mp4', title: 'See PriceM8 in action', subtitle: 'Watch how easy it is to create accurate quotes in minutes' } as any} />
                </div>
            </div>

            {/* TESTIMONIALS */}
            <div className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Trusted by the best.</h2>
                        <div className="flex justify-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">Rated 5/5 by UK Tradespeople</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { quote: "I used to spend Sunday evenings on quotes. Now I can price jobs during the week and send professional PDFs in minutes.", name: "Jason", role: "Landscaper" },
                            { quote: "Knowing materials are kept up to date in the background is huge. I don't have to wonder if my spreadsheet is months out of date.", name: "Amir", role: "Plumber" },
                            { quote: "The trade packs make it really easy to keep our small team quoting in the same way on every job.", name: "Laura", role: "Building company owner" }
                        ].map((t, i) => (
                            <div key={i} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 relative">
                                <div className="absolute top-6 left-6 opacity-20">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-teal-600">
                                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                                    </svg>
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 mb-6 relative z-10 italic">"{t.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center font-bold text-teal-700 dark:text-teal-400">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white">{t.name}</div>
                                        <div className="text-sm text-slate-500">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
                    <div className="space-y-2">
                        <FAQItem
                            question="Is it easy to use?"
                            answer="Yes. We built PriceM8 specifically for people who hate computers. If you can use Facebook, you can use this."
                        />
                        <FAQItem
                            question="Does it work on my phone?"
                            answer="Absolutely. It works on iPhone, Android, iPad, and Laptop. Your data syncs instantly across all of them."
                        />
                        <FAQItem
                            question="Is there a contract?"
                            answer="No. You can cancel anytime. There's a free trial to start, then it's a simple monthly subscription."
                        />
                        <FAQItem
                            question="What trades is this for?"
                            answer="We have specific packs for General Builders, Plumbers, Electricians, Landscapers, Roofers, and more. You choose your trade when you sign up."
                        />
                    </div>
                </div>
            </div>

            {/* FINAL CTA */}
            <div className="py-24 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <FadeInSection delay={0.1}>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-slate-900 dark:text-white">
                            Ready to win more work?
                        </h2>
                    </FadeInSection>
                    <FadeInSection delay={0.2}>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
                            Join 1,000+ UK tradespeople who are quoting faster and winning more profitable jobs with PriceM8.
                        </p>
                    </FadeInSection>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://app.pricem8.uk/signup"
                            onClick={trackFreeTrialConversion}
                            className="inline-flex justify-center items-center px-10 py-5 text-lg font-bold rounded-xl text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-xl hover:shadow-2xl hover:shadow-teal-500/20"
                        >
                            Start Free Trial Now
                        </a>
                    </div>
                    <p className="mt-4 text-sm text-slate-500">No credit card required • Cancel anytime</p>
                </div>
            </div>

            <Footer section={footerSection} />

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 md:hidden z-50">
                <a
                    href="https://app.pricem8.uk/signup"
                    onClick={trackFreeTrialConversion}
                    className="flex w-full justify-center items-center px-6 py-3.5 text-base font-bold rounded-lg text-white bg-teal-600 hover:bg-teal-700 shadow-lg"
                >
                    Start Free Trial
                </a>
            </div>

            {/* Spacer for sticky CTA on mobile */}
            <div className="h-20 md:hidden"></div>
        </div>
    )
}
