
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-primary-medium">
          <Book size={28} />
          <span className="text-xl font-bold">Campus Circle</span>
        </Link>
        
        <nav className="flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-primary-medium transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-primary-medium transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};
