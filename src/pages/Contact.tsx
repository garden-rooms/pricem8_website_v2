import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle2 } from 'lucide-react'
import GridBackground from '../components/GridBackground'
import FadeInSection from '../components/FadeInSection'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import pageSpec from '../data/pageSpec.json'

// Extend Window interface for Turnstile
declare global {
    interface Window {
        turnstile: {
            render: (element: HTMLElement | string, options: {
                sitekey: string;
                callback?: (token: string) => void;
                'error-callback'?: () => void;
                'expired-callback'?: () => void;
            }) => string;
            reset: (widgetId?: string) => void;
            remove: (widgetId: string) => void;
        };
    }
}

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
    const [turnstileWidgetId, setTurnstileWidgetId] = useState<string | null>(null)
    const turnstileRef = useRef<HTMLDivElement>(null)
    
    // Get Turnstile site key from environment or use a placeholder
    const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA' // Placeholder for development
    
    // Initialize Turnstile widget
    useEffect(() => {
        if (turnstileRef.current && window.turnstile && !turnstileWidgetId) {
            const widgetId = window.turnstile.render(turnstileRef.current, {
                sitekey: TURNSTILE_SITE_KEY,
                callback: (token: string) => {
                    setTurnstileToken(token)
                },
                'error-callback': () => {
                    setTurnstileToken(null)
                    setError('Verification failed. Please try again.')
                },
                'expired-callback': () => {
                    setTurnstileToken(null)
                }
            })
            setTurnstileWidgetId(widgetId)
        }
        
        return () => {
            if (turnstileWidgetId && window.turnstile) {
                window.turnstile.remove(turnstileWidgetId)
            }
        }
    }, [TURNSTILE_SITE_KEY, turnstileWidgetId])

    const footerSection = pageSpec.sections.find(s => s.id === 'footer') as any
    const navbarSection = pageSpec.sections.find(s => s.id === 'navbar') as any

    return (
        <div className="min-h-screen bg-slate-900 font-sans text-slate-900 relative overflow-hidden">
            <GridBackground />

            {/* Navbar */}
            <div className="relative z-50">
                <Navbar section={navbarSection} />
            </div>

            <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6"
                        >
                            Get in touch
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-slate-400 max-w-2xl mx-auto"
                        >
                            Have a question about PriceM8? We're here to help you get your pricing sorted.
                        </motion.p>
                    </div>

                    <div className="max-w-2xl mx-auto space-y-12">

                        {/* Contact Form */}
                        <FadeInSection>
                            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                                <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Send us a message</h2>

                                <form className="space-y-6 relative z-10" onSubmit={async (e) => {
                                    e.preventDefault();
                                    const form = e.target as HTMLFormElement;
                                    const formData = new FormData(form);
                                    
                                    // Honeypot check - if this field is filled, it's a bot
                                    const honeypot = formData.get('website');
                                    if (honeypot) {
                                        console.warn('Bot detected via honeypot');
                                        setError('Spam detected. Please try again.');
                                        setIsSubmitting(false);
                                        return;
                                    }

                                    const data = {
                                        name: formData.get('name'),
                                        email: formData.get('email'),
                                        subject: formData.get('subject'),
                                        message: formData.get('message'),
                                    };

                                    // Basic validation
                                    if (!data.name || !data.email || !data.message) {
                                        setError('Please fill in all required fields.');
                                        setIsSubmitting(false);
                                        return;
                                    }

                                    // Email validation
                                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                    if (!emailRegex.test(data.email as string)) {
                                        setError('Please enter a valid email address.');
                                        setIsSubmitting(false);
                                        return;
                                    }

                                    // Message length validation
                                    if ((data.message as string).length < 10) {
                                        setError('Please provide a more detailed message (at least 10 characters).');
                                        setIsSubmitting(false);
                                        return;
                                    }

                                    if ((data.message as string).length > 5000) {
                                        setError('Message is too long. Please keep it under 5000 characters.');
                                        setIsSubmitting(false);
                                        return;
                                    }

                                    setIsSubmitting(true);
                                    setError(null);
                                    setIsSuccess(false);

                                    try {
                                        const response = await fetch('/api/send-email', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                ...data,
                                                turnstileToken: turnstileToken
                                            }),
                                        });

                                        // Check if response has content before parsing JSON
                                        const contentType = response.headers.get('content-type');
                                        let responseData: any = {};
                                        
                                        if (contentType && contentType.includes('application/json')) {
                                            const text = await response.text();
                                            if (text) {
                                                try {
                                                    responseData = JSON.parse(text);
                                                } catch (parseError) {
                                                    console.error('Failed to parse JSON:', parseError);
                                                    throw new Error('Invalid response from server');
                                                }
                                            }
                                        } else {
                                            // If not JSON (e.g., HTML 404 page), handle accordingly
                                            if (response.status === 404) {
                                                throw new Error('API endpoint not found. In development, please use "vercel dev" or test in production.');
                                            }
                                            const text = await response.text();
                                            throw new Error(`Server returned ${response.status}: ${text.substring(0, 500)}`);
                                        }

                                        if (!response.ok) {
                                            // Build a detailed error message
                                            let errorMsg = responseData.error || responseData.details || `Server error: ${response.status}`;
                                            if (responseData.resendError) {
                                                errorMsg += ` (Resend: ${responseData.resendError.message || JSON.stringify(responseData.resendError)})`;
                                            }
                                            throw new Error(errorMsg);
                                        }

                                        setIsSuccess(true);
                                        form.reset();
                                    } catch (err) {
                                        const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again later.';
                                        setError(errorMessage);
                                        console.error('Contact form error:', err);
                                    } finally {
                                        setIsSubmitting(false);
                                    }
                                }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                required
                                                disabled={isSubmitting}
                                                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder-slate-500 disabled:opacity-50"
                                                placeholder="John Smith"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                required
                                                disabled={isSubmitting}
                                                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder-slate-500 disabled:opacity-50"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                                        <select
                                            name="subject"
                                            id="subject"
                                            disabled={isSubmitting}
                                            className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all disabled:opacity-50"
                                        >
                                            <option>I have a question about features</option>
                                            <option>I need help with my account</option>
                                            <option>I want to book a demo</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                                        <textarea
                                            name="message"
                                            id="message"
                                            rows={4}
                                            required
                                            disabled={isSubmitting}
                                            className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder-slate-500 resize-none disabled:opacity-50"
                                            placeholder="How can we help?"
                                        ></textarea>
                                    </div>

                                    {/* Honeypot field - hidden from users but bots will fill it */}
                                    <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                                        <label htmlFor="website">Website</label>
                                        <input
                                            type="text"
                                            name="website"
                                            id="website"
                                            tabIndex={-1}
                                            autoComplete="off"
                                        />
                                    </div>

                                    {error && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                                            {error}
                                        </div>
                                    )}

                                    {isSuccess && (
                                        <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-400 text-sm text-center flex items-center justify-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Message sent successfully! We'll be in touch soon.
                                        </div>
                                    )}

                                    {/* Cloudflare Turnstile Widget */}
                                    <div className="flex justify-center">
                                        <div ref={turnstileRef} id="turnstile-widget"></div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !turnstileToken}
                                        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-teal-500/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>

                                    <p className="text-center text-slate-500 text-sm flex items-center justify-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-teal-500" />
                                        We'll get back to you within 24 hours
                                    </p>
                                </form>
                            </div>
                        </FadeInSection>

                        {/* Support Hours */}
                        <FadeInSection delay={0.2}>
                            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 relative overflow-hidden max-w-md mx-auto">
                                <div className="relative z-10 flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0 text-purple-400">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2">Support hours</h3>
                                        <p className="text-slate-400">Monday - Friday: 8am - 6pm</p>
                                        <p className="text-slate-400">Saturday: 9am - 1pm</p>
                                    </div>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </main>

            {footerSection && <Footer section={footerSection} />}
        </div>
    )
}
