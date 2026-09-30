import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import OverheadsCalculator from '../../components/OverheadsCalculator'
import BrandedText from '../../components/BrandedText'
import pageSpec from '../../data/pageSpec.json'

export default function HowToCharge() {
    // Use the navbar/footer data from pageSpec
    const navbarSection = pageSpec.sections.find(s => s.type === 'navbar')
    const footerSection = pageSpec.sections.find(s => s.type === 'footer')

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
            {navbarSection && <Navbar section={navbarSection as any} />}

            <main className="pt-32 pb-20">
                {/* Header */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <div className="inline-flex items-center px-3 py-1 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium border border-teal-100 dark:border-teal-500/20 mb-6">
                        Business Advice
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        How much should I <BrandedText className="text-teal-600 dark:text-teal-400">charge?</BrandedText>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        Why most tradesmen are working for less than minimum wage without realising it—and how to fix your pricing today.
                    </p>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="prose prose-lg prose-teal dark:prose-invert mx-auto mb-16 text-gray-600 dark:text-gray-300">
                        <p>
                            It's the most common question in the trades: <strong>"What's the going rate?"</strong>
                        </p>
                        <p>
                            But asking what everyone else charges is a dangerous game. You don't know their overheads, their speed, or if they're even making a profit. If you copy a bloke who's going bust, you'll be joining him shortly.
                        </p>

                        <h3>The "Day Rate" Trap</h3>
                        <p>
                            Most tradies pick a round number out of the air. £200 a day? £250? It sounds decent. If you work 5 days a week, that's good money, right?
                        </p>
                        <p>
                            <strong>Wrong.</strong>
                        </p>
                        <p>
                            Because you don't work 5 billable days a week, 52 weeks a year. Nobody does. And you don't keep all that money.
                        </p>
                    </div>

                    {/* Calculator Section */}
                    <div className="mb-20">
                        <OverheadsCalculator />
                    </div>

                    <div className="prose prose-lg prose-teal dark:prose-invert mx-auto text-gray-600 dark:text-gray-300">
                        <h3>Understanding Your Results</h3>
                        <p>
                            The calculator above gives you two key figures for yourself and every employee:
                        </p>

                        <h4>1. Break Even (Cost)</h4>
                        <p>
                            This is your "survival number". It covers your salary, your tax, your van, your insurance, and your pension. If you charge less than this, <strong>you are losing money</strong> every time you step out the door.
                        </p>

                        <h4>2. Charge Rate (Margin)</h4>
                        <p>
                            This is what you actually quote the customer. It includes your <strong>Profit Margin</strong>. This extra percentage is vital—it pays for business growth, covers mistakes, and builds a safety net for rainy days.
                        </p>

                        <h3>Setting Up PriceM8</h3>
                        <p>
                            If you're using the PriceM8 app, you'll see a section for <strong>Labour Rates</strong> in your settings. This is where the magic happens.
                        </p>
                        <p>
                            Simply take the <strong>Charge Rate</strong> figures from the "PriceM8 Cheat Sheet" above and plug them straight into the app.
                        </p>
                        <ul>
                            <li><strong>Cost Rate:</strong> Enter your "Break Even" figure. This helps PriceM8 track your estimated profit on every job.</li>
                            <li><strong>Charge Rate:</strong> Enter your "Charge Rate" figure. This is what PriceM8 will use to build your customer quotes.</li>
                        </ul>
                        <p>
                            Now, every quote you send is guaranteed to cover your costs and make you a profit. No more guesswork.
                        </p>

                        <div className="bg-teal-50 dark:bg-teal-500/10 border-l-4 border-teal-500 p-6 my-8 not-prose rounded-r-xl">
                            <h4 className="text-teal-900 dark:text-teal-200 font-bold text-lg mb-2">Why split overheads?</h4>
                            <p className="text-teal-800 dark:text-teal-300">
                                We split your fixed overheads (van, insurance, marketing) equally across your whole team. This ensures that every hour worked by every employee contributes to paying the bills, not just your own labour.
                            </p>
                        </div>

                        <h3>Stop Guessing, Start Profiting</h3>
                        <p>
                            You can't control the tax rates, and you can't avoid buying tools. But you <strong>can</strong> control your admin time and your pricing accuracy.
                        </p>
                        <p>
                            <strong>PriceM8</strong> helps you build professional quotes in minutes, not hours. It uses live material prices and pre-built trade packs so you can get accurate prices out the door before you've even finished your tea.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center bg-gray-900 rounded-3xl p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-4">Ready to sort your pricing out?</h2>
                            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                                Join the waiting list for PriceM8 and get the tools you need to quote faster and more profitably.
                            </p>
                            <a
                                href="https://app.pricem8.uk/signup"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-full text-gray-900 bg-white hover:bg-gray-100 transition-colors shadow-xl"
                            >
                                Get Early Access
                            </a>
                        </div>
                    </div>

                </div>
            </main>

            {footerSection && <Footer section={footerSection as any} />}
        </div>
    )
}
