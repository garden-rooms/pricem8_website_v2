import { Link } from 'react-router-dom'
import { ArrowRight, Calculator, Flame, BookOpen, Smartphone } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'
import '../styles/site-sheet.css'

const SEO_TITLE = 'PriceM8'
const SEO_DESCRIPTION = 'Quoting software for UK landscapers and garden room builders.'

export default function LinkInBio() {
    // noindex: a thin social-bio link list, not content worth competing with Home in search.
    useSEO({ title: SEO_TITLE, description: SEO_DESCRIPTION, path: '/links', index: false })

    const links = [
        {
            title: 'Roast My Quote',
            subtitle: 'A free audit of your pricing',
            icon: <Flame className="w-5 h-5" />,
            url: '/roast-my-quote',
            primary: true,
        },
        {
            title: 'Free Overheads Calculator',
            subtitle: 'Find your true day rate',
            icon: <Calculator className="w-5 h-5" />,
            url: '/blog/how-much-to-charge',
        },
        {
            title: 'Try PriceM8 Free',
            subtitle: '14-day trial, card required',
            icon: <Smartphone className="w-5 h-5" />,
            url: 'https://app.pricem8.uk/signup',
        },
        {
            title: 'The Site Office',
            subtitle: 'Pricing advice, written by hand',
            icon: <BookOpen className="w-5 h-5" />,
            url: '/blog',
        },
    ]

    return (
        <div className="ps-page">
            <div className="bio-page">
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <a className="mark" href="/" style={{ color: 'var(--band-ink)', justifyContent: 'center', marginBottom: 14 }}>
                        PriceM8<i></i>
                    </a>
                    <p className="mono" style={{ color: 'var(--band-ink-2)', maxWidth: 260, margin: '0 auto' }}>
                        Quoting software for UK landscapers and garden room builders
                    </p>
                </div>

                <div className="bio-links">
                    {links.map((link, index) => {
                        const isExternal = link.url.startsWith('http')
                        const content = (
                            <>
                                <span className="ic">{link.icon}</span>
                                <span>
                                    <span className="t" style={{ display: 'block' }}>{link.title}</span>
                                    <span className="s" style={{ display: 'block' }}>{link.subtitle}</span>
                                </span>
                                <ArrowRight className="w-4 h-4 arw" />
                            </>
                        )
                        return isExternal ? (
                            <a key={index} href={link.url} className={`bio-link${link.primary ? ' primary' : ''}`}>
                                {content}
                            </a>
                        ) : (
                            <Link key={index} to={link.url} className={`bio-link${link.primary ? ' primary' : ''}`}>
                                {content}
                            </Link>
                        )
                    })}
                </div>

                <footer style={{ marginTop: 56, textAlign: 'center' }}>
                    <p className="mono" style={{ color: 'var(--band-ink-2)' }}>
                        © {new Date().getFullYear()} PriceM8
                    </p>
                </footer>
            </div>
        </div>
    )
}
