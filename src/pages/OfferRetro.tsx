import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import FadeInSection from '../components/FadeInSection'
import { Check, ArrowRight, Zap, ChevronDown, ChevronUp, Star, X, Wrench, FileText, Smartphone, ShieldCheck, Shield, Calendar, RefreshCw, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import AnimatedCounter from '../components/AnimatedCounter'
import homePageSpec from '../data/pageSpec.json'

const footerSection = (homePageSpec as any).sections.find((s: any) => s.type === 'footer')

const trackConversion = (label: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-CONVERSION_ID/LABEL',
            'event_category': 'signup',
            'event_label': label
        })
            ; (window as any).gtag('event', 'sign_up', {
                method: 'landing_page'
            })
    }
}

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="border-b-2 border-stone-800">
            <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none bg-[#FDFBF7] hover:bg-stone-100 transition-colors px-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-xl font-retro font-bold text-stone-900">{question}</span>
                {isOpen ?
                    <ChevronUp className="w-6 h-6 text-stone-900 border-2 border-stone-900 rounded-none bg-yellow-400" /> :
                    <ChevronDown className="w-6 h-6 text-stone-900 border-2 border-stone-900 rounded-none" />
                }
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-[#FDFBF7] border-stone-800"
            >
                <p className="px-4 pb-6 text-stone-700 font-mono text-sm leading-relaxed max-w-2xl">
                    {answer}
                </p>
            </motion.div>
        </div>
    )
}

export default function OfferRetro() {
    const [shouldAnimate, setShouldAnimate] = useState(false)
    const widgetRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.title = "Create Accurate Quotes in Minutes - PriceM8 (Retro)"
        window.scrollTo(0, 0)

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
        <div className="min-h-screen bg-[#FDFBF7] font-retro text-stone-900 selection:bg-yellow-200 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
            {/* RETRO NAVBAR */}
            <nav className="fixed top-0 w-full bg-[#FDFBF7] border-b-2 border-stone-900 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <Link to="/" className="text-3xl font-black tracking-tighter text-stone-900 font-retro uppercase border-2 border-transparent hover:border-b-stone-900 transition-all">
                            Price<span className="text-teal-700 italic">M8</span>
                        </Link>
                        <a
                            href="https://app.pricem8.uk/signup"
                            onClick={() => trackConversion('nav_cta')}
                            className="bg-stone-900 text-white px-6 py-3 font-bold text-sm uppercase tracking-wider border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                            Start Free Trial
                        </a>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden border-b-2 border-stone-900">
                {/* Decorative Grid Background */}
                <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="text-center lg:text-left">
                            <FadeInSection delay={0.1}>
                                <div className="inline-flex items-center px-4 py-2 text-sm font-bold text-stone-900 bg-yellow-400 border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 transform -rotate-1">
                                    <Check className="w-5 h-5 mr-2 stroke-[3]" /> Live Material Prices Included
                                </div>
                            </FadeInSection>
                            <FadeInSection delay={0.2}>
                                <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-8 leading-[0.9] text-stone-900 font-retro">
                                    The Only <br />
                                    <span className="italic text-teal-700 bg-teal-100 px-2 lg:-ml-2 inline-block transform rotate-1 border-2 border-stone-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]">Quoting App</span><br />
                                    Powered by <span className="underline decoration-4 decoration-yellow-400 underline-offset-4">Real Data.</span>
                                </h1>
                            </FadeInSection>
                            <FadeInSection delay={0.3}>
                                <p className="mt-8 text-xl sm:text-2xl text-stone-700 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium border-l-4 border-yellow-400 pl-6">
                                    Don't just write quotes—calculate them. PriceM8 connects to live merchant prices so you can build accurate estimates in minutes.
                                </p>
                            </FadeInSection>

                            <FadeInSection delay={0.4}>
                                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
                                    <motion.a
                                        href="https://app.pricem8.uk/signup"
                                        onClick={() => trackConversion('hero_cta')}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="inline-flex justify-center items-center px-8 py-4 border-2 border-stone-900 text-lg font-bold text-white bg-teal-700 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-wide group"
                                    >
                                        Start Free Trial <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </motion.a>
                                    <div className="flex items-center justify-center px-6 py-4 text-stone-600 font-bold border-2 border-stone-200 bg-white shadow-[4px_4px_0px_0px_rgba(200,200,200,0.5)]">
                                        <ShieldCheck className="w-5 h-5 mr-2 text-stone-900" /> No credit card required
                                    </div>
                                </div>
                            </FadeInSection>

                            <FadeInSection delay={0.5}>
                                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm font-mono text-stone-500">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="w-10 h-10 rounded-none border-2 border-stone-900 bg-sky-100 flex items-center justify-center overflow-hidden hover:-translate-y-1 transition-transform bg-white"
                                            >
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} alt="User" />
                                            </div>
                                        ))}
                                        <div className="w-10 h-10 bg-yellow-400 border-2 border-stone-900 flex items-center justify-center text-xs font-bold text-stone-900 z-10">
                                            +2k
                                        </div>
                                    </div>
                                    <div className="font-bold text-stone-900 uppercase tracking-tight">Trusted by 1,000+ UK Tradespeople</div>
                                </div>
                            </FadeInSection>
                        </div>

                        <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="relative bg-white border-4 border-stone-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] aspect-[4/3] group overflow-hidden">
                                <div className="absolute inset-0 bg-stone-100 p-2 opacity-50 bg-[size:20px_20px] bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]"></div>
                                {/* Abstract UI Representation */}
                                <div className="absolute inset-4 border-2 border-stone-200 bg-white">
                                    <img src="/hero-dashboard-preview.png" alt="Dashboard Preview" className="w-full h-full object-cover object-top grayscale contrast-125 opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
                                </div>

                                <div ref={widgetRef} className="absolute inset-0 z-20 flex flex-col justify-center items-center p-8 text-center">
                                    <div className="bg-white p-6 border-4 border-stone-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full transform transition-all duration-300 group-hover:-translate-y-2">
                                        <div className="flex items-center justify-between mb-4 border-b-2 border-stone-900 pb-4">
                                            <span className="text-stone-900 font-mono font-bold text-sm">QUOTE #1024</span>
                                            <span className="bg-green-100 text-green-800 border-2 border-green-800 text-xs font-black px-2 py-0.5 uppercase">Profitable</span>
                                        </div>
                                        <div className="space-y-3 font-mono">
                                            <div className="flex justify-between items-center text-stone-600">
                                                <span>Materials</span>
                                                <span className="font-bold text-stone-900">
                                                    {shouldAnimate ? (
                                                        <AnimatedCounter value={2450.00} prefix="£" className="text-stone-900" />
                                                    ) : (
                                                        <span>£0.00</span>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-stone-600">
                                                <span>Labour (Est.)</span>
                                                <span className="font-bold text-stone-900">
                                                    {shouldAnimate ? (
                                                        <AnimatedCounter value={1200.00} prefix="£" className="text-stone-900" />
                                                    ) : (
                                                        <span>£0.00</span>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="h-0.5 bg-stone-900 my-2 border-t border-dashed border-stone-400"></div>
                                            <div className="flex justify-between items-center text-stone-900 text-xl font-black bg-yellow-100 p-2 -mx-2 border-2 border-transparent">
                                                <span>TOTAL</span>
                                                <span>
                                                    {shouldAnimate ? (
                                                        <AnimatedCounter value={3650.00} prefix="£" className="text-stone-900" />
                                                    ) : (
                                                        <span className="text-stone-900">£0.00</span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-6 text-stone-500 text-xs font-mono bg-white px-2 border border-stone-200">
                                        <Zap className="inline w-3 h-3 text-yellow-500 fill-current mr-1" />
                                        UPDATED FROM LIVE API
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PROBLEM / AGITATION */}
            <div className="py-24 bg-[#F5F2EA]/90 border-b-2 border-stone-900">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <FadeInSection delay={0.1}>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 text-stone-900 font-retro leading-none">
                            Are you still <span className="relative inline-block px-2"><span className="absolute inset-0 bg-red-500 transform -skew-x-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></span><span className="relative text-white">guessing</span></span> prices?
                        </h2>
                    </FadeInSection>
                    <FadeInSection delay={0.2}>
                        <p className="text-xl text-stone-700 mb-16 font-medium max-w-2xl mx-auto leading-relaxed">
                            Material prices change every week. If you're using a spreadsheet from last year (or just guessing in your head), you're paying for your customer's renovation out of your own pocket.
                        </p>
                    </FadeInSection>

                    {/* COMPARISON TABLE - RETRO STYLE */}
                    <FadeInSection delay={0.3}>
                        <div className="mt-8 border-4 border-stone-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-white">
                            <div className="grid grid-cols-3 bg-stone-900 text-white border-b-4 border-stone-900 p-5">
                                <div className="col-span-1 text-left font-black font-mono tracking-wider">FEATURE</div>
                                <div className="col-span-1 text-center font-black font-mono tracking-wider opacity-60">OLD WAY</div>
                                <div className="col-span-1 text-center font-black font-mono tracking-wider text-yellow-400">PRICEM8</div>
                            </div>
                            {[
                                { feature: "Live Material Prices", old: false, new: true },
                                { feature: "Automatic VAT & Profit", old: "Manual Formulas", new: true },
                                { feature: "Professional PDF Export", old: false, new: true },
                                { feature: "Mobile Friendly", old: false, new: true },
                            ].map((row, i) => (
                                <div
                                    key={i}
                                    className={`grid grid-cols-3 p-5 items-center border-b-2 border-stone-200 last:border-0 hover:bg-yellow-50 transition-colors cursor-default group`}
                                >
                                    <div className="col-span-1 text-left font-bold text-stone-800 text-sm md:text-lg group-hover:translate-x-1 transition-transform">{row.feature}</div>
                                    <div className="col-span-1 flex justify-center text-stone-400 font-mono text-sm">
                                        {row.old === false ? <X className="w-8 h-8 text-stone-300 stroke-[3]" /> : <span className="line-through decoration-2 decoration-red-400">{row.old}</span>}
                                    </div>
                                    <div className="col-span-1 flex justify-center -mx-4 py-2">
                                        <div className="w-10 h-10 border-2 border-stone-900 bg-teal-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                                            <Check className="w-6 h-6 text-white stroke-[4]" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeInSection>
                </div>
            </div>

            {/* FREE ADD-ONS SECTION */}
            <div className="py-24 bg-teal-700 relative overflow-hidden text-white border-b-2 border-stone-900">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <FadeInSection delay={0.1}>
                            <div className="inline-flex items-center gap-2 px-5 py-2 bg-yellow-400 text-stone-900 border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-black uppercase tracking-widest mb-8">
                                <Sparkles className="w-4 h-4" />
                                Limited Time Offer
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.2}>
                            <h2 className="text-4xl sm:text-6xl font-black mb-8 font-retro leading-tight">
                                Get Premium Add-Ons <br />
                                <span className="bg-white text-stone-900 px-3 inline-block transform -rotate-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mt-2">FOR FREE</span>
                            </h2>
                        </FadeInSection>
                        <FadeInSection delay={0.3}>
                            <p className="text-xl text-teal-100 leading-relaxed max-w-3xl mx-auto font-medium">
                                Start your trial now to lock them in forever. No extra cost.
                            </p>
                        </FadeInSection>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                icon: Shield,
                                name: "Profit Protector",
                                worth: "£29",
                                problem: "Losing profit on winners",
                                solution: "Instant alerts flag low-margin quotes before you send them.",
                            },
                            {
                                icon: Calendar,
                                name: "Fail-Safe Scheduler",
                                worth: "£12/mo",
                                problem: "Jobs overrunning",
                                solution: "Automatically shifts remaining work when jobs overrun.",
                            },
                            {
                                icon: RefreshCw,
                                name: "Instant Price Sync",
                                worth: "£10/mo",
                                problem: "Outdated costs",
                                solution: "Live material price updates from UK suppliers.",
                            }
                        ].map((addon, index) => (
                            <div
                                key={index}
                                className="relative h-full bg-[#FDFBF7] p-8 border-4 border-stone-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                            >
                                <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 rounded-full border-4 border-stone-900 flex flex-col items-center justify-center transform rotate-12 z-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="text-[10px] font-bold text-stone-900 uppercase">Worth</span>
                                    <span className="text-lg font-black text-stone-900 leading-none">{addon.worth}</span>
                                </div>

                                <div className="mb-6 pb-6 border-b-2 border-stone-200">
                                    <div className="w-16 h-16 bg-stone-900 flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                                        <addon.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-stone-900 mb-2 uppercase tracking-tight">
                                        {addon.name}
                                    </h3>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-200 text-stone-600 font-bold text-xs uppercase">
                                        Included Free
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-sm font-medium text-red-600 border-l-4 border-red-500 pl-3 bg-red-50 py-2 pr-2">
                                        <span className="font-bold text-stone-900 uppercase text-xs block mb-1">Problem</span>
                                        {addon.problem}
                                    </p>
                                    <p className="text-sm font-medium text-stone-700 border-l-4 border-teal-500 pl-3 bg-teal-50/50 py-2 pr-2">
                                        <span className="font-bold text-stone-900 uppercase text-xs block mb-1">Solution</span>
                                        {addon.solution}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <a
                            href="https://app.pricem8.uk/signup"
                            onClick={() => trackConversion('free_addons_cta')}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-stone-900 border-4 border-stone-900 font-black text-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-wide group"
                        >
                            Start Free Trial & Lock In Add-Ons
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="py-24 bg-[#FFFEFA]/90 border-b-2 border-stone-900">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <FadeInSection delay={0.1}>
                            <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-6 font-retro">Pricing jobs shouldn't take all night</h2>
                        </FadeInSection>
                        <FadeInSection delay={0.2}>
                            <p className="text-xl text-stone-600 font-medium">Three simple steps to your first professional quote.</p>
                        </FadeInSection>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Wrench, title: "1. Select Trade Pack", desc: "Choose from pre-loaded packs for Plumbing, Electrical, Building, or Landscaping." },
                            { icon: FileText, title: "2. Enter Dimensions", desc: "Input lengths or quantities. We calculate the materials, waste, and labour for you." },
                            { icon: Smartphone, title: "3. Send Quote", desc: "Review the profit margin and send a branded PDF directly to your client." }
                        ].map((step, i) => (
                            <FadeInSection key={i} delay={0.3 + i * 0.1}>
                                <div className="bg-white p-8 border-2 border-stone-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:-translate-y-1 transition-transform">
                                    <div className="w-14 h-14 bg-yellow-400 border-2 border-stone-900 text-stone-900 flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                        <step.icon className="w-7 h-7 stroke-[2.5]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-3 font-retro">{step.title}</h3>
                                    <p className="text-stone-600 leading-relaxed font-medium">{step.desc}</p>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </div>

            {/* PRICING SECTION */}
            <div className="py-24 bg-white border-b-2 border-stone-900">
                <div className="max-w-7xl mx-auto px-4">
                    <FadeInSection delay={0.1}>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2 bg-yellow-400 text-stone-900 border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-black uppercase tracking-widest mb-8">
                                <Sparkles className="w-4 h-4" />
                                PRE-SEASON OFFER
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black mb-6 font-retro text-stone-900">
                                30% OFF
                                <br />
                                All Plans
                            </h2>
                            <p className="text-xl text-stone-700 mb-4 font-medium max-w-2xl mx-auto">
                                Introductory pricing for early users. All prices shown are already discounted.
                            </p>
                        </div>
                    </FadeInSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* Core */}
                        <FadeInSection delay={0.2}>
                            <div className="bg-white border-4 border-stone-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
                                <h3 className="text-2xl font-black text-stone-900 mb-2 font-retro">PriceM8 Core</h3>
                                <div className="mb-6 pb-6 border-b-2 border-stone-200">
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-1">Annual billing (30% off)</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-4xl font-black text-stone-900">£19</span>
                                                <span className="text-stone-600 font-bold">/month</span>
                                            </div>
                                            <p className="text-xs text-stone-500 mt-1">£228/year</p>
                                        </div>
                                        <div className="pt-2 border-t border-stone-200">
                                            <p className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-1">Monthly billing</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-black text-stone-900">£22.80</span>
                                                <span className="text-stone-600 font-bold">/month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul className="space-y-3 text-sm text-stone-700 font-medium">
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-stone-900 flex-shrink-0 mt-0.5 stroke-[3]" />
                                        <span>Quote & job management</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-stone-900 flex-shrink-0 mt-0.5 stroke-[3]" />
                                        <span>Smart scheduling</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-stone-900 flex-shrink-0 mt-0.5 stroke-[3]" />
                                        <span>Client portal</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-stone-900 flex-shrink-0 mt-0.5 stroke-[3]" />
                                        <span>Branded PDF quotes</span>
                                    </li>
                                </ul>
                            </div>
                        </FadeInSection>

                        {/* Estimating Packs */}
                        <FadeInSection delay={0.3}>
                            <div className="bg-white border-4 border-stone-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
                                <h3 className="text-2xl font-black text-stone-900 mb-2 font-retro">Estimating Packs</h3>
                                <div className="mb-6 pb-6 border-b-2 border-stone-200">
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-1">Annual billing (30% off)</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-4xl font-black text-stone-900">£7–£12</span>
                                                <span className="text-stone-600 font-bold">/month</span>
                                            </div>
                                            <p className="text-xs text-stone-500 mt-1">£84–£144/year</p>
                                        </div>
                                        <div className="pt-2 border-t border-stone-200">
                                            <p className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-1">Monthly billing</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-black text-stone-900">£8.40–£14.40</span>
                                                <span className="text-stone-600 font-bold">/month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul className="space-y-3 text-sm text-stone-700 font-medium">
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-stone-900 flex-shrink-0 mt-0.5 stroke-[3]" />
                                        <span>Building (1st & 2nd Fix)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-stone-900 flex-shrink-0 mt-0.5 stroke-[3]" />
                                        <span>Plumbing</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-stone-900 flex-shrink-0 mt-0.5 stroke-[3]" />
                                        <span>Electrical</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-stone-900 flex-shrink-0 mt-0.5 stroke-[3]" />
                                        <span>Landscaping</span>
                                    </li>
                                </ul>
                            </div>
                        </FadeInSection>

                        {/* All-In Plan */}
                        <FadeInSection delay={0.4}>
                            <div className="bg-stone-900 border-4 border-stone-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-white hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all ring-4 ring-yellow-400 ring-offset-4">
                                <div className="mb-4 pb-4 border-b-2 border-yellow-400">
                                    <div className="inline-block bg-yellow-400 text-stone-900 px-3 py-1 text-xs font-black uppercase tracking-wider rounded-none border-2 border-stone-900 mb-4">
                                        Best Value
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-yellow-400 mb-2 font-retro">Builder All-In</h3>
                                <div className="mb-6 pb-6 border-b-2 border-stone-700">
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-yellow-300 uppercase font-bold tracking-wider mb-1">Annual billing (30% off)</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-4xl font-black text-white">£25</span>
                                                <span className="text-yellow-200 font-bold">/month</span>
                                            </div>
                                            <p className="text-xs text-yellow-100 mt-1">£300/year</p>
                                        </div>
                                        <div className="pt-2 border-t border-stone-600">
                                            <p className="text-xs text-yellow-300 uppercase font-bold tracking-wider mb-1">Monthly billing</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-black text-white">£30</span>
                                                <span className="text-yellow-200 font-bold">/month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul className="space-y-3 text-sm text-white font-medium">
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5 stroke-[3]" />
                                        <span>Core + All Packs</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5 stroke-[3]" />
                                        <span>1st + 2nd Fix</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5 stroke-[3]" />
                                        <span>Plumbing & Electrical</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5 stroke-[3]" />
                                        <span>Landscaping included</span>
                                    </li>
                                </ul>
                            </div>
                        </FadeInSection>
                    </div>

                    {/* Specialist Add-on */}
                    <FadeInSection delay={0.5}>
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white border-4 border-stone-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
                                <h3 className="text-2xl font-black text-stone-900 mb-4 font-retro">Garden Rooms Estimator</h3>
                                <div className="mb-6 pb-6 border-b-2 border-stone-200">
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-2">Special offer (30% off)</p>
                                            <div className="flex items-baseline justify-center gap-2">
                                                <span className="text-5xl font-black text-stone-900">£99</span>
                                                <span className="text-stone-600 font-bold">one-time</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-stone-500 text-center italic pt-2">Was £141.43 (before discount)</p>
                                    </div>
                                    <p className="text-sm text-stone-600 mt-4">Professional garden room system for £12k–£60k projects</p>
                                </div>
                                <p className="text-stone-700 font-medium">Complete structural breakdown, cladding options, electrical & finishes</p>
                            </div>
                        </div>
                    </FadeInSection>

                    <FadeInSection delay={0.6}>
                        <div className="mt-12 text-center">
                            <p className="text-stone-700 font-medium mb-4">
                                ⏰ <span className="font-black">Limited time offer</span> – Lock in 30% discount on your annual plan
                            </p>
                            <a
                                href="https://app.pricem8.uk/signup"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-teal-600 text-white border-4 border-stone-900 font-black text-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-wide group"
                            >
                                Claim Your Discount Now
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </FadeInSection>
                </div>
            </div>

            {/* TARGETED SOLUTIONS GRID */}
            <div className="py-20 bg-stone-900 text-white border-b-2 border-stone-900">
                <div className="max-w-7xl mx-auto px-4">
                    <FadeInSection delay={0.1}>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-white font-retro uppercase tracking-widest border-b-4 border-yellow-400 inline-block pb-2">Built for your trade</h2>
                        </div>
                    </FadeInSection>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "Plumbers", color: "bg-blue-500" },
                            { name: "Electricians", color: "bg-yellow-400 text-stone-900" },
                            { name: "Landscapers", color: "bg-green-600" },
                            { name: "Builders", color: "bg-orange-600" }
                        ].map((trade, index) => (
                            <FadeInSection key={trade.name} delay={0.2 + index * 0.1}>
                                <motion.div
                                    whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                                    className={`${trade.color} p-8 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.4)] text-center font-black text-xl uppercase tracking-wider`}
                                >
                                    {trade.name}
                                </motion.div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </div>

            {/* SOLUTION */}
            <div className="py-24 bg-[#F5F5F5]/90 border-b-2 border-stone-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 relative">
                            <div className="absolute inset-0 bg-stone-900 transform translate-x-4 translate-y-4"></div>
                            <img src="/images/paving-estimate.png" alt="PriceM8 Interface" className="relative z-10 border-2 border-stone-900 grayscale-[20%] contrast-110" />
                        </div>
                        <div className="order-1 md:order-2">
                            <FadeInSection delay={0.1}>
                                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none font-retro text-stone-900">
                                    Accurate.<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">Guaranteed.</span>
                                </h2>
                            </FadeInSection>
                            <FadeInSection delay={0.2}>
                                <p className="text-xl text-stone-700 mb-10 font-bold max-w-lg border-l-4 border-stone-900 pl-6 py-2">
                                    PriceM8 is built on "Deterministic Data". We calculate exactly what you need based on up-to-date merchant prices.
                                </p>
                            </FadeInSection>
                            <ul className="space-y-4 mb-12">
                                {[
                                    'Live connection to major UK merchants',
                                    'Automatic waste & sundries calculation',
                                    'Pre-built packs for all trades',
                                    'Send quotes via email, WhatsApp or PDF'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-lg font-bold text-stone-800">
                                        <div className="flex-shrink-0 w-8 h-8 bg-black flex items-center justify-center mr-4 shadow-md">
                                            <Check className="w-5 h-5 text-white stroke-[3]" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="https://app.pricem8.uk/signup"
                                onClick={() => trackConversion('features_cta')}
                                className="inline-block bg-yellow-400 text-stone-900 border-2 border-stone-900 font-black py-4 px-10 text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-wider"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* TESTIMONIALS */}
            <div className="py-24 bg-teal-800 text-white border-b-2 border-stone-900">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-6 font-retro">Trusted by the best.</h2>
                        <div className="flex justify-center gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-8 h-8 text-yellow-400 fill-current stroke-stone-900" />
                            ))}
                        </div>
                        <p className="text-teal-200 font-mono uppercase tracking-widest text-sm">Rated 5/5 by UK Tradespeople</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { quote: "I used to spend Sunday evenings on quotes. Now I can price jobs during the week and send professional PDFs in minutes.", name: "Jason", role: "Landscaper" },
                            { quote: "Knowing materials are kept up to date in the background is huge. I don't have to wonder if my spreadsheet is months out of date.", name: "Amir", role: "Plumber" },
                            { quote: "The trade packs make it really easy to keep our small team quoting in the same way on every job.", name: "Laura", role: "Building company owner" }
                        ].map((t, i) => (
                            <div key={i} className="bg-white text-stone-900 p-8 border-4 border-stone-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                                <div className="absolute top-4 right-4 text-6xl font-retro text-stone-200 z-0">"</div>
                                <p className="text-lg font-medium mb-8 relative z-10 italic leading-relaxed">"{t.quote}"</p>
                                <div className="flex items-center gap-4 border-t-2 border-stone-100 pt-6">
                                    <div className="w-12 h-12 bg-stone-900 text-white flex items-center justify-center font-bold text-xl">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <div className="font-black text-lg uppercase">{t.name}</div>
                                        <div className="text-sm font-mono text-stone-500">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="py-24 bg-[#FDFBF7]/50">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-4xl font-black text-center mb-12 text-stone-900 font-retro">Frequently Asked Questions</h2>
                    <div className="border-t-2 border-stone-800">
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
            <div className="py-32 bg-yellow-400 border-t-4 border-stone-900">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <FadeInSection delay={0.1}>
                        <h2 className="text-5xl md:text-8xl font-black mb-10 text-stone-900 uppercase font-retro tracking-tighter leading-[0.85]">
                            Ready to win<br />more work?
                        </h2>
                    </FadeInSection>
                    <FadeInSection delay={0.2}>
                        <p className="text-2xl text-stone-900 mb-12 max-w-2xl mx-auto font-bold">
                            Join 1,000+ UK tradespeople who are quoting faster and winning more profitable jobs.
                        </p>
                    </FadeInSection>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://app.pricem8.uk/signup"
                            onClick={() => trackConversion('bottom_cta')}
                            className="inline-flex justify-center items-center px-12 py-6 text-xl font-black text-white bg-stone-900 border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all uppercase tracking-wider"
                        >
                            Start Free Trial Now
                        </a>
                    </div>
                    <p className="mt-8 text-sm font-mono text-stone-900 font-bold uppercase tracking-widest">No credit card required • Cancel anytime</p>
                </div>
            </div>

            <Footer section={footerSection} />

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t-4 border-stone-900 md:hidden z-50">
                <a
                    href="https://app.pricem8.uk/signup"
                    onClick={() => trackConversion('sticky_mobile_cta')}
                    className="flex w-full justify-center items-center px-6 py-4 text-lg font-black uppercase text-white bg-teal-600 border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                    Start Free Trial
                </a>
            </div>

            <div className="h-20 md:hidden"></div>
        </div>
    )
}
