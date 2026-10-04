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
        <div className="form-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '22px 28px' }}>
                <h3 className="disp" style={{ fontSize: '1.3rem', color: 'var(--paper)' }}>Your True Cost Calculator</h3>
                <p className="mono" style={{ color: 'var(--band-ink-2)', marginTop: 8 }}>
                    2024/25 tax estimates — find out exactly what to charge to hit your take-home goal.
                </p>
            </div>

            <div className="overheads-grid">
                {/* Inputs Column */}
                <div style={{ padding: 28, borderRight: '1px solid var(--rule)', display: 'flex', flexDirection: 'column', gap: 32 }}>

                    {/* Section 1: You & Your Structure */}
                    <section>
                        <div className="calc-head"><span className="mono n">01</span><h4>You &amp; Your Team</h4></div>
                        <div className="field">
                            <label>How do you operate?</label>
                            <div className="seg">
                                <button
                                    type="button"
                                    onClick={() => setEmploymentType('sole_trader')}
                                    className={employmentType === 'sole_trader' ? 'active' : ''}
                                >
                                    Sole Trader
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEmploymentType('limited_company')}
                                    className={employmentType === 'limited_company' ? 'active' : ''}
                                >
                                    Limited Co.
                                </button>
                            </div>
                        </div>

                        <div className="field">
                            <label>Target take-home pay (£)</label>
                            <input
                                type="number"
                                value={targetTakeHome}
                                onChange={(e) => setTargetTakeHome(e.target.value === '' ? '' : Number(e.target.value))}
                            />
                            <p className="mono" style={{ marginTop: 6 }}>The actual money you want in your personal bank account (net)</p>
                        </div>

                        {/* Employees List */}
                        <div className="field" style={{ marginBottom: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <label style={{ marginBottom: 0 }}>Employees</label>
                                <button type="button" onClick={addEmployee} className="add-row">
                                    <Plus className="w-3 h-3" /> Add employee
                                </button>
                            </div>

                            {employees.length === 0 && (
                                <p className="mono" style={{ textAlign: 'center', padding: '12px 0' }}>No employees added — just you!</p>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {employees.map((emp, index) => (
                                    <div key={emp.id} className="row-card">
                                        <div className="idx"><Users className="w-3.5 h-3.5" /></div>
                                        <div style={{ flexGrow: 1 }}>
                                            <span className="mono" style={{ display: 'block', marginBottom: 2 }}>Employee {index + 1} salary (gross)</span>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                                                <span style={{ color: 'var(--ink-2)' }}>£</span>
                                                <input
                                                    type="number"
                                                    value={emp.salary}
                                                    onChange={(e) => updateEmployeeSalary(emp.id, e.target.value === '' ? '' : Number(e.target.value))}
                                                    style={{ border: 0, background: 'transparent', padding: 0, fontWeight: 600 }}
                                                />
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => removeEmployee(emp.id)} className="del">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Monthly Overheads */}
                    <section>
                        <div className="calc-head"><span className="mono n">02</span><h4>Monthly Overheads</h4></div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16, marginBottom: 16 }}>
                            {[
                                { label: 'Van (lease, fuel, ins)', val: vanCost, set: setVanCost },
                                { label: 'Tools & equipment', val: toolsCost, set: setToolsCost },
                                { label: 'Business insurance', val: insuranceCost, set: setInsuranceCost },
                                { label: 'Marketing & phone', val: marketingCost, set: setMarketingCost },
                                { label: 'Accountant & prof. fees', val: accountantCost, set: setAccountantCost },
                                { label: 'Other (uniforms, subs)', val: otherOverheads, set: setOtherOverheads },
                            ].map((item, i) => (
                                <div key={i} className="field" style={{ marginBottom: 0 }}>
                                    <label>{item.label}</label>
                                    <input
                                        type="number"
                                        value={item.val}
                                        onChange={(e) => item.set(e.target.value === '' ? '' : Number(e.target.value))}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Custom Overheads */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {customOverheads.map((overhead) => (
                                <div key={overhead.id} className="row-card">
                                    <input
                                        type="text"
                                        value={overhead.label}
                                        onChange={(e) => updateCustomOverhead(overhead.id, 'label', e.target.value)}
                                        placeholder="Expense name"
                                        style={{ border: 0, background: 'transparent', padding: 0, flexGrow: 1 }}
                                    />
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, flexShrink: 0 }}>
                                        <span style={{ color: 'var(--ink-2)' }}>£</span>
                                        <input
                                            type="number"
                                            value={overhead.value}
                                            onChange={(e) => updateCustomOverhead(overhead.id, 'value', e.target.value === '' ? '' : Number(e.target.value))}
                                            style={{ border: 0, background: 'transparent', padding: 0, width: 80 }}
                                        />
                                    </div>
                                    <button type="button" onClick={() => removeCustomOverhead(overhead.id)} className="del">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}

                            <button type="button" onClick={addCustomOverhead} className="add-row" style={{ marginTop: customOverheads.length ? 4 : 0 }}>
                                <Plus className="w-3 h-3" /> Add custom expense
                            </button>
                        </div>
                    </section>

                    {/* Section 3: Lost Time */}
                    <section>
                        <div className="calc-head"><span className="mono n">03</span><h4>Lost Time (Per Person)</h4></div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16 }}>
                            {[
                                { label: 'Holidays', val: holidays, set: setHolidays },
                                { label: 'Sick / unforeseen', val: sickDays, set: setSickDays },
                                { label: 'Bad weather / quiet', val: weatherDays, set: setWeatherDays },
                            ].map((item, i) => (
                                <div key={i} className="field" style={{ marginBottom: 0 }}>
                                    <label>{item.label}</label>
                                    <input
                                        type="number"
                                        value={item.val}
                                        onChange={(e) => item.set(e.target.value === '' ? '' : Number(e.target.value))}
                                    />
                                </div>
                            ))}

                            <div className="field" style={{ marginBottom: 0 }}>
                                <label>Admin / quoting (owner only)</label>
                                <input
                                    type="number"
                                    value={adminDays}
                                    onChange={(e) => setAdminDays(e.target.value === '' ? '' : Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="field" style={{ marginTop: 16, marginBottom: 0 }}>
                            <label>Billable hours per day</label>
                            <input
                                type="number"
                                value={billableHoursPerDay}
                                onChange={(e) => setBillableHoursPerDay(e.target.value === '' ? '' : Number(e.target.value))}
                                style={{ maxWidth: 120 }}
                            />
                            <p className="mono" style={{ marginTop: 6 }}>Used to calculate hourly rates</p>
                        </div>
                    </section>

                </div>

                {/* Results Column */}
                <div style={{ padding: 28, background: 'var(--paper-2)', display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {/* Summary Stats */}
                    <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', padding: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--ink-2)', fontSize: '.92rem' }}>Total overheads &amp; staff costs</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ fontWeight: 700 }}>{formatCurrency(results.totalOverheads + results.employersCosts)}</span>
                                <button type="button" onClick={() => setShowCostBreakdown(!showCostBreakdown)} style={{ background: 'none', border: 0, color: 'var(--cedar)', cursor: 'pointer', padding: 2 }}>
                                    {showCostBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {showCostBreakdown && (
                            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--rule-soft)', display: 'flex', flexDirection: 'column', gap: 6, fontSize: '.86rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-2)' }}>
                                    <span>Business overheads</span><span>{formatCurrency(results.totalOverheads)}</span>
                                </div>
                                {results.totalSalaries > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-2)' }}>
                                        <span>Staff salaries (gross)</span><span>{formatCurrency(results.totalSalaries)}</span>
                                    </div>
                                )}
                                {results.totalNiPension > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-2)' }}>
                                        <span>Employer costs (NI &amp; pension)</span><span>{formatCurrency(results.totalNiPension)}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--rule)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <span style={{ fontWeight: 650 }}>Gross revenue required</span>
                                <span className="price-fig" style={{ fontSize: '1.5rem' }}>{formatCurrency(results.grossRevenueRequired)}</span>
                            </div>
                            <p className="mono" style={{ textAlign: 'right', marginTop: 4 }}>To hit {formatCurrency(Number(targetTakeHome))} net take-home</p>
                        </div>

                        {/* Tax Breakdown Toggle */}
                        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--rule-soft)' }}>
                            <button type="button" onClick={() => setShowTaxBreakdown(!showTaxBreakdown)} className="disclosure">
                                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Info className="w-4 h-4" /> See tax breakdown</span>
                                {showTaxBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>

                            {showTaxBreakdown && (
                                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--rule-soft)', display: 'flex', flexDirection: 'column', gap: 6, fontSize: '.9rem' }}>
                                    {employmentType === 'sole_trader' ? (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-2)' }}><span>Income tax</span><span>{formatCurrency(results.taxBreakdown.incomeTax)}</span></div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-2)' }}><span>Class 4 NI</span><span>{formatCurrency(results.taxBreakdown.nationalInsurance)}</span></div>
                                        </>
                                    ) : (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-2)' }}><span>Corporation tax</span><span>{formatCurrency(results.taxBreakdown.corporationTax)}</span></div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-2)' }}><span>Dividend tax</span><span>{formatCurrency(results.taxBreakdown.dividendTax)}</span></div>
                                        </>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 650, color: '#8B4A3C', paddingTop: 8, marginTop: 2, borderTop: '1px dashed var(--rule-soft)' }}>
                                        <span>Total tax bill</span><span>{formatCurrency(results.taxBreakdown.totalTax)}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* PriceM8 Cheat Sheet */}
                    <div className="cheat-sheet">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                            <Smartphone className="w-5 h-5" style={{ color: 'var(--band-cedar)' }} />
                            <div>
                                <h4 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: '1.05rem' }}>PriceM8 Cheat Sheet</h4>
                                <p className="mono" style={{ marginTop: 2 }}>Use these figures in your app settings</p>
                            </div>
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                <span className="mono">Target profit margin</span>
                                <span className="mono" style={{ color: 'var(--band-cedar)' }}>{profitMargin}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="50"
                                value={profitMargin}
                                onChange={(e) => setProfitMargin(Number(e.target.value))}
                            />
                        </div>

                        <div>
                            {results.individualRates.map((rate, i) => (
                                <div key={i} className="rate-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                        <span style={{ fontWeight: 650 }}>{rate.name}</span>
                                        <span className="mono" style={{ color: 'var(--band-cedar)' }}>{formatCurrency(rate.chargePerHour)}/hr</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 10 }}>
                                        <div>
                                            <span className="mono" style={{ display: 'block', marginBottom: 2 }}>Break even (cost)</span>
                                            <span>{formatCurrency(rate.costPerHour)}/hr</span>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span className="mono" style={{ display: 'block', marginBottom: 2 }}>Charge rate (+{profitMargin}%)</span>
                                            <span style={{ fontWeight: 700 }}>{formatCurrency(rate.chargePerHour)}/hr</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <p className="mono" style={{ marginBottom: 14 }}>Ready to lock these rates in?</p>
                        <a href="https://app.pricem8.uk/signup" className="btn">Start free trial <span className="arw">→</span></a>
                    </div>

                </div>
            </div>
        </div>
    )
}
