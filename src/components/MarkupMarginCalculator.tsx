import { useState, useEffect } from 'react'
import { Calculator, AlertTriangle, CheckCircle2 } from 'lucide-react'

export default function MarkupMarginCalculator() {
    const [cost, setCost] = useState<number | ''>(5000)
    const [percentage, setPercentage] = useState<number | ''>(20)
    const [annualJobs, setAnnualJobs] = useState<number | ''>(50)

    // Markup Method (WRONG)
    const [markupPrice, setMarkupPrice] = useState(0)
    const [markupProfit, setMarkupProfit] = useState(0)
    const [markupMargin, setMarkupMargin] = useState(0)

    // Margin Method (RIGHT)
    const [marginPrice, setMarginPrice] = useState(0)
    const [marginProfit, setMarginProfit] = useState(0)
    const [marginActualMargin, setMarginActualMargin] = useState(0)

    // Annual impact
    const [annualDifference, setAnnualDifference] = useState(0)

    useEffect(() => {
        const numCost = typeof cost === 'number' ? cost : 0
        const numPercentage = typeof percentage === 'number' ? percentage : 0
        const numAnnualJobs = typeof annualJobs === 'number' ? annualJobs : 0

        if (numCost > 0 && numPercentage > 0) {
            const markupAmount = numCost * (numPercentage / 100)
            const markupQuote = numCost + markupAmount
            const markupProfitAmount = markupAmount
            const markupMarginPercentage = (markupProfitAmount / markupQuote) * 100

            setMarkupPrice(markupQuote)
            setMarkupProfit(markupProfitAmount)
            setMarkupMargin(markupMarginPercentage)

            const marginQuote = numCost / (1 - numPercentage / 100)
            const marginProfitAmount = marginQuote - numCost
            const marginMarginPercentage = (marginProfitAmount / marginQuote) * 100

            setMarginPrice(marginQuote)
            setMarginProfit(marginProfitAmount)
            setMarginActualMargin(marginMarginPercentage)

            if (numAnnualJobs > 0) {
                const profitDiff = marginProfitAmount - markupProfitAmount
                setAnnualDifference(profitDiff * numAnnualJobs)
            } else {
                setAnnualDifference(0)
            }
        } else {
            setMarkupPrice(0)
            setMarkupProfit(0)
            setMarkupMargin(0)
            setMarginPrice(0)
            setMarginProfit(0)
            setMarginActualMargin(0)
            setAnnualDifference(0)
        }
    }, [cost, percentage, annualJobs])

    const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setCost(value === '' ? '' : parseFloat(value))
    }

    const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPercentage(value === '' ? '' : parseFloat(value))
    }

    const handleAnnualJobsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setAnnualJobs(value === '' ? '' : parseInt(value))
    }

    const row = (label: string, value: string, bold?: boolean) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0' }}>
            <span style={{ color: 'var(--ink-2)' }}>{label}</span>
            <span style={{ fontWeight: bold ? 700 : 500, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        </div>
    )

    return (
        <div className="form-card" style={{ margin: '2.5em 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <Calculator className="w-5 h-5" style={{ color: 'var(--cedar)' }} />
                <h3 className="disp" style={{ fontSize: '1.2rem' }}>Markup vs margin calculator</h3>
            </div>
            <p className="mono" style={{ marginBottom: 24 }}>See the real cost of getting this maths wrong</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
                <div className="field" style={{ marginBottom: 0 }}>
                    <label>Average job cost (£)</label>
                    <input type="number" value={cost} onChange={handleCostChange} placeholder="5000" min="0" step="100" />
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                    <label>Target percentage (%)</label>
                    <input type="number" value={percentage} onChange={handlePercentageChange} placeholder="20" min="0" max="100" step="1" />
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                    <label>Jobs per year</label>
                    <input type="number" value={annualJobs} onChange={handleAnnualJobsChange} placeholder="50" min="0" step="1" />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: annualJobs && annualJobs > 0 ? 20 : 0 }}>
                <div style={{ border: '1px solid var(--rule)', background: 'var(--paper)', padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <AlertTriangle className="w-4 h-4" style={{ color: 'var(--ink-2)' }} />
                        <h4 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: '.95rem' }}>Markup method — wrong</h4>
                    </div>
                    {row('Quote price', `£${markupPrice.toFixed(2)}`, true)}
                    {row('Profit', `£${markupProfit.toFixed(2)}`)}
                    <div style={{ borderTop: '1px solid var(--rule-soft)', marginTop: 4 }}>
                        {row('Actual margin', `${markupMargin.toFixed(1)}%`, true)}
                    </div>
                    <p className="mono" style={{ marginTop: 10 }}>Misses the {percentage}% target</p>
                </div>

                <div style={{ border: '1px solid var(--cedar-soft)', background: 'var(--plate)', padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--cedar)' }} />
                        <h4 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: '.95rem', color: 'var(--cedar)' }}>Margin method — right</h4>
                    </div>
                    {row('Quote price', `£${marginPrice.toFixed(2)}`, true)}
                    {row('Profit', `£${marginProfit.toFixed(2)}`)}
                    <div style={{ borderTop: '1px solid var(--rule-soft)', marginTop: 4 }}>
                        {row('Actual margin', `${marginActualMargin.toFixed(1)}%`, true)}
                    </div>
                    <p className="mono" style={{ marginTop: 10, color: 'var(--cedar)' }}>Hits the {percentage}% target</p>
                </div>
            </div>

            {annualJobs && annualJobs > 0 && (
                <div className="note-box" style={{ display: 'block' }}>
                    <h4 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: 12 }}>Annual impact</h4>
                    {row('Profit per job (markup method)', `£${markupProfit.toFixed(2)}`)}
                    {row('Profit per job (margin method)', `£${marginProfit.toFixed(2)}`)}
                    {row('Difference per job', `£${(marginProfit - markupProfit).toFixed(2)}`)}
                    {row('Number of jobs per year', `×${annualJobs}`)}
                    <div style={{ borderTop: '1.5px solid var(--ink)', marginTop: 10, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontWeight: 700 }}>Annual profit left on the table</span>
                        <span className="price-fig" style={{ fontSize: '1.6rem' }}>
                            £{Math.abs(annualDifference).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
