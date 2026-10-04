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

// Blog post data was authored with Tailwind color classes for the old palette — remapped here
// to the Site Sheet tones rather than touching every post's data.
const COLOR_MAP: Record<string, string> = {
    'bg-teal-600': 'var(--cedar)',
    'bg-teal-500': 'var(--cedar)',
    'bg-red-500': '#8B4A3C',
    'bg-red-400': '#8B4A3C',
    'bg-blue-400': 'var(--ink-2)',
    'bg-purple-500': 'var(--cedar-soft)',
    'bg-gray-400': 'var(--rule)',
    'bg-gray-500': 'var(--rule)',
}

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
            { threshold: 0.1 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        const timer = setTimeout(() => setIsVisible(true), 1000)

        return () => {
            observer.disconnect()
            clearTimeout(timer)
        }
    }, [])

    return (
        <div ref={ref} className="form-card" style={{ margin: '2.5em 0' }}>
            <h3 className="disp" style={{ fontSize: '1.2rem', marginBottom: 4 }}>{title}</h3>
            {subtitle && <p className="mono" style={{ marginBottom: 28 }}>{subtitle}</p>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                {data.map((item, index) => (
                    <div key={index}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '.92rem' }}>
                            <span>{item.label}</span>
                            <span className="mono">{item.value}{item.suffix}</span>
                        </div>
                        <div style={{ height: 10, background: 'var(--rule-soft)', overflow: 'hidden' }}>
                            <div
                                style={{
                                    height: '100%',
                                    background: COLOR_MAP[item.color || ''] || 'var(--cedar)',
                                    width: isVisible ? `${(item.value / maxValue) * 100}%` : '0%',
                                    transition: 'width 1s ease-out',
                                    transitionDelay: `${index * 100}ms`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
