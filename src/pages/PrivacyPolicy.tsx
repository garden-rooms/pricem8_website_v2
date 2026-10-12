import SiteSheetHeader from '../components/site-sheet/Header'
import SiteSheetFooter from '../components/site-sheet/Footer'
import BusinessAddress from '../components/BusinessAddress'
import { useSEO } from '../hooks/useSEO'
import '../styles/site-sheet.css'

const SEO_TITLE = 'Privacy Policy – PriceM8'
const SEO_DESCRIPTION = 'How PriceM8 collects, uses and protects your data, in plain English.'

export default function PrivacyPolicy() {
    useSEO({ title: SEO_TITLE, description: SEO_DESCRIPTION, path: '/privacy-policy', index: false })

    return (
        <div className="ps-page">
            <SiteSheetHeader />

            <main id="top">
                <section>
                    <div className="wrap">
                        <p className="mono hero-eyebrow">Legal</p>
                        <h1 className="disp" style={{ fontSize: 'var(--fs-h2)', marginBottom: 32 }}>Privacy Policy</h1>

                        <div className="prose">
                            <p className="mono" style={{ marginBottom: 24 }}>
                                Last updated: 12 October 2026
                            </p>

                            <p>
                                At PriceM8, I take your privacy seriously. This Privacy Policy explains how I collect, use, disclose, and safeguard your information when you visit this website (pricem8.uk) and use the application.
                            </p>

                            <p>
                                PriceM8 is committed to ensuring that your privacy is protected in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                            </p>

                            <h3>1. Information I Collect</h3>
                            <p>
                                To provide the estimating and quoting service, I collect:
                            </p>
                            <ul>
                                <li><strong>Account information:</strong> your name, business name, email address, and phone number.</li>
                                <li><strong>Business data:</strong> information you input about your quotes, customers (including their contact details for quote delivery), materials, and labour rates.</li>
                                <li><strong>Payment data:</strong> payment details are processed securely via a third-party provider (Stripe). Full card numbers are never stored on PriceM8's servers.</li>
                                <li><strong>Usage data:</strong> information about how you use the app, including device type and IP address, to help improve performance.</li>
                            </ul>

                            <h3>2. How I Use Your Information</h3>
                            <p>
                                Your data is processed based on the following legal grounds:
                            </p>
                            <ul>
                                <li><strong>Contractual necessity:</strong> to provide the PriceM8 service, calculate your quotes, and manage your account.</li>
                                <li><strong>Legitimate interests:</strong> to improve the software, provide customer support, and protect against fraud.</li>
                                <li><strong>Legal obligation:</strong> to comply with UK tax and accounting laws regarding subscription payments.</li>
                            </ul>

                            <h3>3. Data Sharing and Third Parties</h3>
                            <p>
                                Your data is never sold. It's only shared with trusted service providers essential to running PriceM8:
                            </p>
                            <ul>
                                <li><strong>Cloud infrastructure:</strong> Vercel (website and application hosting) and Convex (database, hosted in the EU).</li>
                                <li><strong>Sign-in:</strong> Clerk (account creation, login and your email address).</li>
                                <li><strong>Payment processing:</strong> Stripe (subscription and one-off payments) and, if you choose to connect it, GoCardless (bank payments from your customers on your invoices).</li>
                                <li><strong>Analytics and advertising (website only, with your consent):</strong> Google (Analytics) and Meta (Pixel).</li>
                                <li><strong>Email:</strong> Resend, which delivers the quotes and invoices you send and any account emails.</li>
                                <li><strong>PDF generation:</strong> PDFShift, which receives the content of a quote or invoice (including your customer's name and address) only to turn it into a PDF.</li>
                            </ul>

                            <h3>4. Your Rights</h3>
                            <p>
                                Under UK GDPR, you have the right to access, correct, or delete your personal data. You also have the right to restrict or object to certain processing. To exercise these rights, please get in touch. If you cancel, your data stays available to you for a reasonable period afterwards and is deleted on request. If you are unhappy with how your data has been handled you also have the right to complain to the Information Commissioner's Office (ico.org.uk).
                            </p>

                            <h3>Your customers' data</h3>
                            <p>
                                When you enter your own customers' details into PriceM8, you decide why and how they are used and PriceM8 handles them only on your behalf to provide the service. They are not used for marketing and are not shared except with the providers listed above.
                            </p>

                            <h3>Cookies and analytics</h3>
                            <p>
                                <strong>The application</strong> (app.pricem8.uk) uses the cookies and similar storage needed to keep you signed in and remember simple preferences. It asks the same cookie question as this website (your answer is shared between the two), and only if you say Yes does it tell Google Analytics and Meta that you signed up or started a trial, so that I can tell whether advertising is working.
                            </p>
                            <p>
                                <strong>This website</strong> (pricem8.uk) asks before it sets any cookies that are not strictly necessary. If you choose Yes, it uses Google Analytics (to see which pages are read and how people find the site) and the Meta Pixel (to measure whether adverts on Facebook and Instagram lead to visits and sign-ups). Google and Meta can set their own cookies and receive information about your visit under their own privacy policies. If you choose No, or do not answer, neither is loaded. You can change your choice at any time with Cookie settings in the footer of every page.
                            </p>

                            <h3>5. Data Security</h3>
                            <p>
                                Industry-standard security measures, including encryption and secure server protocols, protect your data. No internet transmission is 100% secure, but reasonable precautions are taken throughout.
                            </p>

                            <h3>6. Who is responsible for your data, and contact</h3>
                            <p>
                                The data controller is Michal Gruszczynski, a sole trader, trading as PriceM8. Questions about this Privacy Policy or how your data is handled: <a href="mailto:support@pricem8.uk">support@pricem8.uk</a>.
                            </p>
                            <p>
                                Postal address:
                            </p>
                            <BusinessAddress />
                        </div>
                    </div>
                </section>
            </main>

            <SiteSheetFooter />
        </div>
    )
}
