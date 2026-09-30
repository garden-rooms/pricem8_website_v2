import { Link } from 'react-router-dom'
import { ArrowRight, Calculator, Flame, BookOpen, Smartphone } from 'lucide-react'
import BrandedText from '../components/BrandedText'

export default function LinkInBio() {
    const links = [
        {
            title: "Roast My Quote",
            subtitle: "Get a free audit of your pricing",
            icon: <Flame className="w-6 h-6 text-orange-500" />,
            url: "/roast-my-quote",
            primary: true
        },
        {
            title: "Free Overheads Calculator",
            subtitle: "Find your true daily rate",
            icon: <Calculator className="w-6 h-6 text-teal-400" />,
            url: "/blog/how-much-to-charge",
            primary: false
        },
        {
            title: "Try PriceM8 Free",
            subtitle: "Start your 14-day trial",
            icon: <Smartphone className="w-6 h-6 text-blue-400" />,
            url: "https://app.pricem8.co.uk/signup", // Assuming this is the signup link
            primary: false
        },
        {
            title: "Read the Blog",
            subtitle: "Tips for profitable pricing",
            icon: <BookOpen className="w-6 h-6 text-purple-400" />,
            url: "/blog",
            primary: false
        }
    ]

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-teal-500/30 flex flex-col items-center py-12 px-4">

            {/* Profile Section */}
            <div className="text-center mb-10 animate-fade-in">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl shadow-teal-500/20">
                    <span className="text-3xl font-bold text-white">P8</span>
                </div>
                <h1 className="text-2xl font-bold mb-2">
                    <BrandedText className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                        PriceM8
                    </BrandedText>
                </h1>
                <p className="text-slate-400 max-w-xs mx-auto text-sm leading-relaxed">
                    Price faster. Quote smarter. Protect your profit.
                </p>
            </div>

            {/* Links Section */}
            <div className="w-full max-w-md space-y-4">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to={link.url}
                        className={`
              group relative flex items-center p-4 rounded-xl border transition-all duration-300
              ${link.primary
                                ? 'bg-slate-900/80 border-teal-500/50 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/10'
                                : 'bg-slate-900/40 border-slate-800 hover:border-slate-600 hover:bg-slate-800/60'
                            }
            `}
                    >
                        <div className={`
              p-3 rounded-lg mr-4 transition-colors
              ${link.primary ? 'bg-teal-500/10 group-hover:bg-teal-500/20' : 'bg-slate-800 group-hover:bg-slate-700'}
            `}>
                            {link.icon}
                        </div>

                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-100 group-hover:text-white transition-colors">
                                {link.title}
                            </h3>
                            <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                                {link.subtitle}
                            </p>
                        </div>

                        <ArrowRight className={`
              w-5 h-5 text-slate-600 transform transition-all duration-300
              group-hover:translate-x-1 group-hover:text-teal-400
            `} />
                    </Link>
                ))}
            </div>

            {/* Footer */}
            <footer className="mt-16 text-center">
                <div className="flex justify-center gap-6 mb-6">
                    {/* Social Icons - simplified for mobile */}
                    {['instagram', 'tiktok', 'linkedin'].map((social) => (
                        <a key={social} href="#" className="text-slate-600 hover:text-teal-400 transition-colors">
                            <span className="sr-only">{social}</span>
                            {/* Icons would go here, using text for now to keep it simple or import icons */}
                            <span className="capitalize text-xs font-medium">{social}</span>
                        </a>
                    ))}
                </div>
                <p className="text-xs text-slate-700">
                    © {new Date().getFullYear()} PriceM8. All rights reserved.
                </p>
            </footer>
        </div>
    )
}
