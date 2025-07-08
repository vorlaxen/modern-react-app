import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const { t: tCommon } = useTranslation('common');
  const { toggleLanguage, currentLanguage } = useLanguage()

  return (
    <div className='w-full min-h-screen flex flex-col items-center gap-4 bg-neutral-200 dark:bg-black'>
      <p className='text-4xl text-black dark:text-white font-semibold'>{tCommon('hello')}</p>
      <span className='text-lg text-black dark:text-white'>current theme: {theme}</span>
      <span className='text-lg text-black dark:text-white'>current language: {currentLanguage}</span>
      <button 
        onClick={() => toggleTheme()} 
        className={clsx(
          'py-4 px-4',
          'bg-black text-white dark:bg-white dark:text-black',
          'rounded-full hover:ring-2 transition-shadow duration-300'
        )}>
        Toggle Theme
        </button>
              <button 
        onClick={() => toggleLanguage()} 
        className={clsx(
          'py-4 px-4',
          'bg-black text-white dark:bg-white dark:text-black',
          'rounded-full hover:ring-2 transition-shadow duration-300'
        )}>
        Toggle Language
        </button>
    </div>
  )
}

export default Home