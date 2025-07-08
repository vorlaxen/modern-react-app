import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/index.route'
import { ThemeProvider } from './context/themeProvider'
import { LanguageProvider } from './context/languageProvider'

const App = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <LanguageProvider>
        <ThemeProvider>

          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </LanguageProvider>
    </Suspense>
  )
}

export default App