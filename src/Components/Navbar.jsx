import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 text-white shadow-lg transition-all duration-300 ${isScrolled ? 'backdrop-blur-md' : 'bg-transparent'}`}
      style={{
        background: isScrolled
          ? 'linear-gradient(180deg, rgba(31,41,55,0.95) 0%, rgba(31,41,55,0.75) 60%, rgba(31,41,55,0.4) 100%)'
          : 'transparent',
      }}
    >
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left section: Logo and Menu */}
        <div className="flex items-center">
          <button className="mr-3 hover:bg-gray-700/50 p-2 rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <a href="/" className="flex items-center">
            <span className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
              ComicVerse
            </span>
          </a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-grow max-w-xl mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search comics, manga, authors..."
              className="py-2 px-4 pr-12 w-full rounded-lg text-gray-900 bg-white/80 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-0 top-0 h-full px-3 rounded-r-lg flex items-center bg-pink-500 text-white hover:bg-pink-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative group">
            <a href="#" className="flex items-center text-gray-200 hover:text-white transition">
              Manga & Books <ChevronDown size={18} className="ml-1 opacity-70" />
            </a>
          </div>
          <a href="#" className="text-gray-200 hover:text-white transition">Calendar</a>
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition shadow-md">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;