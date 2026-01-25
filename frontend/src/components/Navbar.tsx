import React, { useState } from 'react';
import { Camera, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  cartItemCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartItemCount = 0, 
  isLoggedIn = false,
  userName 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition">
            <Camera className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">PhotoMerch</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Home
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Categories
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link to="/cart" className="relative hover:opacity-80 transition">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Profile / Login */}
            {isLoggedIn ? (
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
              >
                <User className="h-6 w-6" />
                {userName && (
                  <span className="hidden lg:inline text-sm font-medium">{userName}</span>
                )}
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-200">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 rounded transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 rounded transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 rounded transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 rounded transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;