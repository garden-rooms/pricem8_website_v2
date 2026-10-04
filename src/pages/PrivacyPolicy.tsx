import SiteSheetHeader from '../components/site-sheet/Header'
import SiteSheetFooter from '../components/site-sheet/Footer'
import { useSEO } from '../hooks/useSEO'
import '../styles/site-sheet.css'

const SEO_TITLE = 'Privacy Policy – PriceM8'
const SEO_DESCRIPTION = 'How PriceM8 collects, uses and protects your data, in plain English.'

export default function PrivacyPolicy() {
    useSEO({ title: SEO_TITLE, description: SEO_DESCRIPTION, path: '/privacy-policy' })

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
                                Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
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
                                <li><strong>Cloud infrastructure:</strong> Vercel and Convex (hosting and database management).</li>
                                <li><strong>Payment processing:</strong> Stripe.</li>
                                <li><strong>Communication:</strong> email service providers for sending your quotes and account notifications.</li>
                            </ul>

                            <h3>4. Your Rights</h3>
                            <p>
                                Under UK GDPR, you have the right to access, correct, or delete your personal data. You also have the right to restrict or object to certain processing. To exercise these rights, please get in touch.
                            </p>

                            <h3>5. Data Security</h3>
                            <p>
                                Industry-standard security measures, including encryption and secure server protocols, protect your data. No internet transmission is 100% secure, but reasonable precautions are taken throughout.
                            </p>

                            <h3>6. Contact</h3>
                            <p>
                                Questions about this Privacy Policy or how your data is handled: <a href="mailto:support@pricem8.uk">support@pricem8.uk</a>.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <SiteSheetFooter />
        </div>
    )
}
