import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWaitingList } from '../context/WaitingListContext'
import BrandedText from './BrandedText'
import { useAction } from 'convex/react'
import { api } from '../../convex/_generated/api'

const TRADES = [
    'Plumber',
    'Electrician',
    'Carpenter',
    'Builder',
    'Landscaper',
    'Roofer',
    'Painter/Decorator',
    'Other'
]

export default function WaitingListModal() {
    const { isOpen, closeWaitlist } = useWaitingList()
    const [email, setEmail] = useState('')
    const [trade, setTrade] = useState('')
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
    const submitToWaitlist = useAction(api.waitingList.submit)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('submitting')

        try {
            await submitToWaitlist({ email, trade })

            // Track conversion
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'waitlist_signup', {
                    event_category: 'engagement',
                    event_label: trade
                })
            }

            setStatus('success')
            // Reset after showing success message
            setTimeout(() => {
                closeWaitlist()
                setStatus('idle')
                setEmail('')
                setTrade('')
            }, 2000)
        } catch (error) {
            console.error('Failed to join waitlist:', error)
            alert('Failed to join waitlist. Please try again. Error: ' + (error instanceof Error ? error.message : String(error)))
            setStatus('idle')
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeWaitlist}
                        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-transparent dark:border-slate-700"
                        >
                            <div className="relative p-8">
                                {/* Close button */}
                                <button
                                    onClick={closeWaitlist}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {status === 'success' ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You're on the list!</h3>
                                        <p className="text-gray-600 dark:text-slate-300">We'll let you know as soon as spots open up.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-center mb-8">
                                            <div className="inline-flex items-center px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-xs font-medium border border-teal-100 dark:border-teal-800 mb-4">
                                                Early Access
                                            </div>
                                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                                Join the <BrandedText className="text-teal-600 dark:text-teal-400">Waiting List</BrandedText>
                                            </h2>
                                            <p className="text-gray-600 dark:text-slate-300">
                                                We're currently onboarding new users gradually to ensure the best experience. Secure your spot now.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                                    Email address
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="you@company.com"
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="trade" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                                    Your Trade
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        id="trade"
                                                        required
                                                        value={trade}
                                                        onChange={(e) => setTrade(e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all appearance-none"
                                                    >
                                                        <option value="" disabled className="text-gray-500 dark:text-slate-500">Select your trade</option>
                                                        {TRADES.map((t) => (
                                                            <option key={t} value={t} className="dark:bg-slate-900 dark:text-white">{t}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500 dark:text-slate-400">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={status === 'submitting'}
                                                className="w-full bg-gray-900 dark:bg-teal-500 text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 dark:hover:bg-teal-400 transition-colors shadow-lg shadow-gray-900/20 dark:shadow-teal-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                            >
                                                {status === 'submitting' ? (
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                ) : (
                                                    'Join Waiting List'
                                                )}
                                            </button>
                                        </form>
                                        <p className="text-xs text-center text-gray-400 dark:text-slate-500 mt-4">
                                            No spam, ever. Unsubscribe at any time.
                                        </p>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
