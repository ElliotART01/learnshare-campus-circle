import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Logo from './Logo';
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/i18n/index";

export const Header = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

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

  return (
    <header className="bg-white dark:bg-background shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Logo size={48} />
        </Link>
        
        <div className={`flex items-center space-x-4 ${language === "ar" ? "flex-row-reverse space-x-reverse" : ""}`}>
          <button
            onClick={handleLanguageToggle}
            className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-secondary/20 border hover:bg-gray-200 hover:dark:bg-secondary transition"
          >
            {t(language, "language")}
          </button>
          <button
            onClick={handleThemeToggle}
            className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-secondary/20 border hover:bg-gray-200 hover:dark:bg-secondary transition"
          >
            {theme === "dark"
              ? t(language, "lightMode")
              : t(language, "darkMode")}
          </button>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 dark:text-foreground hover:text-primary-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 dark:text-foreground hover:text-primary-medium transition-colors">
              About
            </Link>
          </nav>
          
          {isAuthenticated ? (
            <Link to="/profile" className="flex items-center space-x-2">
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
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
