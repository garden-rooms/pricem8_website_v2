import SiteSheetHeader from '../components/site-sheet/Header'
import SiteSheetFooter from '../components/site-sheet/Footer'
import { useSEO } from '../hooks/useSEO'
import '../styles/site-sheet.css'

const SEO_TITLE = 'Get paid by bank payment on your invoices (GoCardless) – PriceM8'
const SEO_DESCRIPTION =
    'How to connect GoCardless to PriceM8 and let customers pay your invoices straight from their bank app, with the invoice marked paid for you.'

// A plain-English user guide for the optional GoCardless bank-payment feature. Written to describe only
// what the app really does (Settings > Payment details, "Request payment via GoCardless", the "Pay now"
// button in emailed invoices, automatic "paid"); it is also the public user-guide page GoCardless asks
// for when reviewing PriceM8 as a partner. If the app's behaviour changes, change this too.
export default function GetPaidByBankGuide() {
    useSEO({ title: SEO_TITLE, description: SEO_DESCRIPTION, path: '/help/get-paid-by-bank-payment', index: true })

    return (
        <div className="ps-page">
            <SiteSheetHeader />

            <main id="top">
                <section>
                    <div className="wrap">
                        <p className="mono hero-eyebrow">Guide</p>
                        <h1 className="disp" style={{ fontSize: 'var(--fs-h2)', marginBottom: 32 }}>
                            Get paid by bank payment on your invoices
                        </h1>

                        <div className="prose">
                            <p>
                                PriceM8 can add a <strong>Pay now</strong> option to your invoices using GoCardless. Your customer pays straight from
                                their own banking app, the money goes to your bank account, and PriceM8 marks the invoice as paid for you. It is
                                optional, and you can keep using bank transfer, cash or cheque exactly as before.
                            </p>

                            <h3>How it works</h3>
                            <ul>
                                <li>
                                    Each payment is a <strong>one-off bank payment</strong> that your customer approves in their own banking app.
                                    There is no Direct Debit set-up and no mandate to sign.
                                </li>
                                <li>
                                    GoCardless takes the payment from the customer's bank and pays it out to your bank account. Their fee for each
                                    payment is set by GoCardless (see gocardless.com/pricing) and comes out of what they pay you.
                                </li>
                                <li>You never see or handle the customer's bank details. They choose their bank on GoCardless's secure page.</li>
                            </ul>

                            <h3>1. Connect GoCardless (once)</h3>
                            <ol>
                                <li>
                                    In PriceM8, open <strong>Settings</strong> and find <strong>GoCardless (bank-transfer payments)</strong> under{' '}
                                    <strong>Payment details</strong>.
                                </li>
                                <li>
                                    If you already have a GoCardless account, choose <strong>I already have a GoCardless account</strong> and sign in.
                                    If you don't, choose <strong>Create a GoCardless account</strong>: your business name and email are filled in for
                                    you.
                                </li>
                                <li>
                                    Approve the connection when GoCardless asks. You are brought back to PriceM8, which now shows{' '}
                                    <strong>Connected</strong>.
                                </li>
                                <li>
                                    GoCardless checks your business details before it can pay money out to your bank, and Settings shows where that
                                    has got to. When it says payouts are switched on you are all set. If it says GoCardless is reviewing your details
                                    there is nothing for you to do. If it says GoCardless needs more information, they will tell you what to send.
                                </li>
                            </ol>

                            <h3>2. Ask a customer to pay an invoice</h3>
                            <p>There are two ways, and both create the same secure payment page for the amount still owing.</p>
                            <ul>
                                <li>
                                    <strong>Email the invoice.</strong> When you send an invoice from PriceM8 and GoCardless is connected, the email
                                    and the PDF include a <strong>Pay now</strong> button.
                                </li>
                                <li>
                                    <strong>Send a link yourself.</strong> Open a sent invoice and choose{' '}
                                    <strong>Request payment via GoCardless</strong>. The payment page opens, and you can copy the link and send it by
                                    text or WhatsApp.
                                </li>
                            </ul>

                            <h3>3. What your customer sees</h3>
                            <p>
                                The customer opens the link, picks their bank, and approves the payment in their banking app. Their name and email
                                are filled in from your invoice, so there is little to type. When they are done they see a short confirmation page.
                            </p>

                            <h3>4. What happens next</h3>
                            <ul>
                                <li>
                                    The invoice in PriceM8 shows the payment's progress in plain English (for example <em>Payment in progress</em>,{' '}
                                    <em>Payment confirmed</em>, <em>Paid out to your bank</em>).
                                </li>
                                <li>
                                    As soon as GoCardless confirms the payment, PriceM8 marks the invoice <strong>Paid</strong> automatically. You
                                    don't need to do anything.
                                </li>
                                <li>
                                    On a paid invoice you can choose <strong>Send thank-you email</strong> to thank the customer, and ask for a Google
                                    review if you have added your review link in Settings.
                                </li>
                            </ul>

                            <h3>Deposits and part payments</h3>
                            <p>
                                If a customer has already paid a deposit and you have recorded it on the invoice (<strong>Record a payment</strong>),
                                the Pay now button and the payment link ask for the <strong>balance</strong> only, not the whole invoice again.
                            </p>

                            <h3>Good to know</h3>
                            <ul>
                                <li>
                                    <strong>Refunds</strong> are not handled inside PriceM8. If you need to refund a customer, do it from your GoCardless
                                    account.
                                </li>
                                <li>
                                    A payment can fail, for example if the customer's bank declines it or they close the page without approving. The
                                    invoice then stays unpaid, and you can send a new link.
                                </li>
                                <li>
                                    Your GoCardless account is yours. PriceM8 only creates payment requests on it and reads their status, so it can mark
                                    the right invoice paid.
                                </li>
                            </ul>

                            <h3>Need help?</h3>
                            <p>
                                Email <a href="mailto:support@pricem8.uk">support@pricem8.uk</a> and include the invoice number, and we'll help you
                                out.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <SiteSheetFooter />
        </div>
    )
}
