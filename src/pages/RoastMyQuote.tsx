import React, { useState, useRef } from 'react'
import { Upload, Send, AlertCircle, CheckCircle2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import pageSpec from '../data/pageSpec.json'
import { useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function RoastMyQuote() {
    const [email, setEmail] = useState('')
    const [quoteText, setQuoteText] = useState('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const generateUploadUrl = useMutation(api.roast.generateUploadUrl);
    const submitRoast = useAction(api.roast.submit);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            let storageId = undefined;

            // 1. Upload file if exists
            if (selectedFile) {
                const postUrl = await generateUploadUrl();
                const result = await fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": selectedFile.type },
                    body: selectedFile,
                });

                if (!result.ok) throw new Error("Upload failed");
                const { storageId: id } = await result.json();
                storageId = id;
            }

            // 2. Submit roast
            await submitRoast({
                email,
                quoteText,
                storageId
            });

            setIsSuccess(true)
            setEmail('')
            setQuoteText('')
            setSelectedFile(null)
        } catch (error) {
            console.error(error)
            alert("Something went wrong. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-teal-500/30">
            <Navbar section={pageSpec.sections.find(s => s.id === 'navbar') as any} />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-teal-500/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-3xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                            </span>
                            Free Quote Audit
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            Is your quote <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">losing you money?</span>
                        </h1>

                        <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto">
                            Upload your anonymous quote or paste the text. We'll roast it (kindly) and tell you exactly where your profit is leaking.
                        </p>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-2xl">
                        {isSuccess ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Roast Incoming!</h3>
                                <p className="text-slate-400">
                                    We've received your submission. Keep an eye on your inbox – we'll be in touch shortly with your audit.
                                </p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="mt-8 text-teal-400 hover:text-teal-300 font-medium transition-colors"
                                >
                                    Submit another quote
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="quote" className="block text-sm font-medium text-slate-300 mb-2">
                                        Paste your quote text or description
                                    </label>
                                    <textarea
                                        id="quote"
                                        rows={6}
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all resize-none"
                                        placeholder="e.g. 'Bathroom renovation: £4,500. Includes labour and materials...'"
                                        value={quoteText}
                                        onChange={(e) => setQuoteText(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Or upload a screenshot/PDF (Optional)
                                    </label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer group ${selectedFile
                                                ? 'border-teal-500 bg-teal-500/10'
                                                : 'border-slate-700 hover:border-teal-500/50 hover:bg-slate-800/50'
                                            }`}
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*,.pdf"
                                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                        />
                                        {selectedFile ? (
                                            <>
                                                <CheckCircle2 className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                                                <p className="text-teal-400 font-medium">{selectedFile.name}</p>
                                                <p className="text-xs text-slate-400 mt-1">Click to change file</p>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-slate-500 group-hover:text-teal-400 mx-auto mb-3 transition-colors" />
                                                <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                                                    Click to upload or drag and drop
                                                </p>
                                                <p className="text-xs text-slate-600 mt-1">PNG, JPG or PDF up to 5MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                        Where should we send the roast?
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex gap-3 items-start">
                                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-amber-200/80">
                                        <strong>Privacy Note:</strong> Please remove any client names or addresses before submitting. We only want to see the numbers and descriptions!
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        'Sending...'
                                    ) : (
                                        <>
                                            Roast My Quote <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-4">
                            <div className="text-3xl font-bold text-white mb-1">100%</div>
                            <div className="text-sm text-slate-500">Free Audit</div>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl font-bold text-white mb-1">24h</div>
                            <div className="text-sm text-slate-500">Turnaround</div>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl font-bold text-white mb-1">£££</div>
                            <div className="text-sm text-slate-500">Profit Found</div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer section={pageSpec.sections.find(s => s.id === 'footer') as any} />
        </div>
    )
}
