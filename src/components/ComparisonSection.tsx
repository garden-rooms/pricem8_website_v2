import { ComparisonSection as ComparisonSectionType } from '../types'
import FadeInSection from './FadeInSection'
import BrandedText from './BrandedText'
import { Check, X, AlertTriangle } from 'lucide-react'

interface ComparisonSectionProps {
    section: ComparisonSectionType
}

export default function ComparisonSection({ section }: ComparisonSectionProps) {
    return (
        <section id={section.id} className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeInSection>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            <BrandedText as="span">{section.title}</BrandedText>
                        </h2>
                        {section.subtitle && (
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {section.subtitle}
                            </p>
                        )}
                    </div>
                </FadeInSection>

                {/* Comparison Table */}
                <FadeInSection delay={0.2}>
                    <div className="overflow-x-auto pb-8">
                        <div className="min-w-[800px] bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-slate-800">
                                        {section.table.headers.map((header, i) => (
                                            <th key={i} className={`p-6 text-sm font-bold uppercase tracking-wider ${i === 1 ? 'text-teal-600 dark:text-teal-400 bg-teal-50/30 dark:bg-teal-500/5' : 'text-gray-500 dark:text-gray-400'}`}>
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                    {section.table.rows.map((row, i) => (
                                        <tr key={i} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="p-6 font-medium text-gray-900 dark:text-white">
                                                {row.feature}
                                            </td>
                                            <td className="p-6 bg-teal-50/30 dark:bg-teal-500/5">
                                                <div className="flex items-center gap-2">
                                                    {typeof row.pricem8 === 'boolean' ? (
                                                        row.pricem8 ? (
                                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400">
                                                                <Check className="w-4 h-4" strokeWidth={3} />
                                                                <span className="text-sm font-bold">Yes</span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-400 font-medium">No</span>
                                                        )
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <Check className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                                                            <span className="text-teal-600 dark:text-teal-400 font-bold">{row.pricem8}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-6 text-gray-500 dark:text-gray-400 font-medium whitespace-pre-line">
                                                {typeof row.typical === 'boolean' ? (
                                                    row.typical ? 'Yes' : (
                                                        <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
                                                            <X className="w-5 h-5" />
                                                            <span>No</span>
                                                        </div>
                                                    )
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        {typeof row.typical === 'string' && row.typical.includes('⚠️') ? (
                                                            <>
                                                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                                                                <span>{row.typical.replace('⚠️', '').trim()}</span>
                                                            </>
                                                        ) : (
                                                            <span>{row.typical}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </FadeInSection>

                {/* Explainers */}
                <div className="grid md:grid-cols-3 gap-8 mt-20">
                    {section.explainers.map((explainer, i) => (
                        <FadeInSection key={i} delay={0.1 * i}>
                            <div className="p-8 rounded-3xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-100 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-500 transition-all duration-300 h-full">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    {explainer.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                                    {explainer.description}
                                </p>
                            </div>
                        </FadeInSection>
                    ))}
                </div>
            </div>
        </section>
    )
}
