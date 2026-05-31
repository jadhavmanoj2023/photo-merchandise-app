import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useState } from 'react';

export default function Header() {
  const { items } = useSelector((state: RootState) => state.cart);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-[#e11d48]">PhotoMerch</div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#e11d48] transition">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#e11d48] transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#e11d48] transition">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <svg className="w-6 h-6 text-gray-700 hover:text-[#e11d48] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <Link to="/profile" className="bg-[#e11d48] text-white px-4 py-2 rounded-lg hover:bg-[#be123c] transition">
                Profile
              </Link>
            ) : (
              <Link to="/login" className="bg-[#e11d48] text-white px-4 py-2 rounded-lg hover:bg-[#be123c] transition">
                Login
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link to="/" className="block text-gray-700 hover:text-[#e11d48] py-2">
              Home
            </Link>
            <Link to="/about" className="block text-gray-700 hover:text-[#e11d48] py-2">
              About
            </Link>
            <Link to="/contact" className="block text-gray-700 hover:text-[#e11d48] py-2">
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}