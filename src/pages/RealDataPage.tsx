import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import homePageSpec from '../data/pageSpec.json'
import { Check, X, ShieldCheck, Zap, Database, ArrowRight, AlertTriangle, TrendingUp, Clock } from 'lucide-react'

// Use types from pageSpec to ensure compatibility
const navbarSection = (homePageSpec as any).sections.find((s: any) => s.type === 'navbar')
const footerSection = (homePageSpec as any).sections.find((s: any) => s.type === 'footer')

export default function RealDataPage() {
    useEffect(() => {
        document.title = "Stop Gambling With Your Business - PriceM8"
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 font-sans text-slate-900 dark:text-white">
            <Navbar section={navbarSection} />

            {/* HERO SECTION: The High Stakes Hook */}
            <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 mb-8 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Warning: You might be working for free.
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                        Stop Gambling With <br className="hidden sm:block" />
                        <span className="text-teal-600 dark:text-teal-400">Your Livelihood</span>.
                    </h1>
                    <p className="mt-6 text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Why trusting "AI guesses" or mental math is the silent tax that keeps good tradesmen broke.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#math" className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-white bg-teal-600 hover:bg-teal-700 md:text-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            See the Math <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                        <p className="mt-4 sm:mt-0 sm:ml-4 flex items-center justify-center text-sm text-slate-500 dark:text-slate-400">
                            <Clock className="w-4 h-4 mr-2" /> 5-minute read
                        </p>
                    </div>
                </div>
            </div>

            {/* AGITATION: The Problem */}
            <div id="math" className="py-20 bg-slate-50 dark:bg-slate-800/50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-8 text-center">The "Midnight Estimator" Trap</h2>
                    <div className="prose prose-lg dark:prose-invert mx-auto">
                        <p>
                            It's 10:30 PM. You've been on the tools since 7 AM. You're covered in dust. Your dinner is cold.
                            But you're not relaxing. You're sat at the kitchen table, fighting with a spreadsheet, trying to get a quote out for Mrs. Higgins' bathroom.
                        </p>
                        <p>
                            You do a quick mental calculation: <em>"Yeah, looks like about £200 of copper, maybe £100 for fittings. Two days labour."</em>
                        </p>
                        <p>
                            <strong>Stop. You just lost money.</strong>
                        </p>
                        <p>
                            In the last month alone, copper prices have fluctuated. That £200 is now £240. You forgot the waste disposal (£150). You forgot the new flux, solder, and gas (£30).
                        </p>
                        <ul className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 not-prose space-y-3 my-8">
                            <li className="flex items-center text-red-600 dark:text-red-400 font-semibold">
                                <X className="w-5 h-5 mr-3" /> Material cost rise: -£40
                            </li>
                            <li className="flex items-center text-red-600 dark:text-red-400 font-semibold">
                                <X className="w-5 h-5 mr-3" /> Forgotten waste: -£150
                            </li>
                            <li className="flex items-center text-red-600 dark:text-red-400 font-semibold">
                                <X className="w-5 h-5 mr-3" /> Consumables: -£30
                            </li>
                            <li className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-lg font-bold text-slate-900 dark:text-white">
                                <span>Total Profit "Leaf":</span>
                                <span>-£220</span>
                            </li>
                        </ul>
                        <p>
                            You are literally paying Mrs. Higgins to let you fix her bathroom. And the worst part? Apps that promise "AI Magic" are making it worse.
                        </p>
                    </div>
                </div>
            </div>

            {/* SOLUTION: Deterministic Data */}
            <div className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <img
                                    src="/images/desk.jpeg"
                                    alt="Consistency Graph"
                                    className="relative rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 w-full"
                                />
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="inline-flex items-center rounded-lg px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-200 mb-6 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                                <Database className="w-4 h-4 mr-2" /> The Solution: Deterministic Data
                            </div>
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                We Don't Guess.<br />We Calculate.
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                                Generative AI "hallucinates". It guesses what a quote should look like.
                                PriceM8 is built on **Deterministic Data**.
                            </p>
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                                That means 100m² of paving is *always* 100m² of paving. A 10-way consumer unit *always* needs the same RCBOs and tails.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                                            <ShieldCheck className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-slate-900 dark:text-white">Live Price Sync</h3>
                                        <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
                                            We track the prices at major merchants (Jewson, TP, etc.). When they change, your quote changes. Automatically.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                                            <TrendingUp className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-slate-900 dark:text-white">Profit Protection</h3>
                                        <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
                                            We include the "invisible" items (waste, fixings, sundries) that usually eat your margin.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MULTI-TRADE EXAMPLES */}
            <div className="py-20 bg-slate-50 dark:bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Built For Your Trade</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300">No generic "one size fits all". Specific packs for specific trades.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Plumber */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg border border-slate-100 dark:border-slate-800">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">The Electrician</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                "I used to forget to charge for the little things. Clips, capping, screws. PriceM8 adds a 'Consumables Kit' to every job automatically."
                            </p>
                            <p className="font-semibold text-slate-900 dark:text-white">- Dave, Sparky (Leeds)</p>
                        </div>

                        {/* Builder */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg border border-slate-100 dark:border-slate-800 relative transform md:-translate-y-4">
                            <div className="absolute top-0 left-0 w-full h-1 bg-teal-500 rounded-t-xl"></div>
                            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">The Builder</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                "Timber prices are all over the place. I quoted a loft conversion and the timber went up £600 in a week. PriceM8 flagged it before I sent the quote."
                            </p>
                            <p className="font-semibold text-slate-900 dark:text-white">- Steve, Builder (Bristol)</p>
                        </div>

                        {/* Landscaper */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg border border-slate-100 dark:border-slate-800">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
                                <Check className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">The Landscaper</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                "Calculating sub-base volumes for a curved patio used to take me ages. Now I just type in the area and standard depth. Done."
                            </p>
                            <p className="font-semibold text-slate-900 dark:text-white">- Mike, Landscaper (Surrey)</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FINAL CTA: Risk Reversal */}
            <div className="bg-teal-700 py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 flex justify-center items-center">
                    <Database className="w-96 h-96 text-white" />
                </div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Try It On Your Next Quote. <br />
                        <span className="text-teal-200">If It Doesn't Find You £50, Cancel It.</span>
                    </h2>
                    <p className="text-teal-50 text-xl mb-10 max-w-2xl mx-auto">
                        We are so confident that PriceM8 will find missed materials and updated prices that will save you money, we offer a no-questions-asked guarantee.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="https://app.pricem8.uk/signup" className="bg-white text-teal-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-50 transition shadow-xl">
                            Start Free Trial
                        </a>
                    </div>
                    <p className="mt-6 text-sm text-teal-200/80">
                        Card required to start &middot; not charged until the 14-day trial ends.
                    </p>
                </div>
            </div>

            <Footer section={footerSection} />
        </div>
    )
}
