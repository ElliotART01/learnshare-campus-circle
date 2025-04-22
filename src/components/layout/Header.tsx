
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { useAuth } from "@/context/AuthContext";
import { MessageSquare, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const isRTL = language === "ar";
  
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo />
              <span className="font-bold text-lg ms-2 text-gray-900 dark:text-white">
                {t(language, 'campusCircle')}
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-4 rtl:space-x-reverse">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {t(language, 'home')}
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {t(language, 'about')}
            </Link>
            <Link
              to="/ai-features"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-1"
            >
              <MessageSquare className="h-4 w-4" />
              {t(language, 'aiAssistant')}
            </Link>
          </nav>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button
              variant="ghost"
              className="px-2"
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
              title={t(language, theme === "dark" ? "lightMode" : "darkMode")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              className="font-medium px-3"
            >
              {language === "en" ? "العربية" : "English"}
            </Button>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="outline">
                    {t(language, 'profile')}
                  </Button>
                </Link>
                <Button onClick={logout} variant="ghost">
                  {t(language, 'logout')}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">
                    {t(language, 'login')}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default">
                    {t(language, 'signup')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
