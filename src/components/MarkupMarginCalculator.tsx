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
            // Markup Method (Adding percentage to cost)
            const markupAmount = numCost * (numPercentage / 100)
            const markupQuote = numCost + markupAmount
            const markupProfitAmount = markupAmount
            const markupMarginPercentage = (markupProfitAmount / markupQuote) * 100

            setMarkupPrice(markupQuote)
            setMarkupProfit(markupProfitAmount)
            setMarkupMargin(markupMarginPercentage)

            // Margin Method (Dividing by complement)
            const marginQuote = numCost / (1 - numPercentage / 100)
            const marginProfitAmount = marginQuote - numCost
            const marginMarginPercentage = (marginProfitAmount / marginQuote) * 100

            setMarginPrice(marginQuote)
            setMarginProfit(marginProfitAmount)
            setMarginActualMargin(marginMarginPercentage)

            // Calculate annual difference
            if (numAnnualJobs > 0) {
                const profitDiff = marginProfitAmount - markupProfitAmount
                setAnnualDifference(profitDiff * numAnnualJobs)
            } else {
                setAnnualDifference(0)
            }
        } else {
            // Reset all values
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

    return (
        <div className="my-12 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-6 h-6" />
                    <h3 className="text-2xl font-bold">Markup vs Margin Calculator</h3>
                </div>
                <p className="text-teal-50">See the real cost of getting this math wrong</p>
            </div>

            {/* Inputs */}
            <div className="px-8 py-6 bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Average Job Cost (£)
                        </label>
                        <input
                            type="number"
                            value={cost}
                            onChange={handleCostChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                            placeholder="5000"
                            min="0"
                            step="100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Target Percentage (%)
                        </label>
                        <input
                            type="number"
                            value={percentage}
                            onChange={handlePercentageChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                            placeholder="20"
                            min="0"
                            max="100"
                            step="1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Jobs Per Year
                        </label>
                        <input
                            type="number"
                            value={annualJobs}
                            onChange={handleAnnualJobsChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                            placeholder="50"
                            min="0"
                            step="1"
                        />
                    </div>
                </div>
            </div>

            {/* Results Comparison */}
            <div className="px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Markup Method (Wrong) */}
                    <div className="border-2 border-red-200 dark:border-red-900/30 rounded-xl p-6 bg-red-50 dark:bg-red-900/10">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                            <h4 className="font-bold text-lg text-red-900 dark:text-red-200">Markup Method (WRONG)</h4>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 dark:text-gray-300">Quote Price:</span>
                                <span className="font-bold text-xl text-gray-900 dark:text-white">£{markupPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 dark:text-gray-300">Profit:</span>
                                <span className="font-semibold text-red-700 dark:text-red-400">£{markupProfit.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-red-200 dark:border-red-900/30 pt-3">
                                <span className="text-gray-700 dark:text-gray-300">Actual Margin:</span>
                                <span className="font-bold text-red-600 dark:text-red-400">{markupMargin.toFixed(1)}%</span>
                            </div>
                            <div className="mt-2 text-sm text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
                                ❌ You missed your {percentage}% target!
                            </div>
                        </div>
                    </div>

                    {/* Margin Method (Right) */}
                    <div className="border-2 border-green-200 dark:border-green-900/30 rounded-xl p-6 bg-green-50 dark:bg-green-900/10">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <h4 className="font-bold text-lg text-green-900 dark:text-green-200">Margin Method (RIGHT)</h4>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 dark:text-gray-300">Quote Price:</span>
                                <span className="font-bold text-xl text-gray-900 dark:text-white">£{marginPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 dark:text-gray-300">Profit:</span>
                                <span className="font-semibold text-green-700 dark:text-green-400">£{marginProfit.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-green-200 dark:border-green-900/30 pt-3">
                                <span className="text-gray-700 dark:text-gray-300">Actual Margin:</span>
                                <span className="font-bold text-green-600 dark:text-green-400">{marginActualMargin.toFixed(1)}%</span>
                            </div>
                            <div className="mt-2 text-sm text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                                ✅ You hit your {percentage}% target!
                            </div>
                        </div>
                    </div>
                </div>

                {/* Annual Impact */}
                {annualJobs && annualJobs > 0 && (
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border-2 border-orange-200 dark:border-orange-900/30 rounded-xl p-6">
                        <h4 className="font-bold text-lg text-orange-900 dark:text-orange-200 mb-4">💰 Annual Impact</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
                                <span>Profit per job (Markup Method):</span>
                                <span className="font-semibold">£{markupProfit.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
                                <span>Profit per job (Margin Method):</span>
                                <span className="font-semibold">£{marginProfit.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
                                <span>Difference per job:</span>
                                <span className="font-semibold text-orange-700 dark:text-orange-400">£{(marginProfit - markupProfit).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300 border-t border-orange-200 dark:border-orange-900/30 pt-3">
                                <span>Number of jobs per year:</span>
                                <span className="font-semibold">×{annualJobs}</span>
                            </div>
                            <div className="flex justify-between items-center border-t-2 border-orange-300 dark:border-orange-900/50 pt-4 mt-4">
                                <span className="font-bold text-lg text-orange-900 dark:text-orange-200">Annual Profit Loss:</span>
                                <span className="font-bold text-2xl text-orange-600 dark:text-orange-400">
                                    £{Math.abs(annualDifference).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className="mt-4 bg-orange-100 dark:bg-orange-900/30 p-4 rounded-lg">
                                <p className="text-sm text-orange-900 dark:text-orange-200 font-medium leading-relaxed">
                                    💡 <strong>That's pure profit you're leaving on the table every year</strong> by using the wrong formula.
                                    {annualDifference > 10000 && " That's enough for a family holiday, a new van, or serious savings."}
                                    {annualDifference > 5000 && annualDifference <= 10000 && " That could be your entire tool insurance and professional fees covered."}
                                    {annualDifference <= 5000 && " Even small mistakes add up over time."}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
