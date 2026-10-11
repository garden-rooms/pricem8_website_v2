import { useEffect, useState } from 'react'

// The trader's postal address, which UK rules require this site to publish (it appears only in the
// Terms and Privacy pages). It is shown to people but made awkward for scrapers, in layers:
//
//   - not present in the page's HTML source or in the pre-rendered snapshot: it is put on the page
//     by script after load, and never for automated browsers (navigator.webdriver is true under
//     Puppeteer, which is what scripts/prerender.mjs and many scrapers drive);
//   - not stored as plain text in the JavaScript bundle (base64), so a text search of the bundle
//     doesn't find it either, and not in the source repository at all (see ENCODED_ADDRESS);
//   - marked data-nosnippet, and the pages that show it are noindex (see useSEO's `index: false`
//     and the X-Robots-Tag header in vercel.json).
//
// This reduces casual harvesting. It cannot stop a determined scraper, and it is not a substitute
// for choosing an address you are comfortable having public. Anyone with JavaScript disabled is
// pointed to the support email instead.
// Supplied at build time from the VITE_BUSINESS_ADDRESS_B64 setting (base64 of the address), NOT
// written in this file: this repository is public, so the address must never be committed to it.
// If the setting is missing the component falls back to the email route.
const ENCODED_ADDRESS = import.meta.env.VITE_BUSINESS_ADDRESS_B64 as string | undefined

export default function BusinessAddress() {
    const [address, setAddress] = useState<string | null>(null)

    useEffect(() => {
        if (typeof navigator !== 'undefined' && navigator.webdriver) return
        const timer = setTimeout(() => {
            try {
                if (ENCODED_ADDRESS) setAddress(atob(ENCODED_ADDRESS))
            } catch {
                // Malformed setting: stay on the email fallback rather than show garbage.
            }
        }, 300)
        return () => clearTimeout(timer)
    }, [])

    return (
        <address data-nosnippet style={{ fontStyle: 'normal' }}>
            {address ?? (
                <>
                    Shown in your browser. If you can't see it, email{' '}
                    <a href="mailto:support@pricem8.uk">support@pricem8.uk</a> and I'll send it to you.
                </>
            )}
        </address>
    )
}
