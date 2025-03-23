import React from 'react';
import { BookOpen, MessageSquare, Bookmark, Info, Facebook, Twitter, Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">ComicVerse</h3>
            <p className="text-sm mb-4">Your premier destination for manga, manhwa, comics and more. Read your favorite stories anytime, anywhere.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                  <BookOpen size={16} />
                  <span>Latest Releases</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                  <Bookmark size={16} />
                  <span>Popular Manga</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                  <MessageSquare size={16} />
                  <span>Community Forums</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Genres</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Action</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Fantasy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Romance</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Slice of Life</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Superhero</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                  <Info size={16} />
                  <span>Help Center</span>
                </a>
              </li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; 2025 ComicVerse. All rights reserved.</p>
          <p className="mt-2 text-gray-500">All manga, comics and images are property of their respective owners.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;