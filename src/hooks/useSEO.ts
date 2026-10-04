import { useEffect } from 'react'

const SITE_URL = 'https://pricem8.uk'
const DEFAULT_IMAGE = `${SITE_URL}/images/founder-og.jpg`

interface SEOProps {
  title: string
  description: string
  /** Path from the site root, e.g. "/pricing" — used to build the canonical URL and og:url. */
  path: string
  image?: string
  /** Set false on pages that intentionally don't want to be indexed (none currently). */
  index?: boolean
}

function setMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Every page in the site calls this once on mount. It's the only thing standing in for real
// per-route meta tags until the prerender step ships static HTML per route (see
// scripts/prerender.mjs) — crawlers that execute JS see this; crawlers that don't will see
// the prerendered snapshot instead once that's wired in.
export function useSEO({ title, description, path, image, index = true }: SEOProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const ogImage = image ?? DEFAULT_IMAGE

    document.title = title
    setMetaByName('description', description)
    setMetaByName('robots', index ? 'index, follow' : 'noindex, nofollow')

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    setMetaByProperty('og:type', 'website')
    setMetaByProperty('og:site_name', 'PriceM8')
    setMetaByProperty('og:url', url)
    setMetaByProperty('og:title', title)
    setMetaByProperty('og:description', description)
    setMetaByProperty('og:image', ogImage)

    setMetaByName('twitter:card', 'summary_large_image')
    setMetaByName('twitter:url', url)
    setMetaByName('twitter:title', title)
    setMetaByName('twitter:description', description)
    setMetaByName('twitter:image', ogImage)

    window.scrollTo(0, 0)
  }, [title, description, path, image, index])
}

/** Injects a page-specific JSON-LD block, removing it on unmount so it doesn't leak onto other pages. */
export function useJsonLd(id: string, data: Record<string, unknown>) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
    return () => {
      document.getElementById(id)?.remove()
    }
  }, [id, data])
}
