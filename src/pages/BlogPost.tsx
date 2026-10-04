import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import blogPosts from '../data/blogPosts.json'
import SiteSheetHeader from '../components/site-sheet/Header'
import SiteSheetFooter from '../components/site-sheet/Footer'
import BlogChart from '../components/BlogChart'
import MarkupMarginCalculator from '../components/MarkupMarginCalculator'
import { useSEO, useJsonLd } from '../hooks/useSEO'
import { ArrowLeft, Twitter, Linkedin, Facebook, Copy, Check } from 'lucide-react'
import '../styles/site-sheet.css'

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>()
    const navigate = useNavigate()

    const post = blogPosts.find(p => p.slug === slug)
    const [copied, setCopied] = useState(false)
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

    const handleShare = async (platform?: string) => {
        if (!post) return

        if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`, '_blank')
            return
        }
        if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank')
            return
        }
        if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank')
            return
        }
        if (platform === 'copy') {
            try {
                await navigator.clipboard.writeText(currentUrl)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                console.error('Error copying to clipboard:', err)
            }
        }
    }

    useEffect(() => {
        if (!post) {
            navigate('/blog', { replace: true })
        }
    }, [post, navigate])

    useSEO({
        title: post?.seo.title ?? 'The Site Office – PriceM8',
        description: post?.seo.description ?? '',
        path: `/blog/${slug ?? ''}`,
    })

    // Article schema with a named, real author (Michal) — an E-E-A-T/AEO signal that this is
    // written by a working tradesperson, not an anonymous content team or an AI.
    useJsonLd('article-jsonld', post ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: { '@type': 'Person', name: 'Michal', jobTitle: 'Founder, PriceM8' },
        publisher: { '@type': 'Organization', name: 'PriceM8' },
    } : {})

    if (!post) return null

    return (
        <div className="ps-page">
            <SiteSheetHeader />

            <main id="top">
                <section className="hero" style={{ paddingBottom: 0 }}>
                    <div className="wrap" style={{ maxWidth: 720 }}>
                        <Link to="/blog" className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24, color: 'var(--ink-2)' }}>
                            <ArrowLeft className="w-4 h-4" /> Back to The Site Office
                        </Link>

                        <div className="post-meta mono" style={{ marginBottom: 14 }}>
                            <span>{post.category}</span>
                            <span>·</span>
                            <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            <span>·</span>
                            <span>{post.readTime}</span>
                        </div>

                        <h1 className="disp">{post.title}</h1>
                        {post.excerpt && <p className="lede" style={{ marginTop: 18 }}>{post.excerpt}</p>}
                    </div>
                </section>

                <section>
                    <div className="wrap" style={{ maxWidth: 720 }}>
                        <div className="prose">
                            {post.content.map((block: any, index: number) => {
                                if (block.type === 'paragraph') {
                                    const isImportant = block.text?.includes('<strong>') && (block.text?.includes('Rule of thumb') || block.text?.includes('Important'))

                                    if (isImportant) {
                                        return (
                                            <div key={index} className="note-box" style={{ margin: '2em 0' }}>
                                                <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: block.text || '' }} />
                                            </div>
                                        )
                                    }

                                    return <p key={index} dangerouslySetInnerHTML={{ __html: block.text || '' }} />
                                }
                                if (block.type === 'heading') {
                                    return <h3 key={index}>{block.text?.replace('✅', '').trim()}</h3>
                                }
                                if (block.type === 'list') {
                                    return (
                                        <ul key={index}>
                                            {block.items?.map((item: string, i: number) => (
                                                <li key={i} dangerouslySetInnerHTML={{ __html: item || '' }} />
                                            ))}
                                        </ul>
                                    )
                                }
                                if (block.type === 'chart') {
                                    return (
                                        <BlogChart
                                            key={index}
                                            title={block.title}
                                            data={block.data}
                                            type={block.chartType}
                                            subtitle={block.subtitle}
                                        />
                                    )
                                }
                                if (block.type === 'calculator') {
                                    if (block.variant === 'markup-margin') {
                                        return <MarkupMarginCalculator key={index} />
                                    }
                                }
                                return null
                            })}
                        </div>

                        <div className="sheet-rule" style={{ marginTop: 48, marginBottom: 20 }}>
                            <span className="mono lbl">Share</span><span className="ticks"></span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                            <button onClick={() => handleShare('twitter')} className="btn ghost small">
                                <Twitter className="w-4 h-4" /> Twitter
                            </button>
                            <button onClick={() => handleShare('linkedin')} className="btn ghost small">
                                <Linkedin className="w-4 h-4" /> LinkedIn
                            </button>
                            <button onClick={() => handleShare('facebook')} className="btn ghost small">
                                <Facebook className="w-4 h-4" /> Facebook
                            </button>
                            <button onClick={() => handleShare('copy')} className="btn ghost small">
                                {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy link</>}
                            </button>
                        </div>
                    </div>
                </section>

                <section id="trial" className="close" style={{ marginTop: 40 }}>
                    <div className="wrap">
                        <h2 className="disp" style={{ fontSize: 'var(--fs-h2)' }}>Price your next job properly.</h2>
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
