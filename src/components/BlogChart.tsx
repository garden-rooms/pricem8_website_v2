import { useEffect, useState, useRef } from 'react'

interface ChartData {
    label: string
    value: number
    color?: string
    suffix?: string
}

interface BlogChartProps {
    title: string
    data: ChartData[]
    type?: 'bar' | 'pie'
    subtitle?: string
}

// Safelist colors used in blogPosts.json so Tailwind doesn't purge them
const SAFELIST_COLORS = "bg-gray-400 bg-blue-400 bg-red-500 bg-teal-600 bg-gray-500 bg-red-400 bg-teal-500 bg-purple-500"

export default function BlogChart({ title, data, subtitle }: BlogChartProps) {
    const maxValue = Math.max(...data.map(d => d.value), 1)
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 } // Trigger when 10% visible
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        // Failsafe: Force show after 1s regardless of observer
        const timer = setTimeout(() => setIsVisible(true), 1000)

        return () => {
            observer.disconnect()
            clearTimeout(timer)
        }
    }, [])

    return (
        <div ref={ref} className="my-12 p-6 sm:p-8 bg-gray-50 dark:bg-slate-800/50 rounded-3xl border border-gray-100 dark:border-slate-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">{subtitle}</p>}

            <div className="space-y-6">
                {data.map((item, index) => (
                    <div key={index} className="relative">
                        <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <span>{item.label}</span>
                            <span>{item.value}{item.suffix}</span>
                        </div>
                        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${item.color || 'bg-teal-500'}`}
                                style={{
                                    width: isVisible ? `${(item.value / maxValue) * 100}%` : '0%',
                                    transitionDelay: `${index * 100}ms`
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {/* Hidden div to ensure Tailwind generates these classes */}
            <div className="hidden">
                {SAFELIST_COLORS}
            </div>
        </div>
    )
}
