// Cookie / tracking consent for the marketing site. Nothing that sets a non-essential cookie
// (Google Analytics, the Meta Pixel) loads until a visitor has actively accepted — the UK's PECR
// rules require consent first, not an opt-out afterwards. Declining (or never answering) means no
// trackers.
//
// The choice is stored in a small cookie on the parent domain (.pricem8.uk) so the app at
// app.pricem8.uk can read the same answer and not ask again; localStorage is the fallback where the
// cookie can't be used (e.g. a *.vercel.app test address). The cookie records the CHOICE only.
// The app has a matching src/lib/consent.ts: keep the cookie name and values in step with it.
//
// Bump the storage key's version if the set of tools ever changes, so everyone is asked again.
const COOKIE_NAME = 'pricem8_consent'
const STORAGE_KEY = 'pricem8.cookieConsent.v1'
const CHANGE_EVENT = 'pricem8:consent-changed'
const OPEN_EVENT = 'pricem8:open-cookie-settings'
const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60

export type Consent = 'granted' | 'denied'

function cookieDomainAttribute(): string {
    return window.location.hostname.endsWith('pricem8.uk') ? '; domain=.pricem8.uk' : ''
}

function readCookie(): Consent | null {
    const match = document.cookie
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith(`${COOKIE_NAME}=`))
    const value = match?.slice(COOKIE_NAME.length + 1)
    return value === 'granted' || value === 'denied' ? value : null
}

export function getConsent(): Consent | null {
    const fromCookie = readCookie()
    if (fromCookie) return fromCookie
    try {
        const value = localStorage.getItem(STORAGE_KEY)
        return value === 'granted' || value === 'denied' ? value : null
    } catch {
        return null
    }
}

export function setConsent(value: Consent): void {
    document.cookie = `${COOKIE_NAME}=${value}; max-age=${ONE_YEAR_SECONDS}; path=/; SameSite=Lax; Secure${cookieDomainAttribute()}`
    try {
        localStorage.setItem(STORAGE_KEY, value)
    } catch {
        // Storage blocked: the cookie (or this page view) still carries the choice.
    }
    window.dispatchEvent(new CustomEvent<Consent>(CHANGE_EVENT, { detail: value }))
}

export function onConsentChange(callback: (value: Consent) => void): () => void {
    const handler = (event: Event) => callback((event as CustomEvent<Consent>).detail)
    window.addEventListener(CHANGE_EVENT, handler)
    return () => window.removeEventListener(CHANGE_EVENT, handler)
}

// Withdrawing consent has to be as easy as giving it, so the footer can reopen the banner.
export function requestCookieSettings(): void {
    window.dispatchEvent(new Event(OPEN_EVENT))
}

export function onCookieSettingsRequested(callback: () => void): () => void {
    window.addEventListener(OPEN_EVENT, callback)
    return () => window.removeEventListener(OPEN_EVENT, callback)
}
