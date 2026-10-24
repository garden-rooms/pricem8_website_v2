import Walkthrough, { WalkthroughSection } from './Walkthrough'

const SECTIONS: WalkthroughSection[] = [
  {
    id: 'pay',
    label: 'A — Ask for the balance',
    title: 'Part paid already? Ask for what is left.',
    lede: "A real invoice in PriceM8: £11,354 in total, a £4,000 deposit already recorded, and one button that asks for the £7,354 still due by bank payment through GoCardless.",
    video: {
      src: 'get-paid-bank-payment.mp4',
      poster: 'get-paid-bank-payment-poster.webp',
      label: 'Requesting the balance of a part-paid invoice by bank payment with GoCardless',
      duration: 'PT17S',
    },
    steps: [
      {
        heading: 'A part-paid invoice',
        body: 'The invoice list shows where each one stands. This one is marked Part Paid, with £7,354 still due.',
        image: 'pay-invoice-list.webp',
        alt: 'The PriceM8 invoice list with one invoice for a test client marked Part Paid and 7,354 pounds still due.',
      },
      {
        heading: 'The total, the deposit and the balance',
        body: 'Record each payment as it arrives: a deposit, a stage payment, the balance. The invoice keeps the total, what has been paid and the balance due: £11,354, £4,000 and £7,354 here. Part payments never change the VAT on the invoice.',
        image: 'pay-balance.webp',
        alt: 'An invoice with a subtotal of 9,462 pounds, VAT of 1,892 pounds, an invoice total of 11,354 pounds, a 4,000 pound deposit received by bank transfer, and a balance due of 7,354 pounds.',
      },
      {
        heading: 'Request the balance',
        body: 'The GoCardless button asks for the balance, not the whole invoice. It opens GoCardless\'s payment page in a new tab, and you can copy the link to send to your customer instead. Once they have paid, the invoice is marked paid for you.',
        image: 'pay-request.webp',
        alt: 'The foot of an invoice with a GoCardless payment section and a button reading Request the 7,354 pound balance via GoCardless.',
      },
      {
        heading: 'What your customer sees',
        body: 'GoCardless\'s own page: your business name, the invoice number and the amount. The customer picks their bank and approves a one-off payment in their own banking app. There is no Direct Debit to set up, and you never see their bank details.',
        image: 'pay-gocardless-page.webp',
        alt: 'The GoCardless payment page titled Make a one-off payment, showing PriceM8, invoice INV-0001, the amount due and an email address box.',
      },
    ],
    note: "Recorded in GoCardless's test mode with a made-up client, so no real money moved. Bank payment is optional: you can keep taking bank transfer, cash or cheque exactly as before.",
  },
]

export default function GetPaidByBankPayment() {
  return (
    <Walkthrough
      path="/walkthroughs/get-paid-by-bank-payment"
      seoTitle="Get paid by bank payment from a part-paid invoice – PriceM8 walkthrough"
      seoDescription="Watch a part-paid invoice go from a recorded deposit to a GoCardless bank payment request for the balance, and see the page your customer pays on."
      eyebrow="Walkthrough · 3 · Getting paid"
      heading="From a deposit to the balance, paid from their banking app."
      lede="Most jobs are paid in more than one go. This is how PriceM8 handles the deposit, then asks for the rest by bank payment."
      sections={SECTIONS}
      next={[
        { to: '/help/get-paid-by-bank-payment', label: 'Guide', text: 'Set up bank payments, step by step' },
        { to: '/walkthroughs/quote-to-invoice', label: 'Before', text: 'From the numbers to a quote you can send' },
      ]}
      closing={{
        heading: 'Get the next one paid faster.',
        text: 'Take the deposit, send the balance link with the invoice, and let the invoice mark itself paid.',
      }}
    />
  )
}
