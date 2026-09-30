import { useState, useEffect } from 'react'
import { Plus, Trash2, Users, ChevronDown, ChevronUp, Info, Smartphone } from 'lucide-react'

// Constants for 2024/25 Tax Year
const EMPLOYERS_NI_THRESHOLD = 9100
const EMPLOYERS_NI_RATE = 0.138
const PENSION_RATE = 0.03
const PENSION_THRESHOLD = 6240

// Personal Tax Constants
const PERSONAL_ALLOWANCE = 12570
const BASIC_RATE_LIMIT = 50270
const HIGHER_RATE_LIMIT = 125140

// Sole Trader NI (Class 4)
const CLASS_4_LOWER_LIMIT = 12570
const CLASS_4_UPPER_LIMIT = 50270
const CLASS_4_RATE_MAIN = 0.06
const CLASS_4_RATE_UPPER = 0.02

// Income Tax Rates
const INCOME_TAX_BASIC = 0.20
const INCOME_TAX_HIGHER = 0.40
const INCOME_TAX_ADDITIONAL = 0.45

// Corp Tax
const CORP_TAX_SMALL_PROFIT_RATE = 0.19
const CORP_TAX_MAIN_RATE = 0.25
const CORP_TAX_LOWER_THRESHOLD = 50000

// Dividend Tax
const DIVIDEND_ALLOWANCE = 500
const DIVIDEND_TAX_BASIC = 0.0875
const DIVIDEND_TAX_HIGHER = 0.3375
const DIVIDEND_TAX_ADDITIONAL = 0.3935

type Employee = {
    id: string
    salary: number | ''
}

type CustomOverhead = {
    id: string
    label: string
    value: number | ''
}

type RateBreakdown = {
    name: string
    costPerDay: number
    costPerHour: number
    chargePerDay: number
    chargePerHour: number
}

export default function OverheadsCalculator() {
    // State for inputs
    const [employmentType, setEmploymentType] = useState<'sole_trader' | 'limited_company'>('sole_trader')
    const [targetTakeHome, setTargetTakeHome] = useState<number | ''>(40000)

    // Employees
    const [employees, setEmployees] = useState<Employee[]>([])

    // Overheads (Monthly)
    const [vanCost, setVanCost] = useState<number | ''>(400)
    const [toolsCost, setToolsCost] = useState<number | ''>(100)
    const [insuranceCost, setInsuranceCost] = useState<number | ''>(50)
    const [marketingCost, setMarketingCost] = useState<number | ''>(50)
    const [accountantCost, setAccountantCost] = useState<number | ''>(100)
    const [otherOverheads, setOtherOverheads] = useState<number | ''>(50)

    // Custom Overheads
    const [customOverheads, setCustomOverheads] = useState<CustomOverhead[]>([])

    // Time Off (Days per year)
    const [holidays, setHolidays] = useState<number | ''>(28)
    const [sickDays, setSickDays] = useState<number | ''>(5)
    const [weatherDays, setWeatherDays] = useState<number | ''>(5)
    const [adminDays, setAdminDays] = useState<number | ''>(24) // Only for Owner
    const [billableHoursPerDay, setBillableHoursPerDay] = useState<number | ''>(8)

    // Profit Margin
    const [profitMargin, setProfitMargin] = useState(20)

    // UI State
    const [showTaxBreakdown, setShowTaxBreakdown] = useState(false)
    const [showCostBreakdown, setShowCostBreakdown] = useState(false)

    // Derived Values
    const [results, setResults] = useState({
        totalOverheads: 0,
        employersCosts: 0,
        totalSalaries: 0,
        totalNiPension: 0,
        grossRevenueRequired: 0,
        taxBreakdown: {
            incomeTax: 0,
            nationalInsurance: 0,
            corporationTax: 0,
            dividendTax: 0,
            totalTax: 0
        },
        ownerBillableDays: 0,
        employeeBillableDays: 0,
        totalBillableDays: 0,
        trueDailyCost: 0,
        chargeOutRate: 0,
        individualRates: [] as RateBreakdown[]
    })

    const addEmployee = () => {
        setEmployees([...employees, { id: Math.random().toString(36).substr(2, 9), salary: 30000 }])
    }

    const removeEmployee = (id: string) => {
        setEmployees(employees.filter(e => e.id !== id))
    }

    const updateEmployeeSalary = (id: string, salary: number | '') => {
        setEmployees(employees.map(e => e.id === id ? { ...e, salary } : e))
    }

    const addCustomOverhead = () => {
        setCustomOverheads([...customOverheads, { id: Math.random().toString(36).substr(2, 9), label: 'New Expense', value: 0 }])
    }

    const removeCustomOverhead = (id: string) => {
        setCustomOverheads(customOverheads.filter(o => o.id !== id))
    }

    const updateCustomOverhead = (id: string, field: 'label' | 'value', value: string | number) => {
        setCustomOverheads(customOverheads.map(o => o.id === id ? { ...o, [field]: value } : o))
    }

    // --- Tax Calculation Logic ---

    const calculateSoleTraderTax = (profit: number) => {
        // 1. Class 4 NI
        let class4NI = 0
        if (profit > CLASS_4_LOWER_LIMIT) {
            const mainBand = Math.min(profit, CLASS_4_UPPER_LIMIT) - CLASS_4_LOWER_LIMIT
            class4NI += mainBand * CLASS_4_RATE_MAIN
        }
        if (profit > CLASS_4_UPPER_LIMIT) {
            const upperBand = profit - CLASS_4_UPPER_LIMIT
            class4NI += upperBand * CLASS_4_RATE_UPPER
        }

        // 2. Income Tax
        let adjustedPersonalAllowance = PERSONAL_ALLOWANCE
        if (profit > 100000) {
            adjustedPersonalAllowance = Math.max(0, PERSONAL_ALLOWANCE - (profit - 100000) / 2)
        }

        let incomeTax = 0
        const taxableIncome = Math.max(0, profit - adjustedPersonalAllowance)

        const basicRateBandSize = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE

        let remainingTaxable = taxableIncome

        // Basic Rate
        const basicTaxable = Math.min(remainingTaxable, basicRateBandSize)
        incomeTax += basicTaxable * INCOME_TAX_BASIC
        remainingTaxable -= basicTaxable

        // Higher Rate (Simplified)
        const higherRateBandSize = HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT
        const higherTaxable = Math.min(remainingTaxable, higherRateBandSize)
        incomeTax += higherTaxable * INCOME_TAX_HIGHER
        remainingTaxable -= higherTaxable

        // Additional Rate
        incomeTax += remainingTaxable * INCOME_TAX_ADDITIONAL

        return { incomeTax, class4NI }
    }

    // Helper to calculate Net from Gross for Sole Trader
    const getNetFromGrossSoleTrader = (grossProfit: number) => {
        const { incomeTax, class4NI } = calculateSoleTraderTax(grossProfit)
        return grossProfit - incomeTax - class4NI
    }

    // Helper to calculate Net from Gross for Ltd Co
    const getNetFromGrossLtdCo = (companyProfitBeforeTax: number) => {
        // 1. Corp Tax
        let corpTaxRate = CORP_TAX_SMALL_PROFIT_RATE
        if (companyProfitBeforeTax > CORP_TAX_LOWER_THRESHOLD) {
            corpTaxRate = CORP_TAX_MAIN_RATE // Estimating high for safety
        }
        const corpTax = companyProfitBeforeTax * corpTaxRate
        const distributableProfit = companyProfitBeforeTax - corpTax

        // 2. Personal Tax (Salary + Dividends)
        const salary = PERSONAL_ALLOWANCE
        const dividends = distributableProfit
        const taxableDividends = Math.max(0, dividends - DIVIDEND_ALLOWANCE)

        let dividendTax = 0
        let remainingDividends = taxableDividends

        // Basic Rate Band remaining
        const basicBandRemaining = Math.max(0, BASIC_RATE_LIMIT - salary)
        const dividendsInBasic = Math.min(remainingDividends, basicBandRemaining)
        dividendTax += dividendsInBasic * DIVIDEND_TAX_BASIC
        remainingDividends -= dividendsInBasic

        // Higher Rate Band remaining
        const higherBandRemaining = Math.max(0, HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT)
        const dividendsInHigher = Math.min(remainingDividends, higherBandRemaining)
        dividendTax += dividendsInHigher * DIVIDEND_TAX_HIGHER
        remainingDividends -= dividendsInHigher

        // Additional Rate
        dividendTax += remainingDividends * DIVIDEND_TAX_ADDITIONAL

        return {
            netIncome: salary + dividends - dividendTax,
            corpTax,
            dividendTax,
            incomeTax: 0,
            nationalInsurance: 0
        }
    }

    // Iterative solver to find required Gross Profit to hit Target Take Home
    const findRequiredGrossProfit = (targetNet: number, type: 'sole_trader' | 'limited_company') => {
        let low = targetNet
        let high = targetNet * 2.5
        let mid = 0
        let iterations = 0

        while (iterations < 20) {
            mid = (low + high) / 2

            let net = 0
            if (type === 'sole_trader') {
                net = getNetFromGrossSoleTrader(mid)
            } else {
                const result = getNetFromGrossLtdCo(mid)
                net = result.netIncome
            }

            if (Math.abs(net - targetNet) < 5) break

            if (net < targetNet) low = mid
            else high = mid

            iterations++
        }
        return mid
    }


    useEffect(() => {
        // 1. Calculate Annual Overheads
        const fixedMonthlyOverheads = Number(vanCost) + Number(toolsCost) + Number(insuranceCost) + Number(marketingCost) + Number(accountantCost) + Number(otherOverheads)
        const customMonthlyOverheads = customOverheads.reduce((sum, item) => sum + Number(item.value), 0)
        const totalMonthlyOverheads = fixedMonthlyOverheads + customMonthlyOverheads
        const annualOverheads = totalMonthlyOverheads * 12

        // 2. Calculate Billable Days
        const weekends = 52 * 2
        const commonDaysOff = weekends + Number(holidays) + Number(sickDays) + Number(weatherDays)

        // Owner has Admin days, Employees do not (usually)
        const ownerBillableDays = Math.max(0, 365 - commonDaysOff - Number(adminDays))
        const employeeBillableDays = Math.max(0, 365 - commonDaysOff)

        const totalBillableDays = ownerBillableDays + (employeeBillableDays * employees.length)

        const ownerBillableHours = ownerBillableDays * Number(billableHoursPerDay)
        const employeeBillableHours = employeeBillableDays * Number(billableHoursPerDay)

        // 3. Calculate Overhead Share Per Person
        // We split fixed overheads equally across the team (Owner + Employees)
        const teamSize = 1 + employees.length
        const overheadSharePerPerson = annualOverheads / teamSize

        // 4. Calculate Individual Rates
        const individualRates: RateBreakdown[] = []

        // --- Owner Rates ---
        let requiredBusinessProfit = 0
        let taxDetails = { incomeTax: 0, nationalInsurance: 0, corporationTax: 0, dividendTax: 0, totalTax: 0 }

        if (employmentType === 'sole_trader') {
            requiredBusinessProfit = findRequiredGrossProfit(Number(targetTakeHome), 'sole_trader')
            const taxes = calculateSoleTraderTax(requiredBusinessProfit)
            taxDetails.incomeTax = taxes.incomeTax
            taxDetails.nationalInsurance = taxes.class4NI
            taxDetails.totalTax = taxes.incomeTax + taxes.class4NI
        } else {
            const directorSalary = PERSONAL_ALLOWANCE
            const directorErNI = Math.max(0, directorSalary - EMPLOYERS_NI_THRESHOLD) * EMPLOYERS_NI_RATE
            const requiredCompanyProfit = findRequiredGrossProfit(Number(targetTakeHome), 'limited_company')
            const taxes = getNetFromGrossLtdCo(requiredCompanyProfit)

            taxDetails.corporationTax = taxes.corpTax
            taxDetails.dividendTax = taxes.dividendTax
            taxDetails.totalTax = taxes.corpTax + taxes.dividendTax

            requiredBusinessProfit = directorSalary + directorErNI + requiredCompanyProfit
        }

        // Owner Total Cost = Required Revenue + Overhead Share
        const ownerTotalCost = requiredBusinessProfit + overheadSharePerPerson
        const ownerCostPerDay = ownerBillableDays > 0 ? ownerTotalCost / ownerBillableDays : 0
        const ownerCostPerHour = ownerBillableHours > 0 ? ownerTotalCost / ownerBillableHours : 0

        individualRates.push({
            name: 'You (Owner)',
            costPerDay: ownerCostPerDay,
            costPerHour: ownerCostPerHour,
            chargePerDay: ownerCostPerDay * (1 + profitMargin / 100),
            chargePerHour: ownerCostPerHour * (1 + profitMargin / 100)
        })

        // --- Employee Rates ---
        let totalEmployeeCosts = 0
        let totalSalaries = 0
        let totalNiPension = 0

        employees.forEach((emp, index) => {
            const salary = Number(emp.salary)
            const niableEarnings = Math.max(0, salary - EMPLOYERS_NI_THRESHOLD)
            const employersNI = niableEarnings * EMPLOYERS_NI_RATE
            const pension = Math.max(0, salary - PENSION_THRESHOLD) * PENSION_RATE
            const empTotalCost = salary + employersNI + pension + overheadSharePerPerson

            totalEmployeeCosts += salary + employersNI + pension
            totalSalaries += salary
            totalNiPension += employersNI + pension

            const empCostPerDay = employeeBillableDays > 0 ? empTotalCost / employeeBillableDays : 0
            const empCostPerHour = employeeBillableHours > 0 ? empTotalCost / employeeBillableHours : 0

            individualRates.push({
                name: `Employee ${index + 1}`,
                costPerDay: empCostPerDay,
                costPerHour: empCostPerHour,
                chargePerDay: empCostPerDay * (1 + profitMargin / 100),
                chargePerHour: empCostPerHour * (1 + profitMargin / 100)
            })
        })

        // 5. Total Revenue Required (Aggregate for Summary)
        const totalAnnualRevenueRequired = annualOverheads + totalEmployeeCosts + requiredBusinessProfit

        // 6. Average Daily Rates (for the big display)
        const trueDailyCost = totalBillableDays > 0 ? totalAnnualRevenueRequired / totalBillableDays : 0
        const chargeOutRate = trueDailyCost * (1 + profitMargin / 100)

        setResults({
            totalOverheads: annualOverheads,
            employersCosts: totalEmployeeCosts,
            totalSalaries,
            totalNiPension,
            grossRevenueRequired: totalAnnualRevenueRequired,
            taxBreakdown: taxDetails,
            ownerBillableDays,
            employeeBillableDays,
            totalBillableDays,
            trueDailyCost,
            chargeOutRate,
            individualRates
        })
    }, [
        employmentType, targetTakeHome, employees, customOverheads,
        vanCost, toolsCost, insuranceCost, marketingCost, accountantCost, otherOverheads,
        holidays, sickDays, weatherDays, adminDays, billableHoursPerDay,
        profitMargin
    ])

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val)
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
            <div className="bg-gray-900 p-6 sm:p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Your True Cost Calculator</h3>
                <p className="text-gray-400 text-sm">
                    Now with 2024/25 Tax Estimates. Find out exactly what you need to charge to hit your take-home goal.
                </p>
            </div>

            <div className="grid lg:grid-cols-2">
                {/* Inputs Column */}
                <div className="p-6 sm:p-8 space-y-8 border-r border-gray-100 dark:border-slate-700">

                    {/* Section 1: You & Your Structure */}
                    <section>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                            <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xs mr-2">1</span>
                            You & Your Team
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">How do you operate?</label>
                                <div className="flex rounded-lg bg-gray-100 dark:bg-slate-700 p-1">
                                    <button
                                        onClick={() => setEmploymentType('sole_trader')}
                                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${employmentType === 'sole_trader' ? 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                            }`}
                                    >
                                        Sole Trader
                                    </button>
                                    <button
                                        onClick={() => setEmploymentType('limited_company')}
                                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${employmentType === 'limited_company' ? 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                            }`}
                                    >
                                        Limited Co.
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Target <span className="text-teal-600 dark:text-teal-400 font-bold">Take Home</span> Pay
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">£</span>
                                    <input
                                        type="number"
                                        value={targetTakeHome}
                                        onChange={(e) => setTargetTakeHome(e.target.value === '' ? '' : Number(e.target.value))}
                                        className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-900 outline-none transition-all bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    The actual money you want in your personal bank account (Net).
                                </p>
                            </div>

                            {/* Employees List */}
                            <div className="pt-2">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Employees</label>
                                    <button
                                        onClick={addEmployee}
                                        className="text-xs flex items-center text-teal-600 hover:text-teal-700 font-medium"
                                    >
                                        <Plus className="w-3 h-3 mr-1" />
                                        Add Employee
                                    </button>
                                </div>

                                {employees.length === 0 && (
                                    <div className="text-xs text-gray-400 dark:text-gray-400 italic bg-gray-50 dark:bg-slate-900/50 p-3 rounded-lg border border-dashed border-gray-200 dark:border-slate-600 text-center">
                                        No employees added. Just you!
                                    </div>
                                )}

                                <div className="space-y-2">
                                    {employees.map((emp, index) => (
                                        <div key={emp.id} className="flex items-center gap-2 bg-gray-50 dark:bg-slate-900/50 p-2 rounded-lg border border-gray-100 dark:border-slate-700">
                                            <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                                                <Users className="w-4 h-4" />
                                            </div>
                                            <div className="flex-grow">
                                                <label className="text-xs text-gray-500 dark:text-gray-400 block">Employee {index + 1} Salary (Gross)</label>
                                                <div className="relative">
                                                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">£</span>
                                                    <input
                                                        type="number"
                                                        value={emp.salary}
                                                        onChange={(e) => updateEmployeeSalary(emp.id, e.target.value === '' ? '' : Number(e.target.value))}
                                                        className="w-full pl-5 pr-2 py-1 text-sm bg-transparent border-none focus:ring-0 p-0 font-medium text-gray-900 dark:text-white"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeEmployee(emp.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Section 2: Monthly Overheads */}
                    <section>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                            <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xs mr-2">2</span>
                            Monthly Overheads
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                            {[
                                { label: 'Van (Lease, Fuel, Ins)', val: vanCost, set: setVanCost },
                                { label: 'Tools & Equipment', val: toolsCost, set: setToolsCost },
                                { label: 'Business Insurance', val: insuranceCost, set: setInsuranceCost },
                                { label: 'Marketing & Phone', val: marketingCost, set: setMarketingCost },
                                { label: 'Accountant & Prof. Fees', val: accountantCost, set: setAccountantCost },
                                { label: 'Other (Uniforms, Subs)', val: otherOverheads, set: setOtherOverheads },
                            ].map((item, i) => (
                                <div key={i}>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{item.label}</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">£</span>
                                        <input
                                            type="number"
                                            value={item.val}
                                            onChange={(e) => item.set(e.target.value === '' ? '' : Number(e.target.value))}
                                            className="w-full pl-6 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-900 outline-none transition-all bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Custom Overheads */}
                        <div className="space-y-3">
                            {customOverheads.map((overhead) => (
                                <div key={overhead.id} className="flex gap-2 items-center">
                                    <div className="flex-grow">
                                        <input
                                            type="text"
                                            value={overhead.label}
                                            onChange={(e) => updateCustomOverhead(overhead.id, 'label', e.target.value)}
                                            className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-900 outline-none transition-all bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                                            placeholder="Expense Name"
                                        />
                                    </div>
                                    <div className="relative w-32">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">£</span>
                                        <input
                                            type="number"
                                            value={overhead.value}
                                            onChange={(e) => updateCustomOverhead(overhead.id, 'value', e.target.value === '' ? '' : Number(e.target.value))}
                                            className="w-full pl-6 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-900 outline-none transition-all bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeCustomOverhead(overhead.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}

                            <button
                                onClick={addCustomOverhead}
                                className="text-xs flex items-center text-teal-600 hover:text-teal-700 font-medium"
                            >
                                <Plus className="w-3 h-3 mr-1" />
                                Add Custom Expense
                            </button>
                        </div>
                    </section>

                    {/* Section 3: Lost Time */}
                    <section>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                            <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xs mr-2">3</span>
                            Lost Time (Per Person)
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { label: 'Holidays', val: holidays, set: setHolidays },
                                { label: 'Sick / Unforeseen', val: sickDays, set: setSickDays },
                                { label: 'Bad Weather / Quiet', val: weatherDays, set: setWeatherDays },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col">
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{item.label}</label>
                                    <input
                                        type="number"
                                        value={item.val}
                                        onChange={(e) => item.set(e.target.value === '' ? '' : Number(e.target.value))}
                                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-900 outline-none transition-all bg-white dark:bg-slate-800 text-gray-900 dark:text-white mt-auto"
                                    />
                                </div>
                            ))}

                            {/* Admin Days - Owner Only */}
                            <div className="flex flex-col">
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Admin / Quoting (Owner Only)</label>
                                <input
                                    type="number"
                                    value={adminDays}
                                    onChange={(e) => setAdminDays(e.target.value === '' ? '' : Number(e.target.value))}
                                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-900 outline-none transition-all bg-white dark:bg-slate-800 text-gray-900 dark:text-white mt-auto"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Billable Hours per Day</label>
                            <input
                                type="number"
                                value={billableHoursPerDay}
                                onChange={(e) => setBillableHoursPerDay(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-24 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-900 outline-none transition-all bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Used to calculate hourly rates.</p>
                        </div>
                    </section>

                </div>

                {/* Results Column */}
                <div className="bg-gray-50 dark:bg-slate-900/50 p-6 sm:p-8 flex flex-col justify-center">
                    <div className="space-y-6">

                        {/* Summary Stats */}
                        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Total Overheads & Staff Costs</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(results.totalOverheads + results.employersCosts)}</span>
                                    <button
                                        onClick={() => setShowCostBreakdown(!showCostBreakdown)}
                                        className="text-teal-600 hover:text-teal-700"
                                    >
                                        {showCostBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {showCostBreakdown && (
                                <div className="bg-gray-50 dark:bg-slate-900/30 rounded-lg p-3 text-xs space-y-2 border border-gray-100 dark:border-slate-700">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                        <span className="text-gray-600 dark:text-gray-400">Business Overheads</span>
                                        <span>{formatCurrency(results.totalOverheads)}</span>
                                    </div>
                                    {results.totalSalaries > 0 && (
                                        <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                            <span>Staff Salaries (Gross)</span>
                                            <span>{formatCurrency(results.totalSalaries)}</span>
                                        </div>
                                    )}
                                    {results.totalNiPension > 0 && (
                                        <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                            <span>Employer Costs (NI & Pension)</span>
                                            <span>{formatCurrency(results.totalNiPension)}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-900 dark:text-white font-medium">Gross Revenue Required</span>
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(results.grossRevenueRequired)}</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                                    To achieve {formatCurrency(Number(targetTakeHome))} Net Take Home
                                </p>
                            </div>

                            {/* Tax Breakdown Toggle */}
                            <div className="bg-gray-50 dark:bg-slate-900/30 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
                                <button
                                    onClick={() => setShowTaxBreakdown(!showTaxBreakdown)}
                                    className="flex items-center justify-between w-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    <span className="flex items-center">
                                        <Info className="w-4 h-4 mr-2" />
                                        See Tax Breakdown
                                    </span>
                                    {showTaxBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>

                                {showTaxBreakdown && (
                                    <div className="mt-4 space-y-2 text-sm border-t border-gray-200 dark:border-slate-700 pt-3">
                                        {employmentType === 'sole_trader' ? (
                                            <>
                                                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                                    <span>Income Tax</span>
                                                    <span>{formatCurrency(results.taxBreakdown.incomeTax)}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                                    <span>Class 4 NI</span>
                                                    <span>{formatCurrency(results.taxBreakdown.nationalInsurance)}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                                    <span>Corporation Tax</span>
                                                    <span>{formatCurrency(results.taxBreakdown.corporationTax)}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                                    <span>Dividend Tax</span>
                                                    <span>{formatCurrency(results.taxBreakdown.dividendTax)}</span>
                                                </div>
                                            </>
                                        )}
                                        <div className="flex justify-between font-medium text-red-500 dark:text-red-400 pt-2 border-t border-gray-200 dark:border-slate-700 border-dashed">
                                            <span>Total Tax Bill</span>
                                            <span>{formatCurrency(results.taxBreakdown.totalTax)}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* PriceM8 Cheat Sheet */}
                        <div className="bg-teal-900 rounded-2xl p-6 shadow-lg text-white">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-teal-800 rounded-lg">
                                    <Smartphone className="w-5 h-5 text-teal-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">PriceM8 Cheat Sheet</h4>
                                    <p className="text-xs text-teal-300">Use these figures in your app settings</p>
                                </div>
                            </div>

                            <div className="bg-teal-800/50 rounded-xl p-4 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-teal-200">Target Profit Margin</span>
                                    <span className="text-sm font-bold text-teal-400">{profitMargin}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    value={profitMargin}
                                    onChange={(e) => setProfitMargin(Number(e.target.value))}
                                    className="w-full h-2 bg-teal-950 rounded-lg appearance-none cursor-pointer accent-teal-400"
                                />
                            </div>

                            <div className="space-y-3">
                                {results.individualRates.map((rate, i) => (
                                    <div key={i} className="bg-teal-950/50 rounded-lg p-3 border border-teal-800 dark:border-teal-900">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium text-teal-100">{rate.name}</span>
                                            <span className="text-xs text-teal-400 bg-teal-900 px-2 py-1 rounded">
                                                {formatCurrency(rate.chargePerHour)}/hr
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div>
                                                <span className="block text-teal-500 mb-0.5">Break Even (Cost)</span>
                                                <span className="text-white">{formatCurrency(rate.costPerHour)}/hr</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-teal-500 mb-0.5">Charge Rate (+{profitMargin}%)</span>
                                                <span className="text-white font-bold">{formatCurrency(rate.chargePerHour)}/hr</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Ready to lock these rates in?
                            </p>
                            <a
                                href="#waitlist"
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/30"
                            >
                                Start Free Trial
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
