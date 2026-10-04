import { useState, useEffect, useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'
import SiteSheetHeader from '../components/site-sheet/Header'
import SiteSheetFooter from '../components/site-sheet/Footer'
import '../styles/site-sheet.css'

const SEO_TITLE = 'Contact – PriceM8'
const SEO_DESCRIPTION = "Got a question about PriceM8? Send a message and I'll get back to you within 24 hours."

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

    const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'

    useEffect(() => {
        document.title = SEO_TITLE
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
            metaDescription.setAttribute('content', SEO_DESCRIPTION)
        }
        window.scrollTo(0, 0)
    }, [])

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

    return (
        <div className="ps-page">
            <SiteSheetHeader />

            <main id="top">
                <section className="hero">
                    <div className="wrap" style={{ maxWidth: 640 }}>
                        <p className="mono hero-eyebrow">Get in touch</p>
                        <h1 className="disp" style={{ fontSize: 'var(--fs-h2)' }}>Got a question?</h1>
                        <p className="lede" style={{ marginTop: 18 }}>
                            Send a message and I'll get back to you myself — usually within 24 hours.
                        </p>
                    </div>
                </section>

                <section style={{ paddingTop: 0 }}>
                    <div className="wrap" style={{ maxWidth: 640 }}>
                        <div className="form-card">
                            <form className="space-y-6" onSubmit={async (e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement;
                                const formData = new FormData(form);

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

                                if (!data.name || !data.email || !data.message) {
                                    setError('Please fill in all required fields.');
                                    setIsSubmitting(false);
                                    return;
                                }

                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if (!emailRegex.test(data.email as string)) {
                                    setError('Please enter a valid email address.');
                                    setIsSubmitting(false);
                                    return;
                                }

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
                                        if (response.status === 404) {
                                            throw new Error('API endpoint not found. In development, please use "vercel dev" or test in production.');
                                        }
                                        const text = await response.text();
                                        throw new Error(`Server returned ${response.status}: ${text.substring(0, 500)}`);
                                    }

                                    if (!response.ok) {
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
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                    <div className="field" style={{ marginBottom: 0 }}>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" id="name" required disabled={isSubmitting} placeholder="John Smith" />
                                    </div>
                                    <div className="field" style={{ marginBottom: 0 }}>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" required disabled={isSubmitting} placeholder="john@example.com" />
                                    </div>
                                </div>

                                <div className="field">
                                    <label htmlFor="subject">Subject</label>
                                    <select
                                        name="subject"
                                        id="subject"
                                        disabled={isSubmitting}
                                        style={{ width: '100%', border: '1px solid var(--rule)', background: 'var(--paper)', color: 'var(--ink)', padding: '12px 14px', fontFamily: "'Newsreader', Georgia, serif", fontSize: '1rem' }}
                                    >
                                        <option>I have a question about features</option>
                                        <option>I need help with my account</option>
                                        <option>I want to book a demo</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="field">
                                    <label htmlFor="message">Message</label>
                                    <textarea name="message" id="message" rows={4} required disabled={isSubmitting} placeholder="How can I help?"></textarea>
                                </div>

                                {/* Honeypot field - hidden from users but bots will fill it */}
                                <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                                    <label htmlFor="website">Website</label>
                                    <input type="text" name="website" id="website" tabIndex={-1} autoComplete="off" />
                                </div>

                                {error && (
                                    <div className="note-box" style={{ borderLeftColor: '#B33A3A', marginBottom: 20 }}>
                                        {error}
                                    </div>
                                )}

                                {isSuccess && (
                                    <div className="note-box" style={{ marginBottom: 20 }}>
                                        <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--cedar)', flexShrink: 0, marginTop: 2 }} />
                                        <span>Message sent — I'll be in touch soon.</span>
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                                    <div ref={turnstileRef} id="turnstile-widget"></div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !turnstileToken}
                                    className="btn"
                                    style={{ width: '100%', justifyContent: 'center' }}
                                >
                                    {isSubmitting ? 'Sending…' : 'Send message'}
                                </button>

                                <p className="mono" style={{ textAlign: 'center', marginTop: 16 }}>
                                    Replies within 24 hours · Mon–Fri 8am–6pm, Sat 9am–1pm
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <SiteSheetFooter />
        </div>
    )
}
