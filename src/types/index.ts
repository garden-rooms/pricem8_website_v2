export interface NavLink {
  label: string
  href: string
}

export interface Button {
  label: string
  href: string
  variant?: 'solid' | 'outline'
}

export interface HeroSection {
  id: string
  type: 'hero'
  layout: 'two-column'
  badge?: string
  eyebrow?: string
  title: string
  highlight?: string
  subtitle: string
  primaryCta: Button
  secondaryCta?: Button
  benefits?: string[]
  note?: string
  rightImage: string
}

export interface Feature {
  icon: string
  title: string
  description: string
  bullets?: string[]
}

export interface FeatureGridSection {
  id: string
  type: 'feature-grid'
  title: string
  subtitle?: string
  columns: number
  features: Feature[]
}

export interface Card {
  title: string
  subtitle: string
  image: string
}

export interface CardsShowcaseSection {
  id: string
  type: 'cards-3'
  title: string
  subtitle?: string
  cards: Card[]
}

export interface TradeItem {
  icon: string
  label: string
}

export interface TradeIconsSection {
  id: string
  type: 'trade-icons'
  badge?: string
  title: string
  subtitle?: string
  items: TradeItem[]
}

export interface BillingOption {
  id: string
  label: string
  description: string
  badge?: string
}

export interface BillingConfig {
  default: string
  options: BillingOption[]
}

export interface PricingPlan {
  name: string
  description: string
  priceMonthly: string
  priceYearly: string
  monthlyNote?: string
  yearlyNote?: string
  badge?: string
  features: string[]
  ctaLabel: string
  ctaHref?: string
  highlight: boolean
}

export interface PricingTableSection {
  id: string
  type: 'pricing-table'
  badge?: string
  title: string
  subtitle?: string
  billing?: BillingConfig
  plans: PricingPlan[]
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  image?: string
  rating?: number
}

export interface TestimonialsSection {
  id: string
  type: 'testimonials'
  badge?: string
  title: string
  subtitle?: string
  items: Testimonial[]
}

export interface CTASection {
  id: string
  type: 'cta-large'
  title: string
  subtitle?: string
  primaryCta: Button
  secondaryCta?: Button
  benefits?: string[]
}

export interface NavbarSection {
  id: string
  type: 'navbar'
  logoText: string
  links: NavLink[]
  rightButtons: Button[]
}

export interface FooterSection {
  id: string
  type: 'footer'
  brandText: string
  columns: {
    [key: string]: string[]
  }
  social: {
    platform: string
    url: string
  }[]
  copyright: string
  tagline: string
}

// About page section types
export interface SimpleHeroSection {
  id: string
  type: 'simple-hero'
  title: string
  subtitle: string
  image?: string
  primaryCta?: Button
  secondaryCta?: Button
  note?: string
}

export interface TextBlockSection {
  id: string
  type: 'text-block'
  title: string
  paragraphs: string[]
}

export interface BulletedListSection {
  id: string
  type: 'bulleted-list'
  title: string
  items: string[]
}

export interface FounderNoteSection {
  id: string
  type: 'founder-note'
  quote: string
  author: string
}

export interface FeatureSection {
  id: string
  type: 'feature-section'
  title: string
  subtitle?: string
  paragraphs?: string[]
  bullets?: string[]
  image?: string
  icon?: string
  cta?: Button
}

export interface FAQSection {
  id: string
  type: 'faq'
  title: string
  items: { question: string; answer: string }[]
}

export interface TextWithBulletsSection {
  id: string
  type: 'text-with-bullets'
  title: string
  paragraphs: string[]
  bullets: string[]
}

export interface Step {
  title: string
  body: string
}

export interface StepsSection {
  id: string
  type: 'steps'
  title: string
  steps: Step[]
}

export interface VideoSection {
  id: string
  type: 'video'
  title?: string
  subtitle?: string
  videoSrc: string
}

export interface StatsSection {
  id: string
  type: 'stats'
  title?: string
  subtitle?: string
  stats: Array<{
    value: string
    label: string
    description?: string
  }>
  backgroundColor?: 'light' | 'dark' | 'gradient'
}

export interface FullWidthImageSection {
  id: string
  type: 'full-width-image'
  title?: string
  subtitle?: string
  image: string
  imageAlt?: string
  overlay?: boolean
  contentPosition?: 'top' | 'center' | 'bottom'
  cta?: {
    label: string
    href: string
  }
}

export interface AsymmetricGridSection {
  id: string
  type: 'asymmetric-grid'
  title?: string
  subtitle?: string
  items: Array<{
    title: string
    description: string
    image?: string
    icon?: string
    size?: 'small' | 'medium' | 'large'
  }>
}

export interface FounderHighlightSection {
  id: string
  type: 'founder-highlight'
  title: string
  paragraphs: string[]
  link: Button
  image?: string
}

export interface MiniPricingPlan {
  name: string
  description: string
  icon?: string
}

export interface MiniPricingSection {
  id: string
  type: 'mini-pricing'
  title: string
  subtitle?: string
  plans: MiniPricingPlan[]
  cta: Button
}

export interface TrustedBySection {
  id: string
  type: 'trusted-by'
  title?: string
  logos: string[]
}

export interface ComparisonSection {
  id: string
  type: 'comparison'
  title: string
  subtitle?: string
  table: {
    headers: string[]
    rows: {
      feature: string
      pricem8: string | boolean
      typical: string | boolean
    }[]
  }
  explainers: {
    title: string
    description: string
    icon?: string
  }[]
}

export interface PricingPack {
  name: string
  price?: string // Legacy support
  priceMonthly?: string
  priceYearly?: string
  description: string
  features?: string[]
  badge?: string
  highlight?: boolean
  seeMoreLink?: string
}

export interface PricingBundle {
  name: string
  price?: string // Legacy support
  priceMonthly?: string
  priceYearly?: string
  items: string[]
}

export interface ModularPricingSection {
  id: string
  type: 'modular-pricing'
  core: {
    title: string
    price?: string // Legacy support
    priceMonthly?: string
    priceYearly?: string
    description: string
    features: string[]
    cta: Button
    note?: string
  }
  packs: {
    title: string
    subtitle?: string
    items: PricingPack[]
  }
  bundles: {
    title: string
    items: PricingBundle[]
  }
  allIn: {
    title: string
    price?: string // Legacy support
    priceMonthly?: string
    priceYearly?: string
    description: string
    features: string[]
    cta: Button
    badge?: string
  }
  specialist: {
    title: string
    price: string
    description: string
    features: string[]
    note?: string
  }
}

export interface FreeAddon {
  name: string
  worth: string
  problem: string
  solution: string
  outcome: string
  features: string[]
  icon: string
}

export interface FreeAddonsSection {
  id: string
  type: 'free-addons'
  title: string
  subtitle: string
  badge?: string
  addons: FreeAddon[]
  cta: {
    label: string
    href: string
    note?: string
  }
}

export type Section =
  | NavbarSection
  | HeroSection
  | FeatureGridSection
  | CardsShowcaseSection
  | TradeIconsSection
  | PricingTableSection
  | TestimonialsSection
  | CTASection
  | FooterSection
  | SimpleHeroSection
  | TextBlockSection
  | BulletedListSection
  | FounderNoteSection
  | FeatureSection
  | FAQSection
  | TextWithBulletsSection
  | StepsSection
  | FounderHighlightSection
  | MiniPricingSection
  | TrustedBySection
  | ComparisonSection
  | VideoSection
  | ModularPricingSection
  | FreeAddonsSection
  | StatsSection
  | FullWidthImageSection
  | AsymmetricGridSection

export interface PageSpec {
  page: string
  brand?: {
    name: string
    primaryColor: string
    primaryColorDark: string
    accentColor: string
    backgroundLight: string
    backgroundDark: string
    rounded: string
  }
  seo: {
    title: string
    description: string
  }
  sections: Section[]
}

export interface AboutPageSpec {
  page: string
  seo: {
    title: string
    description: string
  }
  sections: (SimpleHeroSection | TextBlockSection | BulletedListSection | FounderNoteSection)[]
}

export interface FeaturesPageSpec {
  page: string
  seo: {
    title: string
    description: string
  }
  sections: (SimpleHeroSection | FeatureSection | CTASection)[]
}

export interface PricingPageSpec {
  page: string
  seo: {
    title: string
    description: string
  }
  sections: (SimpleHeroSection | PricingTableSection | FeatureSection | FAQSection | CTASection | ComparisonSection | ModularPricingSection | FreeAddonsSection)[]
}

