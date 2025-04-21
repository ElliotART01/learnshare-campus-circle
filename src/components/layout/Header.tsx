
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Logo from './Logo';
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/i18n/index";
import { Moon, Sun, Globe } from 'lucide-react';

export const Header = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, isRTL } = useLanguage();

  // Get the first letter of the user's name for the avatar fallback
  const getNameInitial = (name: string) => {
    return name?.charAt(0).toUpperCase() || "?";
  };

  const handleLanguageToggle = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = theme === "dark";

  return (
    <header className="bg-white dark:bg-background shadow-sm dark-mode-transition">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
          <Logo size={48} />
        </Link>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLanguageToggle}
            className="p-2 rounded-full bg-gray-100 dark:bg-secondary/20 border hover:bg-gray-200 hover:dark:bg-secondary/30 transition flex items-center justify-center"
            aria-label={`Switch to ${language === "en" ? "Arabic" : "English"}`}
          >
            <Globe className="h-5 w-5" />
            <span className="sr-only md:not-sr-only md:ml-2 text-sm">
              {t(language, "language")}
            </span>
          </button>
          
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full bg-gray-100 dark:bg-secondary/20 border hover:bg-gray-200 hover:dark:bg-secondary/30 transition flex items-center justify-center"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only md:not-sr-only md:ml-2 text-sm">
              {isDark
                ? t(language, "lightMode")
                : t(language, "darkMode")}
            </span>
          </button>
          
          <nav className={`hidden md:flex ${isRTL ? 'space-x-reverse' : ''} space-x-6`}>
            <Link to="/" className="text-gray-600 dark:text-foreground hover:text-primary-medium transition-colors">
              {language === "en" ? "Home" : "الرئيسية"}
            </Link>
            <Link to="/about" className="text-gray-600 dark:text-foreground hover:text-primary-medium transition-colors">
              {language === "en" ? "About" : "عن الموقع"}
            </Link>
          </nav>
          
          {isAuthenticated ? (
            <Link to="/profile" className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
              <span className="text-sm font-medium hidden md:inline">
                {currentUser?.name}
              </span>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary">
                  {currentUser ? getNameInitial(currentUser.name) : "?"}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <div className={`flex ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">{language === "en" ? "Log in" : "تسجيل الدخول"}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">{language === "en" ? "Sign up" : "إنشاء حساب"}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
