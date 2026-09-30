import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface WaitingListContextType {
    isOpen: boolean
    openWaitlist: () => void
    closeWaitlist: () => void
}

const WaitingListContext = createContext<WaitingListContextType | undefined>(undefined)

export function WaitingListProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    const openWaitlist = () => setIsOpen(true)
    const closeWaitlist = () => setIsOpen(false)

    // Global listener for #waitlist hash
    useEffect(() => {
        const checkHash = () => {
            if (window.location.hash === '#waitlist') {
                openWaitlist()
                // Clear the hash after opening, or keep it if you want to support direct links
                // history.replaceState(null, '', window.location.pathname)
            }
        }

        // Check on mount
        checkHash()

        // Check on hash change
        window.addEventListener('hashchange', checkHash)
        return () => window.removeEventListener('hashchange', checkHash)
    }, [])

    return (
        <WaitingListContext.Provider value={{ isOpen, openWaitlist, closeWaitlist }}>
            {children}
        </WaitingListContext.Provider>
    )
}

export function useWaitingList() {
    const context = useContext(WaitingListContext)
    if (context === undefined) {
        throw new Error('useWaitingList must be used within a WaitingListProvider')
    }
    return context
}
