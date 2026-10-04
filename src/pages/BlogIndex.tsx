import { Link } from 'react-router-dom'
import blogPosts from '../data/blogPosts.json'
import SiteSheetHeader from '../components/site-sheet/Header'
import SiteSheetFooter from '../components/site-sheet/Footer'
import { useSEO } from '../hooks/useSEO'
import '../styles/site-sheet.css'

const SEO_TITLE = 'The Site Office – PriceM8'
const SEO_DESCRIPTION = 'Pricing advice and real numbers for UK landscapers and garden room builders — written by someone who prices real jobs, not a content team.'

export default function BlogIndex() {
    useSEO({ title: SEO_TITLE, description: SEO_DESCRIPTION, path: '/blog' })

    const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div className="ps-page">
            <SiteSheetHeader />

            <main id="top">
                <section className="hero" style={{ paddingBottom: 0 }}>
                    <div className="wrap">
                        <p className="mono hero-eyebrow">The Site Office</p>
                        <h1 className="disp">Pricing advice from someone who actually prices jobs.</h1>
                        <p className="lede" style={{ marginTop: 22 }}>
                            Real numbers, real mistakes, no content-team filler.
                        </p>
                    </div>
                </section>

                <section>
                    <div className="wrap">
                        <ul className="post-list">
                            {sortedPosts.map((post) => (
                                <li key={post.id}>
                                    <Link to={`/blog/${post.slug}`}>
                                        <div className="post-meta mono">
                                            <span>{post.category}</span>
                                            <span>·</span>
                                            <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            <span>·</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h2 className="disp">{post.title}</h2>
                                        <p className="post-excerpt">{post.excerpt}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>

            <SiteSheetFooter />
        </div>
    )
}
