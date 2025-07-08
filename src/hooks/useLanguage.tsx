import { SUPPORTED_LANGUAGES } from "@/services/localization/config.localization.service";
import i18n, { changeLanguageWithNamespaces } from "@/services/localization/index.localization.service";
import { getEffectiveLanguage, getStoredLanguage } from "@/services/localization/util.localization.service";
import type { LanguageSetting, SupportedLang } from "@/types/localization.types";
import { localStorageUtil } from "@/utils/storage.util";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = 'language';
const DEFAULT_LANGUAGE: SupportedLang = 'en';

export const useLanguage = () => {
    const [currentLanguage, setCurrentLanguage] = useState<SupportedLang>(DEFAULT_LANGUAGE);

    const detechBrowserLanguage = useCallback((): SupportedLang => {
        const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
        for (const lang of langs) {
            const base = lang.split('-')[0].toLowerCase();
            if (SUPPORTED_LANGUAGES.includes(base as SupportedLang)) {
                return base as SupportedLang
            }
        }

        return DEFAULT_LANGUAGE;
    }, []);


    const changeLanguage = useCallback(
        async (lang: LanguageSetting) => {
            let targetLang: SupportedLang;

            if (lang === 'system') {
                targetLang = detechBrowserLanguage();
                localStorageUtil.set(STORAGE_KEY, 'system');
            } else if (SUPPORTED_LANGUAGES.includes(lang)) {
                targetLang = lang;
                localStorageUtil.set(STORAGE_KEY, lang);
            } else {
                console.warn(`Unsuppored language: ${lang}`);
                return;
            }

            try {
                await changeLanguageWithNamespaces(targetLang);
                setCurrentLanguage(targetLang);
            } catch (error) {
                console.error(`Language swıtch failed: ${targetLang}`, error)
            }
        }, []
    )

    const toggleLanguage = async () => {
        const current = getEffectiveLanguage(getStoredLanguage());
        const next: SupportedLang = current === 'en' ? 'tr' : 'en';

        await changeLanguage(next);
    }

    useEffect(() => {
        (async () => {
            const stored = getStoredLanguage();
            const effectiveLang = getEffectiveLanguage(stored);

            if (i18n.language !== effectiveLang) {
                await i18n.changeLanguage(effectiveLang);
            }

            setCurrentLanguage(effectiveLang);
        })
    }, [getStoredLanguage, getEffectiveLanguage, detechBrowserLanguage]);

    return {
        changeLanguage,
        toggleLanguage,
        getUserLanguage: getStoredLanguage,
        getEffectiveLanguage,
        currentLanguage
    }
}