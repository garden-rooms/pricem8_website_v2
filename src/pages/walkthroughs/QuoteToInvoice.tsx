import Walkthrough, { WalkthroughSection } from './Walkthrough'

const SECTIONS: WalkthroughSection[] = [
  {
    id: 'quote',
    label: 'A — From the price to the paperwork',
    title: 'The same job, from the breakdown to the invoice.',
    lede: "Picking up the 51.5 m² block paving job from the map walkthrough: what sits behind the price, what the customer sees, and the invoice made from it when they say yes.",
    video: {
      src: 'quote-to-invoice.mp4',
      poster: 'quote-to-invoice-poster.webp',
      label: 'A block paving quote, its breakdown, and converting it to an invoice',
      duration: 'PT57S',
    },
    steps: [
      {
        heading: 'The breakdown behind the price',
        body: 'Every line the price is made of, with its quantity and unit cost: 51.5 m² of block, 13 bulk bags of sub-base, bedding and jointing sand, the pin kerb and its haunching, cement, the digger hire and the labour hours. Any figure can be overwritten with what you actually pay.',
        image: 'quote-breakdown.webp',
        alt: 'The Your breakdown view listing materials such as concrete block paving, MOT Type 1 sub-base and pin kerb edging, each with an editable quantity and unit cost.',
      },
      {
        heading: 'What the customer sees',
        body: 'The client quote has your business name, the quote number and the work written out in plain English, not the sums behind it. Print or save it as a PDF, or send it by email. The Site notes box above it is private: for access, what the client wants and options to quote, and it is never shown to them.',
        image: 'map-quote.webp',
        alt: 'The client quote view with a private site notes box above a quote numbered Q-0003 for a block paving job priced at 9,024 pounds.',
      },
      {
        heading: 'When they say yes',
        body: 'Mark the quote as won, or lost, or make a new version to price a second option. Then Convert to invoice turns it into an invoice with nothing retyped.',
        image: 'quote-actions.webp',
        alt: 'The foot of a quote showing the materials and labour lines, a waste disposal line for a grab lorry, and buttons for Mark as won, Mark as lost, Create new version and Convert to invoice.',
      },
    ],
  },
]

export default function QuoteToInvoice() {
  return (
    <Walkthrough
      path="/walkthroughs/quote-to-invoice"
      seoTitle="From a measured job to a quote and an invoice – PriceM8 walkthrough"
      seoDescription="Watch a block paving job go from the breakdown behind the price to the client quote, with private site notes, a PDF or email, and a one-click invoice."
      eyebrow="Walkthrough · 2 · Quotes and invoices"
      heading="From the numbers to a quote you can send."
      lede="Pricing is only half of it. This is what happens next: the version your customer reads, and the invoice you don't have to retype."
      sections={SECTIONS}
      next={[
        { to: '/walkthroughs/measure-a-garden-on-the-map', label: 'Before', text: 'Measure it from the map, then price it' },
        { to: '/help/get-paid-by-bank-payment', label: 'After', text: 'Get paid by bank payment on your invoices' },
      ]}
      closing={{
        heading: 'Send the next quote the same day.',
        text: 'Price it on site, check the breakdown, and send the PDF before you have left the drive.',
      }}
    />
  )
}
