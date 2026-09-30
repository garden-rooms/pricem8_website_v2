import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import founderImage from "../founder.jpeg";
import {
    Clock,
    TrendingDown,
    FileX,
    Calculator,
    FileText,
    Package,
    PoundSterling,
    ChevronDown,
    ChevronUp,
    ClipboardList,
    MousePointerClick,
    Send,
    BedDouble,
    BookOpen,
    Heart,
    BanknoteIcon,
    Gift,
    CheckCircle2,
    Zap,
    ShieldCheck,
} from "lucide-react";
import Footer from "../components/Footer";
import homePageSpec from "../data/pageSpec.json";

const footerSection = (homePageSpec as any).sections.find((s: any) => s.id === 'footer' || s.type === 'footer');

/* ─────────────────────── Nav ─────────────────────── */

function NavBar() {
    return (
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
                <Link to="/" className="text-xl font-bold text-slate-900">
                    Price<span className="text-orange-500">M8</span>
                </Link>
                <a
                    href="https://app.pricem8.uk/signup"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                    Start Free Trial
                </a>
            </div>
        </nav>
    );
}

/* ─────────────────────── Hero ─────────────────────── */

function HeroSection() {
    return (
        <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-6">
                    Built by a landscaper with 20&nbsp;years in the trade
                </p>
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                    Stop Underquoting.{" "}
                    <span className="text-emerald-600">Stop Losing Money</span> on Every
                    Job.
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                    PriceM8 calculates accurate material quantities, labour costs and
                    margins automatically&nbsp;&mdash; so you quote with confidence in
                    minutes, not hours.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="https://app.pricem8.uk/signup"
                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-4 px-8 rounded-xl transition-colors shadow-lg shadow-emerald-600/20"
                    >
                        Start Your Free 14-Day Trial
                    </a>
                </div>
                <p className="mt-4 text-sm text-slate-500">
                    No credit card required &middot; Full access for 14&nbsp;days
                </p>
            </div>
        </section>
    );
}

/* ─────────────────────── Pain Points ─────────────────────── */

const PAIN_POINTS = [
    {
        icon: Clock,
        title: "Spending hours on quotes?",
        description:
            "Measuring, pricing materials, calculating labour\u2026 then doing it all again for the next job. Your evenings disappear into spreadsheets.",
    },
    {
        icon: TrendingDown,
        title: "Underquoting and losing money?",
        description:
            "Forget one material or underestimate the labour and your margin evaporates. You only find out when it\u2019s too late.",
    },
    {
        icon: FileX,
        title: "Sending unprofessional quotes?",
        description:
            "Scribbled prices on the back of a receipt don\u2019t win the big jobs. Customers judge your business before you even start.",
    },
];

function PainPointsSection() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
                    Does This Sound Familiar?
                </h2>
                <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
                    If you&rsquo;re a landscaper quoting jobs by hand, you already know
                    these problems.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PAIN_POINTS.map((point) => (
                        <div
                            key={point.title}
                            className="bg-slate-50 rounded-2xl p-8 text-center"
                        >
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
                                <point.icon className="w-7 h-7 text-red-500" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">
                                {point.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {point.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── Emotional / Real Cost ─────────────────── */

const REAL_COST_ITEMS = [
    {
        icon: BedDouble,
        headline: "Quoting shouldn\u2019t beat bath time.",
        text: "Your kids are splashing around upstairs and you\u2019re hunched over a laptop trying to work out how many bags of sharp sand you need. Again.",
    },
    {
        icon: BookOpen,
        headline: "Quoting shouldn\u2019t replace story time.",
        text: "You promised you\u2019d read them a bedtime story tonight. But there\u2019s two more quotes to finish before tomorrow morning.",
    },
    {
        icon: Heart,
        headline: "Your partner hates your spreadsheets.",
        text: "Another evening on the sofa with a calculator while they watch TV alone. They didn\u2019t sign up for this. Neither did you.",
    },
    {
        icon: BanknoteIcon,
        headline: "One missed material wipes your profit.",
        text: "\u00a350 of forgotten sharp sand on a \u00a32,000 patio job. Multiply that by 10 jobs a month and you\u2019re losing \u00a3500 a month you didn\u2019t even notice.",
    },
];

function RealCostSection() {
    return (
        <section className="py-16 md:py-24 bg-slate-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-3">
                    The Real Cost of Manual Quoting
                </h2>
                <p className="text-slate-400 text-center mb-14 max-w-xl mx-auto">
                    It&rsquo;s not just money you&rsquo;re losing. It&rsquo;s time
                    with the people who matter most.
                </p>
                <div className="space-y-10">
                    {REAL_COST_ITEMS.map((item) => (
                        <div key={item.headline} className="flex gap-5 items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mt-1">
                                <item.icon className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">
                                    {item.headline}
                                </h3>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mid-page CTA */}
                <div className="mt-14 text-center">
                    <a
                        href="https://app.pricem8.uk/signup"
                        className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                    >
                        Get Your Evenings Back &mdash; Start Free Trial
                    </a>
                    <p className="mt-3 text-xs text-slate-500">
                        No credit card &middot; Takes 2 minutes to set up
                    </p>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── Founder Story ─────────────────── */

function FounderSection() {
    return (
        <section className="py-16 md:py-20 bg-emerald-600">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                        <img
                            src={founderImage}
                            alt="Michal"
                            className="w-28 h-28 rounded-full object-cover object-top shadow-lg ring-4 ring-emerald-700 scale-125"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed mb-4">
                            &ldquo;I spent 20&nbsp;years as a landscaper. I&rsquo;ve quoted thousands of jobs&nbsp;&mdash;
                            sometimes brilliantly, sometimes at a loss. I built PriceM8 because I was tired of
                            guessing, tired of spreadsheets, and tired of missing bath time because I had quotes to finish.&rdquo;
                        </p>
                        <p className="text-emerald-100 text-sm font-medium">
                            &mdash; Michal, Founder
                        </p>
                        <p className="text-emerald-200 text-xs mt-1">
                            20&nbsp;years in landscaping. Every calculation in PriceM8 is based on
                            real-world trade experience, not guesswork.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── Video Section ─────────────────── */

function VideoSection() {
    const videoRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isPlaying) {
                    setIsPlaying(true);
                }
            },
            { threshold: 0.5 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, [isPlaying]);

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                    See It in Action
                </h2>
                <p className="text-slate-500 mb-10 max-w-xl mx-auto">
                    Watch how PriceM8 turns a blank project into a professional,
                    accurate quote in under 3&nbsp;minutes.
                </p>
                <div
                    ref={videoRef}
                    className="relative w-full aspect-video bg-slate-100 rounded-2xl overflow-hidden shadow-xl border border-slate-200"
                >
                    <iframe
                        src={`https://www.youtube.com/embed/0DcouW_XMF4?autoplay=${isPlaying ? 1 : 0}&mute=1`}
                        title="PriceM8 Demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── Features ─────────────────── */

const FEATURES = [
    {
        icon: Calculator,
        title: "Instant Material Calculations",
        description:
            "Enter the area. PriceM8 calculates exactly how many bags of MOT, sharp sand, cement, or slabs you need\u2009\u2014\u2009down to the last unit. No more guessing, no more overordering.",
    },
    {
        icon: FileText,
        title: "Professional Quotes in Minutes",
        description:
            "Beautiful, branded PDF quotes your customers actually want to read. Add your logo, your terms, and customise the design. Look like a big company, even if it\u2019s just you and a van.",
    },
    {
        icon: Package,
        title: "Built-In Trade Packs",
        description:
            "Landscaping pack included: block paving, artificial grass, porcelain paving, fencing, turfing and more. Just select the task, enter the measurements, and let PriceM8 do the maths.",
    },
    {
        icon: PoundSterling,
        title: "Your Prices, Your Margins",
        description:
            "Set your own material prices or adjust on the fly. Mark up materials with your margin built in automatically. Always know exactly what you\u2019re making on every job.",
    },
];

function FeaturesSection() {
    return (
        <section className="py-16 md:py-24 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
                    Everything You Need to Quote Accurately
                </h2>
                <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
                    PriceM8 handles the numbers so you can focus on the work.
                </p>
                <div className="space-y-16">
                    {FEATURES.map((feature, i) => (
                        <div
                            key={feature.title}
                            className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-16`}
                        >
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center">
                                    <feature.icon className="w-10 h-10 text-emerald-600" />
                                </div>
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed max-w-lg">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── How It Works ─────────────────── */

const STEPS = [
    {
        step: "1",
        title: "Create a project",
        description: "Enter your measurements and select the tasks for the job.",
        icon: ClipboardList,
    },
    {
        step: "2",
        title: "Materials calculated automatically",
        description:
            "PriceM8 works out every material, quantity, and cost instantly.",
        icon: MousePointerClick,
    },
    {
        step: "3",
        title: "Send a professional quote",
        description:
            "Generate a branded PDF and share it with your customer in one click.",
        icon: Send,
    },
];

function HowItWorksSection() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
                    How It Works
                </h2>
                <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
                    From measurements to a professional quote in three simple steps.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {STEPS.map((s) => (
                        <div key={s.step} className="text-center">
                            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
                                <span className="text-2xl font-bold text-white">{s.step}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                {s.title}
                            </h3>
                            <p className="text-slate-600 text-sm">{s.description}</p>
                        </div>
                    ))}
                </div>

                {/* Mid-page CTA */}
                <div className="mt-14 text-center">
                    <a
                        href="https://app.pricem8.uk/signup"
                        className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                    >
                        Try It Free for 14 Days
                    </a>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── Freebies / What You Get ─────────────────── */

const FREEBIES = [
    {
        icon: Zap,
        title: "Instant material take-offs",
        text: "Enter area + task. Get an exact material list with quantities. Done.",
    },
    {
        icon: FileText,
        title: "Branded PDF quotes",
        text: "Your logo, your colours, your terms. Sent to clients in one tap.",
    },
    {
        icon: ShieldCheck,
        title: "Built-in profit margins",
        text: "Set your mark-up once. Every quote protects your profit automatically.",
    },
    {
        icon: Calculator,
        title: "Labour cost calculations",
        text: "Day rates, hourly rates, team size. Labour is costed line by line.",
    },
    {
        icon: Gift,
        title: "Client portal included",
        text: "Customers view, approve, and message you. No more chasing by text.",
    },
    {
        icon: CheckCircle2,
        title: "Job scheduling",
        text: "Drag-and-drop calendar. See what\u2019s booked, what\u2019s quoted, what\u2019s next.",
    },
];

function FreebiesSection() {
    return (
        <section className="py-16 md:py-24 bg-slate-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-3">
                    What You Get With PriceM8
                </h2>
                <p className="text-slate-500 text-center mb-12 max-w-xl mx-auto">
                    No fluff. Here&rsquo;s exactly what&rsquo;s inside.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FREEBIES.map((item) => (
                        <div
                            key={item.title}
                            className="bg-white rounded-xl border border-slate-200 p-6"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <item.icon className="w-5 h-5 text-emerald-600" />
                                </div>
                                <h3 className="font-bold text-slate-900">{item.title}</h3>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── Pricing ─────────────────── */

function PricingSection() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-slate-500 mb-12 max-w-xl mx-auto">
                    Start with Core. Add trade packs when you need them.
                </p>

                {/* Core Plan */}
                <div className="bg-white rounded-2xl border-2 border-emerald-500 shadow-xl p-8 max-w-md mx-auto mb-8">
                    <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                        Start here
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">
                        PriceM8 Core
                    </h3>
                    <p className="text-slate-500 text-sm mb-6">
                        Scheduling, client portal, file storage, branded PDF quotes &amp;
                        invoices
                    </p>
                    <div className="mb-6">
                        <span className="text-4xl font-extrabold text-slate-900">
                            &pound;19
                        </span>
                        <span className="text-slate-500">/month</span>
                    </div>
                    <a
                        href="https://app.pricem8.uk/signup"
                        className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                    >
                        Start Your Free 14-Day Trial
                    </a>
                    <p className="mt-3 text-xs text-slate-400">
                        No credit card required
                    </p>
                </div>

                {/* Add-on Packs */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md mx-auto">
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                        Optional Estimating Packs
                    </h4>
                    <div className="divide-y divide-slate-100 text-sm">
                        {[
                            { name: "Landscaping", price: "\u00a312" },
                            { name: "General Building \u2013 1st Fix", price: "\u00a312" },
                            { name: "General Building \u2013 2nd Fix", price: "\u00a37" },
                            { name: "Plumbing", price: "\u00a37" },
                            { name: "Electrical", price: "\u00a37" },
                        ].map((pack) => (
                            <div
                                key={pack.name}
                                className="flex items-center justify-between py-2.5"
                            >
                                <span className="text-slate-700">{pack.name}</span>
                                <span className="font-medium text-slate-900">
                                    {pack.price}/mo
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-xs text-slate-400">
                        Add packs anytime from Settings after subscribing to Core.
                    </p>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── FAQ ─────────────────── */

const FAQ_ITEMS = [
    {
        q: "Is it just for landscapers?",
        a: "PriceM8 works for any trade. Landscaping packs are included out of the box, with more trades coming soon\u2009\u2014\u2009general building, plumbing, and electrical are already available.",
    },
    {
        q: "What happens after the trial?",
        a: "You choose which plan suits you. No pressure, no automatic billing. If you don\u2019t subscribe, your data stays safe\u2009\u2014\u2009you just can\u2019t create new quotes.",
    },
    {
        q: "Can I use my own material prices?",
        a: "Yes. Every material price is fully customisable per workspace. Set your own trade prices and mark-ups.",
    },
    {
        q: "Do I need to be tech-savvy?",
        a: "If you can use a smartphone, you can use PriceM8. It\u2019s designed to be simple and fast for tradespeople, not IT professionals.",
    },
    {
        q: "What tasks are included in the Landscaping pack?",
        a: "Block paving, artificial grass, porcelain paving, fencing, turfing, concrete bases, and more. Each task auto-calculates every material you need.",
    },
    {
        q: "Can I try it before paying?",
        a: "Absolutely. The 14-day trial gives you full access to everything\u2009\u2014\u2009no credit card, no restrictions, no catches.",
    },
];

function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-16 md:py-24 bg-slate-50">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                    {FAQ_ITEMS.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white border border-slate-200 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-semibold text-slate-900">{item.q}</span>
                                {openIndex === i ? (
                                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4" />
                                )}
                            </button>
                            {openIndex === i && (
                                <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed">
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── Final CTA ─────────────────── */

function FinalCTA() {
    return (
        <section className="py-16 md:py-24 bg-emerald-600">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
                    Ready to Quote With Confidence?
                </h2>
                <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
                    Stop guessing. Stop losing money. Stop missing bath time.
                    <br />
                    Try PriceM8 free for 14&nbsp;days and see the difference.
                </p>
                <a
                    href="https://app.pricem8.uk/signup"
                    className="inline-block bg-white text-emerald-700 font-bold text-lg py-4 px-10 rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
                >
                    Start Your Free Trial Now
                </a>
                <p className="mt-4 text-sm text-emerald-200">
                    No credit card required &middot; Cancel anytime
                </p>
            </div>
        </section>
    );
}

/* ─────────────────── Page ─────────────────── */

export default function GetStartedPage() {
    return (
        <div className="min-h-screen bg-white">
            <NavBar />
            <HeroSection />
            <PainPointsSection />
            <RealCostSection />
            <FounderSection />
            <VideoSection />
            <FeaturesSection />
            <HowItWorksSection />
            <FreebiesSection />
            <PricingSection />
            <FAQSection />
            <FinalCTA />
            <Footer section={footerSection} />
        </div>
    );
}
