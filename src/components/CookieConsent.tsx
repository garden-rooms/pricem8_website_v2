import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { disableTrackers, loadTrackers, trackPageView, trackStartTrialClick } from '../lib/analytics'
import { getConsent, onConsentChange, onCookieSettingsRequested, setConsent } from '../lib/consent'

// One component does the whole job so nothing about tracking is scattered through the site:
//   - shows the consent banner until the visitor has chosen (and again if they reopen it from the
//     footer's "Cookie settings");
//   - loads Google Analytics and the Meta Pixel ONLY after "Accept", and stops them on "Decline";
//   - sends a page view on every route change and counts clicks on the Start free trial buttons.
// Mounted once inside the router (src/App.tsx).
export default function CookieConsent() {
    const location = useLocation()
    const [choice, setChoice] = useState(() => getConsent())
    const [open, setOpen] = useState(false)

    // Never shown to automated browsers: the pre-render step would otherwise bake the banner into
    // the static HTML. Real visitors see it after mount.
    useEffect(() => {
        if (typeof navigator !== 'undefined' && navigator.webdriver) return
        if (getConsent() === null) setOpen(true)
    }, [])

    useEffect(() => onCookieSettingsRequested(() => setOpen(true)), [])

    useEffect(
        () =>
            onConsentChange((value) => {
                setChoice(value)
                setOpen(false)
                if (value === 'granted') {
                    // The page view itself is sent by the route effect below once `choice` updates.
                    loadTrackers()
                } else {
                    disableTrackers()
                }
            }),
        [],
    )

    // Already accepted on an earlier visit: load straight away.
    useEffect(() => {
        if (choice === 'granted') loadTrackers()
        // Only on first mount; later changes come through the consent event above.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Single-page app: report each navigation after the first.
    useEffect(() => {
        if (choice === 'granted') trackPageView(location.pathname + location.search)
    }, [location.pathname, location.search, choice])

    // Start free trial buttons are plain links to the app's sign-up page.
    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (choice !== 'granted') return
            const link = (event.target as Element | null)?.closest?.('a[href*="app.pricem8.uk/signup"]')
            if (link) trackStartTrialClick()
        }
        document.addEventListener('click', handler)
        return () => document.removeEventListener('click', handler)
    }, [choice])

    if (!open) return null

    const button: React.CSSProperties = {
        flex: '1 1 160px',
        padding: '12px 18px',
        font: '600 0.95rem Archivo, system-ui, sans-serif',
        cursor: 'pointer',
        border: '1px solid #e6e3da',
        background: '#e6e3da',
        color: '#1a2118',
    }

    return (
        <div
            role="dialog"
            aria-label="Cookie choices"
            style={{
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1000,
                background: '#1a2118',
                color: '#e6e3da',
                padding: '18px 20px',
                borderTop: '1px solid #575f50',
                fontFamily: 'Newsreader, Georgia, serif',
                fontSize: '1rem',
                lineHeight: 1.5,
            }}
        >
            <div style={{ maxWidth: 920, margin: '0 auto', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <p style={{ margin: 0, flex: '2 1 360px' }}>
                    Can I use analytics and advertising cookies? They tell me which pages help and whether my ads reach
                    anyone. Nothing is set unless you say yes, and you can change your mind any time from the footer.{' '}
                    <Link to="/privacy-policy" style={{ color: 'inherit', textDecoration: 'underline' }}>
                        Details
                    </Link>
                </p>
                <div style={{ display: 'flex', gap: 10, flex: '1 1 340px' }}>
                    <button type="button" style={button} onClick={() => setConsent('denied')}>
                        No thanks
                    </button>
                    <button type="button" style={button} onClick={() => setConsent('granted')}>
                        Yes, that's fine
                    </button>
                </div>
            </div>
        </div>
    )
}
