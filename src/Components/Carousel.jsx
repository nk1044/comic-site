import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Carousel = ({ className = "" }) => {
  const navigation=useNavigate()
  const slides = [
    { 
      src: '/solo-leveling.jpg', 
      alt: 'Solo Leveling',
      spotlight: "#1 Trending",
      title: "Solo Leveling",
      description: "In a world where hunters with special abilities are tasked with fighting deadly monsters, Sung Jin-Woo is known as the 'World's Weakest Hunter.'",
      type: "Manhwa",
      releaseDate: "Updated Mar 15, 2025",
      rating: "4.9★",
      genre: "Action"
    },
    { 
      src: '/batman.jpg', 
      alt: 'Batman: The Dark Knight Returns',
      spotlight: "#2 Trending",
      title: "Batman: The Dark Knight Returns",
      description: "Frank Miller's iconic story of an aging Bruce Wayne coming out of retirement to fight crime in a dystopian Gotham City.",
      type: "Comic",
      releaseDate: "Complete Series",
      rating: "4.8★",
      genre: "Superhero"
    },
    { 
      src: '/jjk2.png', 
      alt: 'Jujutsu Kaisen', 
      spotlight: "#3 Trending",
      title: "Jujutsu Kaisen",
      description: "Yuji Itadori joins a secret organization of Jujutsu Sorcerers to kill a powerful Curse named Ryomen Sukuna, of whom Yuji becomes the host.",
      type: "Manga",
      releaseDate: "Updated Mar 20, 2025",
      rating: "4.7★",
      genre: "Supernatural"
    },
    { 
      src: '/aot.png', 
      alt: 'Attack on Titan',
      spotlight: "Editor's Pick",
      title: "Attack on Titan",
      description: "In a world where humanity lives behind walls protecting them from giant humanoid Titans, a young boy vows revenge after a Titan causes tragedy in his life.",
      type: "Manga",
      releaseDate: "Complete Series",
      rating: "4.9★",
      genre: "Dark Fantasy"
    },
  ];

  const totalItems = slides.length;
  const [activeItem, setActiveItem] = useState(0);
  const autoplayInterval = 5000; 
  
  useEffect(() => {
    if (totalItems <= 1) return;
    
    const interval = setInterval(() => {
      setActiveItem((current) => (current === totalItems - 1 ? 0 : current + 1));
    }, autoplayInterval);
    
    return () => clearInterval(interval);
  }, [totalItems]);

  const goToPrev = () => {
    setActiveItem((current) => (current === 0 ? totalItems - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveItem((current) => (current === totalItems - 1 ? 0 : current + 1));
  };

  const showControls = totalItems > 1;

  return (
    <div id="spotlight-carousel" className={`relative w-full h-full ${className}`} data-carousel="static">
      <div className="relative w-full h-full overflow-hidden bg-gray-900">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              activeItem === index ? 'opacity-100' : 'opacity-0'
            }`}
            data-carousel-item={activeItem === index ? "active" : ""}
          >
            {/* Image with gradient overlay */}
            <div className="absolute inset-0">
              <img 
                src={slide.src} 
                loading='lazy'
                className="absolute block w-full h-full object-cover" 
                alt={slide.alt} 
              />
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20"></div>
            </div>
            
            {/* Text content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16 text-white">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 mb-3 text-sm font-medium text-blue-500 bg-blue-500/20 rounded-full">
                  {slide.spotlight}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">{slide.title}</h2>
                <p className="text-gray-300 text-lg mb-6 line-clamp-2 md:line-clamp-3 max-w-2xl">{slide.description}</p>
                
                <div className="flex items-center flex-wrap gap-4 md:gap-6 mb-8">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>{slide.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>{slide.releaseDate}</span>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-500/80 rounded">
                    {slide.rating}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-green-500/80 rounded">
                    {slide.genre}
                  </span>
                </div>
                
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors" onClick={()=>navigation('/read-comic')}>
                    <BookOpen size={18} />
                    <span className="font-medium">Read Now</span>
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gray-800/70 hover:bg-gray-700 rounded-full transition-colors">
                    <Play size={18} />
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Side navigation controls */}
      {showControls && (
        <>
          <button 
            type="button" 
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
            onClick={goToPrev}
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors">
              <ChevronLeft className="w-6 h-6 text-white" />
              <span className="sr-only">Previous</span>
            </span>
          </button>
          
          <button 
            type="button" 
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
            onClick={goToNext}
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors">
              <ChevronRight className="w-6 h-6 text-white" />
              <span className="sr-only">Next</span>
            </span>
          </button>
          
          {/* Bottom indicators */}
          <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-8 left-1/2">
            {slides.map((_, index) => (
              <button
                key={`indicator-${index}`}
                type="button"
                className={`w-3 h-3 rounded-full ${
                  activeItem === index ? 'bg-white' : 'bg-white/50'
                } hover:bg-white/80 transition-colors duration-200`}
                aria-current={activeItem === index ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
                onClick={() => setActiveItem(index)}
              ></button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;