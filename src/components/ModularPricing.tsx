import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ModularPricingSection as ModularPricingSectionType } from '../types'
import FadeInSection from './FadeInSection'
import { useWaitingList } from '../context/WaitingListContext'
import AnimatedPrice from './AnimatedPrice'
import { trackFreeTrialConversion } from '../utils/tracking'
import {
    Package,
    Wrench,
    Star,
    Flame,
    Home,
    ChevronRight,
    Check,
    ArrowRight
} from 'lucide-react'

interface ModularPricingProps {
    section: ModularPricingSectionType
}

export default function ModularPricing({ section }: ModularPricingProps) {
    const { openWaitlist } = useWaitingList()
    const [isYearly, setIsYearly] = useState(true)

    const isHashLink = (href: string) => href.startsWith('#')
    const isExternalLink = (href: string) => href.startsWith('http') || href.startsWith('//')

    const handleCtaClick = (e: React.MouseEvent, href: string) => {
        if (href === '#waitlist') {
            e.preventDefault()
            openWaitlist()
        } else if (href.includes('/app') || href.includes('pricem8.uk/signup')) {
            // Track free trial conversions
            trackFreeTrialConversion()
        }
    }

    const renderCtaButton = (cta: { label: string, href: string }, className: string, isAllIn: boolean = false) => {
        const motionProps = {
            whileHover: isAllIn ? { scale: 1.05, x: 10 } : { scale: 1.05 },
            whileTap: { scale: 0.95 }
        }

        if (isHashLink(cta.href) || isExternalLink(cta.href)) {
            return (
                <motion.a
                    href={cta.href}
                    onClick={(e) => handleCtaClick(e, cta.href)}
                    {...motionProps}
                    className={className}
                >
                    {cta.label}
                </motion.a>
            )
        }

        return (
            <motion.div {...motionProps} className="w-full md:w-auto">
                <Link
                    to={cta.href}
                    className={className + " block text-center"}
                >
                    {cta.label}
                </Link>
            </motion.div>
        )
    }

    // Helper to get price based on billing period
    // When yearly is selected, show monthly equivalent (yearly/12 rounded up)
    const getPrice = (monthly?: string, yearly?: string, legacy?: string) => {
        if (isYearly && yearly) {
            // Calculate monthly equivalent from yearly, rounded up
            const yearlyNum = parseFloat(yearly.replace(/[£,]/g, ''))
            const monthlyEquivalent = Math.ceil(yearlyNum / 12)
            return `£${monthlyEquivalent}`
        }
        if (!isYearly && monthly) return monthly
        return legacy || monthly || yearly || '£0'
    }

    return (
        <div id={section.id} className="space-y-24 py-12">
            {/* Billing Toggle */}
            <FadeInSection>
                <div className="flex items-center justify-center mb-12">
                    <div className="inline-flex items-center gap-4 p-2 bg-white dark:bg-slate-800 rounded-full border-2 border-gray-200 dark:border-slate-700 shadow-lg">
                        <button
                            onClick={() => setIsYearly(false)}
                            className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
                                !isYearly
                                    ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsYearly(true)}
                            className={`px-6 py-3 rounded-full font-bold text-sm transition-all relative ${
                                isYearly
                                    ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            Yearly
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                Save 17%
                            </span>
                        </button>
                    </div>
                </div>
            </FadeInSection>

            {/* 1. Core Platform */}
            <FadeInSection>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-teal-500 text-white text-[10px]">1</span>
                            Core Platform
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-teal-500/20 dark:border-teal-400/20 shadow-2xl p-8 md:p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg className="w-32 h-32 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>

                        <div className="md:grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-4">
                                    <Package className="w-10 h-10 text-teal-500" />
                                    {section.core.title}
                                </h3>
                                <div className="flex items-baseline gap-2 mb-6">
                                    <AnimatedPrice
                                        value={getPrice(section.core.priceMonthly, section.core.priceYearly, section.core.price)}
                                        className="text-5xl font-bold text-gray-900 dark:text-white"
                                        isYearly={isYearly}
                                    />
                                    <span className="text-xl text-gray-500 dark:text-gray-400 font-medium">
                                        / month
                                    </span>
                                    {isYearly && section.core.priceYearly && (
                                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                            (billed yearly)
                                        </span>
                                    )}
                                </div>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-medium">
                                    {section.core.description}
                                </p>
                                {renderCtaButton(section.core.cta, "w-full md:w-auto px-12 py-5 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-full font-bold text-xl shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/40 transition-all")}
                                {section.core.note && (
                                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-tight italic">{section.core.note}</p>
                                )}
                            </div>

                            <div className="mt-8 md:mt-0 space-y-4">
                                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs mb-6 opacity-60">Includes:</h4>
                                <ul className="space-y-4">
                                    {section.core.features.map((feature, i) => (
                                        <li key={i} className="flex gap-4">
                                            <div className="flex-shrink-0 w-6 h-6 bg-teal-50 dark:bg-teal-500/10 rounded-full flex items-center justify-center text-teal-600 dark:text-teal-400 mt-0.5">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-200 font-bold leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            {/* 2. Estimating Packs */}
            <FadeInSection>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-[10px]">2</span>
                            Estimating Packs
                        </div>
                        <h3 className="text-5xl font-bold mt-8 mb-4 tracking-tight flex items-center justify-center gap-5">
                            <Wrench className="w-12 h-12 text-blue-500" />
                            {section.packs.title}
                        </h3>
                        <p className="text-xl text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto">{section.packs.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {section.packs.items.map((pack, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className={`p-8 rounded-[2.5rem] border-2 transition-all duration-300 flex flex-col ${pack.highlight
                                    ? 'bg-white dark:bg-slate-900 border-teal-500 shadow-2xl shadow-teal-500/10'
                                    : 'bg-white/40 dark:bg-slate-900/40 border-gray-100 dark:border-slate-800 backdrop-blur-sm'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-6 gap-4">
                                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                                        {pack.name}
                                    </h4>
                                    <div className="text-right flex-shrink-0">
                                        <AnimatedPrice
                                            value={getPrice(pack.priceMonthly, pack.priceYearly, pack.price)}
                                            className="text-3xl font-bold text-teal-600 dark:text-teal-400"
                                            isYearly={isYearly}
                                        />
                                        <span className="text-xs font-bold text-gray-500 block uppercase tracking-tighter">
                                            / mo
                                        </span>
                                        {isYearly && pack.priceYearly && (
                                            <span className="text-[10px] text-gray-400 block">
                                                billed yearly
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-full text-xs font-bold text-gray-600 dark:text-gray-400 mb-6 w-fit">
                                    {pack.description}
                                </div>
                                <ul className="space-y-3 flex-grow mb-6">
                                    {pack.features?.map((f, fi) => (
                                        <li key={fi} className="text-sm text-gray-500 dark:text-gray-400 flex gap-3 font-medium">
                                            <ChevronRight className="w-4 h-4 text-teal-500 flex-shrink-0" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                {pack.seeMoreLink && (
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="mt-auto"
                                    >
                                        <Link
                                            to={pack.seeMoreLink}
                                            className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                                        >
                                            See all tasks
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Bundles */}
                    <div className="mt-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[3.5rem] p-1 shadow-2xl shadow-blue-500/20">
                        <div className="bg-white dark:bg-slate-950 rounded-[calc(3.5rem-4px)] p-8 md:p-16 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,theme(colors.blue.500/0.1),transparent)]" />
                            <h4 className="text-3xl font-bold text-center mb-12 relative z-10 flex items-center justify-center gap-3">
                                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                                {section.bundles.title}
                            </h4>
                            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto relative z-10">
                                {section.bundles.items.map((bundle, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-blue-50 dark:bg-blue-900/10 rounded-[2.5rem] p-10 border border-blue-200 dark:border-blue-800 flex flex-col items-center group"
                                    >
                                        <span className="text-xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight">{bundle.name}</span>
                                        <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform flex items-center gap-2">
                                            <ArrowRight className="w-8 h-8" />
                                            <AnimatedPrice
                                                value={getPrice(bundle.priceMonthly, bundle.priceYearly, bundle.price)}
                                                isYearly={isYearly}
                                            />
                                            <span className="text-2xl text-blue-500/70">/mo</span>
                                        </div>
                                        <div className="text-sm font-bold text-blue-500 dark:text-blue-400/60 text-center uppercase tracking-widest bg-blue-100/50 dark:bg-blue-900/30 px-6 py-2 rounded-full">
                                            {bundle.items.join(' + ')}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            {/* 3. All-in Plan */}
            <FadeInSection>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white text-[10px]">3</span>
                            All-in Plan
                        </div>
                    </div>

                    <div className="relative p-1.5 rounded-[4rem] bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 shadow-3xl shadow-red-500/30">
                        <div className="bg-white dark:bg-slate-950 rounded-[calc(4rem-6px)] p-8 md:p-20 overflow-hidden relative">
                            {section.allIn.badge && (
                                <div className="absolute top-0 right-12 py-3 px-10 bg-red-600 text-white font-bold text-sm rounded-b-3xl uppercase tracking-[0.2em] shadow-lg animate-bounce">
                                    {section.allIn.badge}
                                </div>
                            )}

                            <div className="md:grid md:grid-cols-2 gap-16 items-center relative z-10">
                                <div>
                                    <h3 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight flex items-center gap-5">
                                        <Flame className="w-14 h-14 text-red-500 fill-red-500" />
                                        {section.allIn.title}
                                    </h3>
                                    <div className="flex items-baseline gap-3 mb-10">
                                        <AnimatedPrice
                                            value={getPrice(section.allIn.priceMonthly, section.allIn.priceYearly, section.allIn.price)}
                                            className="text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white tracking-tighter"
                                            isYearly={isYearly}
                                        />
                                        <span className="text-3xl text-gray-500 dark:text-gray-400 font-bold">
                                            / month
                                        </span>
                                        {isYearly && section.allIn.priceYearly && (
                                            <span className="text-lg text-gray-500 dark:text-gray-400 ml-2">
                                                (billed yearly)
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                                        {section.allIn.description}
                                    </p>
                                    {renderCtaButton(section.allIn.cta, "w-full px-12 py-6 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white rounded-full font-bold text-2xl shadow-2xl shadow-red-500/50", true)}
                                </div>

                                <div className="mt-16 md:mt-0 p-10 bg-gray-50 dark:bg-slate-900/80 rounded-[3rem] border-2 border-orange-500/10 backdrop-blur-xl">
                                    <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-widest text-sm mb-10 opacity-70 border-b-2 border-orange-500/20 pb-4">Full Power Included:</h4>
                                    <ul className="grid grid-cols-1 gap-6">
                                        {section.allIn.features.map((feature, i) => (
                                            <li key={i} className="flex gap-4">
                                                <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-800 dark:text-gray-100 font-bold text-lg">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeInSection>

            {/* 4. Specialist Add-on */}
            <FadeInSection>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-widest mb-4">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-[10px]">4</span>
                            Specialist Add-on
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-teal-600 p-1 rounded-[4rem] shadow-2xl shadow-green-500/20">
                        <div className="bg-white dark:bg-slate-950 rounded-[calc(4rem-4px)] p-8 md:p-20 flex flex-col md:flex-row gap-16 items-center relative overflow-hidden">
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
                            <div className="flex-1 relative z-10">
                                <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-5">
                                    <Home className="w-14 h-14 text-green-500" />
                                    {section.specialist.title}
                                </h3>
                                <div className="flex items-baseline gap-3 mb-8">
                                    <span className="text-6xl font-bold text-green-600 dark:text-green-400">{section.specialist.price}</span>
                                    <span className="text-2xl text-gray-500 font-bold tracking-tight">ONE-TIME</span>
                                </div>
                                <p
                                    className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 leading-tight"
                                    dangerouslySetInnerHTML={{ __html: section.specialist.description }}
                                />
                                {section.specialist.note && (
                                    <div className="inline-block px-10 py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-bold text-sm uppercase tracking-[0.3em] rounded-full border border-green-200 dark:border-green-800">
                                        {section.specialist.note}
                                    </div>
                                )}
                            </div>

                            <div className="w-full md:w-[350px] relative z-10">
                                <div className="p-8 bg-green-50/50 dark:bg-green-900/10 rounded-[2.5rem] border border-green-200 dark:border-green-800">
                                    <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-green-600 dark:text-green-400 mb-8 pb-4 border-b border-green-200 dark:border-green-800">Deep Pricing Intel:</h4>
                                    <ul className="space-y-6">
                                        {section.specialist.features.map((feature, i) => (
                                            <li key={i} className="flex gap-4 text-lg font-bold text-gray-700 dark:text-gray-200">
                                                <Check className="w-6 h-6 text-green-600 flex-shrink-0" /> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeInSection>
        </div>
    )
}
