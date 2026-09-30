# PriceM8 Marketing Website

A modern, responsive marketing website built with React + Vite + TypeScript + Tailwind CSS.

## Features

- 🚀 Built with Vite for fast development and optimized builds
- ⚛️ React 18 with TypeScript for type safety
- 🎨 Tailwind CSS for modern, responsive styling
- 📱 Fully responsive, mobile-first design
- 🎯 SEO optimized with proper meta tags
- ♿ Accessible components with semantic HTML
- 🎭 Smooth scroll navigation
- 🎨 Modern SaaS aesthetic with gradients and shadows

## Project Structure

```
pricem8-website/
├── public/
│   └── images/          # Placeholder images directory
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── CardsShowcase.tsx
│   │   ├── TradeIcons.tsx
│   │   ├── PricingTable.tsx
│   │   ├── Testimonials.tsx
│   │   ├── LargeCTA.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   └── Home.tsx     # Main page component
│   ├── types/
│   │   └── index.ts    # TypeScript type definitions
│   ├── utils/
│   │   └── icons.tsx   # SVG icon components
│   ├── data/
│   │   └── pageSpec.json  # Page configuration JSON
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Components

All components are located in `/src/components/`:

- **Navbar**: Fixed navigation bar with smooth scroll links
- **Hero**: Two-column hero section with CTAs and benefits
- **FeatureGrid**: Grid of feature cards with icons and bullets
- **CardsShowcase**: Three-card showcase for product features
- **TradeIcons**: Grid of trade icons
- **PricingTable**: Three-tier pricing table
- **Testimonials**: Customer testimonial cards
- **LargeCTA**: Large call-to-action section
- **Footer**: Footer with links and social icons

## Configuration

The page content is driven by `/src/data/pageSpec.json`. Modify this file to update:
- Brand colors and styling
- SEO meta tags
- Section content and structure
- Navigation links
- Pricing plans
- Testimonials

## Brand Colors

- Primary: `#00B8A9` (teal)
- Primary Dark: `#009C8F`
- Accent: `#0E172A` (dark blue)
- Background Light: `#F8FAFC`
- Background Dark: `#0F172A`

## Images

Place your images in `/public/images/` directory. The following images are referenced:
- `hero-app-mockup-1.png`
- `material-scraper-mockup.png`
- `quote-builder-mockup.png`
- `pack-editor-mockup.png`
- `avatar-plumber.png`
- `avatar-electrician.png`
- `avatar-landscaper.png`

If images are missing, placeholder images will be automatically generated.

## License

MIT

