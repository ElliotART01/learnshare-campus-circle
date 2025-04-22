
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { t as translate } from "@/i18n"; // Import the translation function

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
  t: (language: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get initial language from localStorage if available or default to English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage === "ar" ? "ar" : "en") as Language;
  });

  const isRTL = language === "ar";

  // Function to toggle between languages
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === "en" ? "ar" : "en");
  };

  // Store language preference in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    
    // Add or remove RTL attribute on html tag
    if (isRTL) {
      document.documentElement.setAttribute("dir", "rtl");
      document.body.classList.add("rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.body.classList.remove("rtl");
    }
  }, [language, isRTL]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: handleSetLanguage, 
        toggleLanguage,
        isRTL,
        t: translate // Pass the translation function to the context
      }}
    >
      <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "rtl" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
