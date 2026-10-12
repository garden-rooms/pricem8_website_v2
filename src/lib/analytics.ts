// Google Analytics 4 and the Meta Pixel, loaded only after consent (see consent.ts). The two IDs
// are public identifiers (they appear in every visitor's page source), not secrets. They are the
// SAME properties the old site used, so history continues.
const GA_MEASUREMENT_ID = 'G-WYH1QNWCY6'
const META_PIXEL_ID = '903165502492501'

type AnyWindow = Window & {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown }
    _fbq?: unknown
    [key: string]: unknown
}

let loaded = false

function installGoogle(w: AnyWindow) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    w.dataLayer = w.dataLayer || []
    w.gtag = function gtag() {
        // gtag.js expects the real `arguments` object, not an array.
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments)
    }
    w.gtag('js', new Date())
    // Page views are sent by hand on every route change (the site is a single-page app), so the
    // automatic one is switched off; IPs are anonymised.
    w.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false, anonymize_ip: true })
}

function installMeta(w: AnyWindow) {
    if (w.fbq) return
    const fbq = function (...args: unknown[]) {
        if (fbq.callMethod) fbq.callMethod(...args)
        else fbq.queue!.push(args)
    } as NonNullable<AnyWindow['fbq']>
    w.fbq = fbq
    if (!w._fbq) w._fbq = fbq
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)

    fbq('init', META_PIXEL_ID)
}

export function loadTrackers(): void {
    if (loaded || typeof window === 'undefined') return
    loaded = true
    const w = window as unknown as AnyWindow
    w[`ga-disable-${GA_MEASUREMENT_ID}`] = false
    installGoogle(w)
    installMeta(w)
}

export function trackPageView(path: string): void {
    if (!loaded) return
    const w = window as unknown as AnyWindow
    w.gtag?.('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title })
    w.fbq?.('track', 'PageView')
}

// A click on any "Start free trial" button (they all go to the app's sign-up page). This is an
// ENGAGEMENT signal only, deliberately not a conversion and not a standard "Lead": plenty of people
// click and never sign up, and optimising ads on clicks teaches the platform to find more
// clickers. The real conversions (sign-up completed, trial started) are reported by the app itself
// (app src/lib/analytics.ts), where they actually happen.
export function trackStartTrialClick(): void {
    if (!loaded) return
    const w = window as unknown as AnyWindow
    w.gtag?.('event', 'start_trial_click', { link_url: 'https://app.pricem8.uk/signup' })
    w.fbq?.('trackCustom', 'StartTrialClick')
}

// Called when consent is withdrawn after trackers were loaded. A script already on the page can't
// be unloaded, so this stops it sending, asks both platforms to treat the visitor as not
// consenting, and removes the cookies they set. A reload fully clears the page.
export function disableTrackers(): void {
    if (typeof window === 'undefined') return
    const w = window as unknown as AnyWindow
    w[`ga-disable-${GA_MEASUREMENT_ID}`] = true
    w.fbq?.('consent', 'revoke')
    const host = window.location.hostname
    const roots = [host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
    for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0].trim()
        if (/^(_ga|_gid|_gat|_fbp|_fbc)/.test(name)) {
            for (const domain of roots) {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`
            }
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        }
    }
}
