import React from 'react'

export const AuroraBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Aurora Blob 1 - with inline animation as fallback */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full mix-blend-screen filter blur-[100px] opacity-50 dark:opacity-60 bg-gradient-to-r from-teal-400 to-blue-500 dark:from-teal-600 dark:to-blue-700"
                style={{
                    animation: 'aurora-flow-1 45s infinite alternate'
                }}
            />

            {/* Aurora Blob 2 */}
            <div
                className="absolute top-[10%] right-[-10%] w-[60%] h-[60%] rounded-full mix-blend-screen filter blur-[100px] opacity-50 dark:opacity-60 bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700"
                style={{
                    animation: 'aurora-flow-2 60s infinite alternate'
                }}
            />

            {/* Aurora Blob 3 */}
            <div
                className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] rounded-full mix-blend-screen filter blur-[100px] opacity-50 dark:opacity-60 bg-gradient-to-r from-purple-400 to-teal-400 dark:from-purple-600 dark:to-teal-600"
                style={{
                    animation: 'aurora-flow-3 75s infinite alternate'
                }}
            />

            <style>{`
                @keyframes aurora-flow-1 {
                    0% { transform: translate(0, 0) rotate(0deg) scale(1); }
                    50% { transform: translate(50%, 20%) rotate(10deg) scale(1.1); }
                    100% { transform: translate(20%, 50%) rotate(-10deg) scale(0.9); }
                }
                @keyframes aurora-flow-2 {
                    0% { transform: translate(0, 0) rotate(0deg) scale(1); }
                    50% { transform: translate(-40%, 30%) rotate(-10deg) scale(1.1); }
                    100% { transform: translate(-20%, -20%) rotate(10deg) scale(0.9); }
                }
                @keyframes aurora-flow-3 {
                    0% { transform: translate(0, 0) rotate(0deg) scale(1); }
                    50% { transform: translate(30%, -40%) rotate(5deg) scale(1.1); }
                    100% { transform: translate(-30%, 30%) rotate(-5deg) scale(0.9); }
                }
            `}</style>
        </div>
    )
}
