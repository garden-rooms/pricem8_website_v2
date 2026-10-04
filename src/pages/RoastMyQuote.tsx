import React, { useRef, useState } from 'react'
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useMutation, useAction } from 'convex/react'
import { api } from '../../convex/_generated/api'
import SiteSheetHeader from '../components/site-sheet/Header'
import SiteSheetFooter from '../components/site-sheet/Footer'
import { useSEO } from '../hooks/useSEO'
import '../styles/site-sheet.css'

const SEO_TITLE = 'Roast My Quote – PriceM8'
const SEO_DESCRIPTION =
  "Paste in a quote you've sent, or upload it. I'll look at it myself and tell you where the profit's leaking — free, no strings."

export default function RoastMyQuote() {
  const [email, setEmail] = useState('')
  const [quoteText, setQuoteText] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const generateUploadUrl = useMutation(api.roast.generateUploadUrl)
  const submitRoast = useAction(api.roast.submit)

  useSEO({ title: SEO_TITLE, description: SEO_DESCRIPTION, path: '/roast-my-quote' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let storageId = undefined

      if (selectedFile) {
        const postUrl = await generateUploadUrl()
        const result = await fetch(postUrl, {
          method: 'POST',
          headers: { 'Content-Type': selectedFile.type },
          body: selectedFile,
        })

        if (!result.ok) throw new Error('Upload failed')
        const { storageId: id } = await result.json()
        storageId = id
      }

      await submitRoast({ email, quoteText, storageId })

      setIsSuccess(true)
      setEmail('')
      setQuoteText('')
      setSelectedFile(null)
    } catch (error) {
      console.error(error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="ps-page">
      <SiteSheetHeader />

      <main id="top">
        <section className="hero">
          <div className="wrap" style={{ maxWidth: 720 }}>
            <p className="mono hero-eyebrow">Free quote audit · I read it myself</p>
            <h1 className="disp" style={{ fontSize: 'var(--fs-h2)' }}>Is your quote losing you money?</h1>
            <p className="lede" style={{ marginTop: 18 }}>
              Paste one in, or upload it. No AI summary — I look at it myself and tell you
              where the profit's leaking.
            </p>

            <div className="specstrip" style={{ marginTop: 32 }}>
              <ul>
                <li><b>100%</b><span className="mono">Free audit</span></li>
                <li><b>24h</b><span className="mono">Typical turnaround</span></li>
                <li><b>By hand</b><span className="mono">Not an AI summary</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{ paddingTop: 0 }}>
          <div className="wrap" style={{ maxWidth: 720 }}>
            <div className="form-card">
              {isSuccess ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <CheckCircle2 className="w-10 h-10" style={{ color: 'var(--cedar)', margin: '0 auto 16px' }} />
                  <h3 className="disp" style={{ fontSize: 'var(--fs-h3)', marginBottom: 10 }}>Roast incoming</h3>
                  <p className="lede" style={{ maxWidth: 'none' }}>
                    Got it. Keep an eye on your inbox — I'll be in touch shortly with your audit.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="btn ghost"
                    style={{ marginTop: 24 }}
                  >
                    Submit another quote
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label htmlFor="quote">Paste your quote text or description</label>
                    <textarea
                      id="quote"
                      rows={6}
                      placeholder="e.g. 'Patio job: £4,500. Includes labour and materials...'"
                      value={quoteText}
                      onChange={(e) => setQuoteText(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field">
                    <label>Or upload a screenshot/PDF (optional)</label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`upload-zone${selectedFile ? ' has-file' : ''}`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        style={{ display: 'none' }}
                        accept="image/*,.pdf"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      />
                      {selectedFile ? (
                        <>
                          <CheckCircle2 className="w-6 h-6" style={{ color: 'var(--cedar)', margin: '0 auto 10px' }} />
                          <p style={{ fontWeight: 600 }}>{selectedFile.name}</p>
                          <p className="mono" style={{ marginTop: 6 }}>Click to change file</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-6 h-6" style={{ color: 'var(--ink-2)', margin: '0 auto 10px' }} />
                          <p>Click to upload or drag and drop</p>
                          <p className="mono" style={{ marginTop: 6 }}>PNG, JPG or PDF up to 5MB</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="email">Where should I send the roast?</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="note-box" style={{ marginBottom: 24 }}>
                    <AlertCircle className="w-5 h-5" style={{ color: 'var(--cedar)', flexShrink: 0, marginTop: 2 }} />
                    <p>
                      <strong style={{ color: 'var(--ink)' }}>Privacy note:</strong> strip out any client
                      names or addresses before submitting. I only need the numbers and descriptions.
                    </p>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                    {isSubmitting ? 'Sending…' : <>Roast my quote <span className="arw">→</span></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteSheetFooter />
    </div>
  )
}
