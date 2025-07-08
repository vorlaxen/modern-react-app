import { useLanguage } from "@/hooks/useLanguage";
import { type LanguageContextProps } from "@/types/localization.types";
import { createContext, useContext, type ReactNode } from "react";

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({children}: {children: ReactNode}) => {
    const language = useLanguage();

    return (
        <LanguageContext.Provider value={language}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguageContext = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error('useLanguageContext must be used inside <LanguageProvider>')
    }

    return ctx;
}