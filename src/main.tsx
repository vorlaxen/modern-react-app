import { createRoot } from 'react-dom/client'
import React from 'react'
import "@/assets/styles/index.scss"
import App from './App'
import { initI18n } from './services/localization/index.localization.service'
import { HelmetProvider } from 'react-helmet-async'

(async () => {
    await initI18n('en');

    createRoot(document.getElementById('root')!).render(
        <HelmetProvider>
            <App />
        </HelmetProvider>
    )
})();