# Landing Page - Kampanie Reklamowe

## Warianty Trade-Specific

Strona landingowa `/lp/quote-in-minutes` automatycznie dostosowuje się do zawodu użytkownika poprzez parametr URL `?trade=`.

### Dostępne warianty:

#### 1. Landscaping (Landscapers)
```
/lp/quote-in-minutes?trade=landscaping
```

**Zmiany:**
- Hero headline: "Landscaping quotes in minutes — not hours."
- Step 1: "Pick the Landscaping pack"
- Step 2: "Enter patio dimensions or decking area"
- Trade section: Pokazuje tylko "Landscapers"
- Meta title: "Landscapers Quotes in Minutes - PriceM8"

#### 2. Building (Builders)
```
/lp/quote-in-minutes?trade=building
```

**Zmiany:**
- Hero headline: "Extension quotes without guesswork."
- Step 1: "Pick the Building pack"
- Step 2: "Enter wall lengths or room dimensions"
- Trade section: Pokazuje tylko "Builders"
- Meta title: "Builders Quotes in Minutes - PriceM8"

#### 3. Plumbing (Plumbers)
```
/lp/quote-in-minutes?trade=plumbing
```

**Zmiany:**
- Hero headline: "Bathroom quotes in minutes — not hours."
- Step 1: "Pick the Plumbing pack"
- Step 2: "Enter bathroom layout or boiler specs"
- Trade section: Pokazuje tylko "Plumbers"
- Meta title: "Plumbers Quotes in Minutes - PriceM8"

#### 4. Electrical (Electricians)
```
/lp/quote-in-minutes?trade=electrical
```

**Zmiany:**
- Hero headline: "Rewire quotes in minutes — not hours."
- Step 1: "Pick the Electrical pack"
- Step 2: "Enter circuit counts or room layouts"
- Trade section: Pokazuje tylko "Electricians"
- Meta title: "Electricians Quotes in Minutes - PriceM8"

### Wersja ogólna (domyślna)
```
/lp/quote-in-minutes
```

Używa ogólnego copy bez specjalizacji na konkretny zawód.

---

## A/B Testing Hero Headlines

Możesz łączyć warianty trade-specific z A/B testingiem hero:

### Wariant A (safer, high trust)
```
/lp/quote-in-minutes?trade=landscaping&variant=a
```
Hero: "Stop guessing. Price jobs with confidence — in minutes."

### Wariant B (stronger for cold ads)
```
/lp/quote-in-minutes?trade=landscaping&variant=b
```
Hero: "The no-guesswork pricing system for UK tradies."

---

## Przykłady użycia w kampaniach

### Facebook Ads / Google Ads

**Kampania dla Landscapers:**
- Landing URL: `https://pricem8.uk/lp/quote-in-minutes?trade=landscaping`
- Ad copy: "Landscaping quotes in minutes — not hours. Build accurate quotes using live merchant prices."
- Targetowanie: Landscapers, Garden Designers, Patio Installers

**Kampania dla Builders:**
- Landing URL: `https://pricem8.uk/lp/quote-in-minutes?trade=building`
- Ad copy: "Extension quotes without guesswork. Price structural work accurately."
- Targetowanie: Builders, Extension Specialists, General Contractors

**Kampania dla Plumbers:**
- Landing URL: `https://pricem8.uk/lp/quote-in-minutes?trade=plumbing`
- Ad copy: "Bathroom quotes in minutes — not hours. Stop guessing on materials and labour."
- Targetowanie: Plumbers, Bathroom Fitters, Heating Engineers

**Kampania dla Electricians:**
- Landing URL: `https://pricem8.uk/lp/quote-in-minutes?trade=electrical`
- Ad copy: "Rewire quotes in minutes — not hours. Accurate pricing for every circuit."
- Targetowanie: Electricians, NICEIC Registered, Domestic Electricians

---

## Tracking i Analytics

Wszystkie CTA mają tracking events:
- `hero_primary_cta` - Główny CTA w hero
- `how_it_works_cta` - CTA po sekcji "How it works"
- `bonus_stack_cta` - CTA po sekcji bonusów
- `guarantee_cta` - CTA w sekcji gwarancji
- `final_cta` - Final CTA
- `sticky_mobile_cta` - Sticky CTA na mobile

Możesz śledzić konwersje per wariant używając UTM parameters:
```
/lp/quote-in-minutes?trade=landscaping&utm_source=facebook&utm_campaign=landscapers_q1_2025
```

---

## Best Practices

1. **Używaj trade-specific wariantów** dla targetowanych kampanii - wyższa konwersja
2. **Testuj A/B** - porównuj `variant=a` vs `variant=b` dla każdego zawodu
3. **Spójność ad copy z landing page** - ad copy powinien pasować do hero headline
4. **Mobile-first** - większość ruchu z reklam to mobile, sticky CTA jest kluczowe
5. **Tracking** - używaj UTM parameters do śledzenia źródeł ruchu

---

## Dodawanie nowych wariantów

Aby dodać nowy zawód, edytuj `QuoteInMinutesLanding.tsx`:

1. Dodaj nowy wpis do `tradeVariants`:
```typescript
newTrade: {
  hero: {
    headline: "Your trade-specific headline",
    subheadline: "Build one real quote today..."
  },
  tradeName: "Trade Name",
  exampleLanguage: {
    step1: "Pick the [Trade] pack",
    step2: "Enter [trade-specific examples]",
    example: "example quote type",
    material: "example materials"
  }
}
```

2. Użyj w URL: `/lp/quote-in-minutes?trade=newTrade`

---

## Notatki

- Wszystkie warianty używają tego samego flow i CTAs
- Bonus stack, guarantee, i founder section są identyczne dla wszystkich wariantów
- Trade section automatycznie pokazuje tylko wybrany zawód (lub wszystkie 4 jeśli brak parametru)
- Meta descriptions są automatycznie dostosowywane do zawodu
