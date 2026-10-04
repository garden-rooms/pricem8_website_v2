import { useEffect } from 'react'
import SiteSheetHeader from '../../components/site-sheet/Header'
import SiteSheetFooter from '../../components/site-sheet/Footer'
import OverheadsCalculator from '../../components/OverheadsCalculator'
import '../../styles/site-sheet.css'

const SEO_TITLE = 'How much should I charge? – PriceM8'
const SEO_DESCRIPTION = "Why most tradespeople are working for less than minimum wage without realising it, and how to fix your pricing today using the free calculator."

export default function HowToCharge() {
    useEffect(() => {
        document.title = SEO_TITLE
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
            metaDescription.setAttribute('content', SEO_DESCRIPTION)
        }
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="ps-page">
            <SiteSheetHeader />

            <main id="top">
                <section className="hero" style={{ paddingBottom: 0 }}>
                    <div className="wrap" style={{ maxWidth: 720 }}>
                        <p className="mono hero-eyebrow">Business Advice</p>
                        <h1 className="disp">How much should I charge?</h1>
                        <p className="lede" style={{ marginTop: 18 }}>
                            Why most tradespeople are working for less than minimum wage without
                            realising it — and how to fix your pricing today.
                        </p>
                    </div>
                </section>

                <section>
                    <div className="wrap" style={{ maxWidth: 720 }}>
                        <div className="prose">
                            <p>
                                It's the most common question in the trades: <strong>"What's the going rate?"</strong>
                            </p>
                            <p>
                                But asking what everyone else charges is a dangerous game. You don't know their
                                overheads, their speed, or if they're even making a profit. Copy a bloke who's
                                going bust, and you'll be joining him shortly.
                            </p>

                            <h3>The "Day Rate" Trap</h3>
                            <p>
                                Most tradies pick a round number out of the air. £200 a day? £250? It sounds
                                decent. If you work 5 days a week, that's good money, right?
                            </p>
                            <p>
                                <strong>Wrong.</strong>
                            </p>
                            <p>
                                Because you don't work 5 billable days a week, 52 weeks a year. Nobody does.
                                And you don't keep all that money.
                            </p>
                        </div>

                        <div style={{ margin: '3em 0' }}>
                            <OverheadsCalculator />
                        </div>

                        <div className="prose">
                            <h3>Understanding Your Results</h3>
                            <p>
                                The calculator above gives you two key figures for yourself and every employee:
                            </p>

                            <h3>1. Break even (cost)</h3>
                            <p>
                                This is your survival number. It covers your salary, your tax, your van, your
                                insurance, and your pension. Charge less than this and <strong>you are losing
                                money</strong> every time you step out the door.
                            </p>

                            <h3>2. Charge rate (margin)</h3>
                            <p>
                                This is what you actually quote the customer. It includes your <strong>profit
                                margin</strong> — vital, since it pays for business growth, covers mistakes, and
                                builds a safety net for rainy days.
                            </p>

                            <h3>Setting Up PriceM8</h3>
                            <p>
                                In the PriceM8 app, you'll find a Labour Rates section in Settings. Take the
                                Charge Rate figures from the cheat sheet above and plug them straight in.
                            </p>
                            <ul>
                                <li><strong>Cost rate:</strong> enter your Break Even figure. This helps PriceM8 track your estimated profit on every job.</li>
                                <li><strong>Charge rate:</strong> enter your Charge Rate figure. This is what PriceM8 uses to build your customer quotes.</li>
                            </ul>
                            <p>
                                Now every quote you send is guaranteed to cover your costs and make you a profit.
                                No more guesswork.
                            </p>

                            <div className="note-box" style={{ display: 'block', margin: '2em 0' }}>
                                <p style={{ margin: 0 }}>
                                    <strong style={{ color: 'var(--ink)' }}>Why split overheads?</strong> Fixed
                                    overheads (van, insurance, marketing) are split equally across your whole
                                    team. That way every hour worked by every employee contributes to paying the
                                    bills, not just your own labour.
                                </p>
                            </div>

                            <h3>Stop Guessing, Start Profiting</h3>
                            <p>
                                You can't control the tax rates, and you can't avoid buying tools. But you
                                <strong> can</strong> control your admin time and your pricing accuracy.
                            </p>
                            <p>
                                PriceM8 helps you build professional quotes in minutes, not hours — automatic
                                material and labour takeoffs so you can get an accurate price out the door before
                                you've even finished your tea.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="trial" className="close">
                    <div className="wrap">
                        <h2 className="disp" style={{ fontSize: 'var(--fs-h2)' }}>Ready to sort your pricing out?</h2>
                        <p className="lede" style={{ marginTop: 18 }}>14 days free. A card's required to start, but you're not charged until the trial ends.</p>
                        <div className="row" style={{ marginTop: 28 }}>
                            <a className="btn chalk" href="https://app.pricem8.uk/signup">Start free trial <span className="arw">→</span></a>
                        </div>
                    </div>
                </section>
            </main>

            <SiteSheetFooter />
        </div>
    )
}
