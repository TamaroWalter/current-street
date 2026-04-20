import { createContext, useState, useContext } from 'react';
import en from '../data/lang/en.json';
import de from '../data/lang/de.json';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: (lang: string) => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

/**
 * Custom hook for different languages support.
 * This is a custom i18n implementation.
 * @returns
 */
export function useTranslation() {
  const { language } = useLanguage();
  const dict = (language === 'de' ? de : en) as Record<string, string>;

  /**
   * Method to get a String independent of the language.
   * @param identifier
   * @param params accepts multiple parameters
   * @returns 
  */
  function getString(identifier: string, ...params: string[]): string {
    let str = dict[identifier] ?? "";
    params.forEach((param, index) => { str = str.replace(`{${index}}`, param); });
    return str;
  }

  function getTimeFormat() {
    return language === 'de' ? 'de-De' : 'en-GB';
  }

  return { getString, getTimeFormat };
}

