
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const Header = () => {
  const { currentUser, isAuthenticated } = useAuth();

  // Get the first letter of the user's name for the avatar fallback
  const getNameInitial = (name: string) => {
    return name?.charAt(0).toUpperCase() || '?';
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-primary-medium">
          <Book size={28} />
          <span className="text-xl font-bold">Campus Circle</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-primary-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary-medium transition-colors">
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
                  {currentUser ? getNameInitial(currentUser.name) : '?'}
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
