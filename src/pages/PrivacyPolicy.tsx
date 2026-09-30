import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import pageSpec from '../data/pageSpec.json'

export default function PrivacyPolicy() {
    // Use the navbar/footer data from pageSpec
    const navbarSection = pageSpec.sections.find(s => s.type === 'navbar')
    const footerSection = pageSpec.sections.find(s => s.type === 'footer')

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
            {navbarSection && <Navbar section={navbarSection as any} />}

            <main className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>

                    <div className="prose prose-lg prose-teal dark:prose-invert text-gray-600 dark:text-gray-300">
                        <p className="lead">
                            Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>

                        <p>
                            At PriceM8, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (pricem8.uk) and use our application services.
                        </p>

                        <p>
                            PriceM8 is committed to ensuring that your privacy is protected in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                        </p>

                        <h3>1. Information We Collect</h3>
                        <p>
                            To provide our estimating and quoting service, we collect:
                        </p>
                        <ul>
                            <li><strong>Account Information:</strong> Your name, business name, email address, and phone number.</li>
                            <li><strong>Business Data:</strong> Information you input about your quotes, customers (including their contact details for quote delivery), materials, and labour rates.</li>
                            <li><strong>Payment Data:</strong> Payment details are processed securely via our third-party provider (Stripe). We do not store full credit card numbers on our servers.</li>
                            <li><strong>Usage Data:</strong> Information about how you use the app, including device type and IP address, to help us improve performance.</li>
                        </ul>

                        <h3>2. How We Use Your Information</h3>
                        <p>
                            We process your data based on the following legal grounds:
                        </p>
                        <ul>
                            <li><strong>Contractual Necessity:</strong> To provide the PriceM8 service, calculate your quotes, and manage your account.</li>
                            <li><strong>Legitimate Interests:</strong> To improve our software, provide customer support, and protect against fraud.</li>
                            <li><strong>Legal Obligation:</strong> To comply with UK tax and accounting laws regarding subscription payments.</li>
                        </ul>

                        <h3>3. Data Sharing and Third Parties</h3>
                        <p>
                            We do not sell your data. We only share information with trusted service providers essential to our operations:
                        </p>
                        <ul>
                            <li><strong>Cloud Infrastructure:</strong> Vercel and Convex (for hosting and database management).</li>
                            <li><strong>Payment Processing:</strong> Stripe.</li>
                            <li><strong>Communication:</strong> Email service providers for sending your quotes and account notifications.</li>
                        </ul>

                        <h3>4. Your Rights</h3>
                        <p>
                            Under UK GDPR, you have the right to access, correct, or delete your personal data. You also have the right to restrict or object to certain processing. To exercise these rights, please contact us.
                        </p>

                        <h3>5. Data Security</h3>
                        <p>
                            We implement industry-standard security measures, including encryption and secure server protocols, to protect your data. However, no internet transmission is 100% secure.
                        </p>

                        <h3>6. Contact Us</h3>
                        <p>
                            If you have any questions about this Privacy Policy or how we handle your data, please contact our Data Protection lead at support@pricem8.uk.
                        </p>
                    </div>
                </div>
            </main>

            {footerSection && <Footer section={footerSection as any} />}
        </div>
    )
}
