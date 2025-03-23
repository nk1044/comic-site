import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';

// Define the slides data directly within the component
const Carousel = ({ className = "" }) => {
  // Default slides data built into the component
  const slides = [
    { 
      src: '/aot.png', 
      alt: 'Attack on Titan',
      spotlight: "#1 Spotlight",
      title: "Attack on Titan: Final Season",
      description: "The epic conclusion to humanity's fight for survival against the titans begins now.",
      duration: "24m",
      releaseDate: "Jan 12, 2025",
      rating: "HD",
      ageRating: "16+"
    },
    { 
      src: '/jjk2.png', 
      alt: 'Jujutsu Kaisen', 
      spotlight: "#2 Spotlight",
      title: "Jujutsu Kaisen Season 2",
      description: "Yuji Itadori and the jujutsu sorcerers face their most dangerous curses yet.",
      duration: "24m",
      releaseDate: "Dec 15, 2024",
      rating: "HD",
      ageRating: "14+"
    },
    { 
      src: '/solo-leveling.jpg', 
      alt: 'Solo Leveling',
      spotlight: "#3 Spotlight",
      title: "Solo Leveling Season 2: Arise from the Shadow",
      description: "The second season takes place directly after the events of the first season and picks up with Sung Jinwoo embracing his newfound powers as the Shadow Monarch.",
      duration: "24m",
      releaseDate: "Jan 5, 2025",
      rating: "HD",
      ageRating: "12+"
    },
    { 
      src: '/batman.jpg', 
      alt: 'Batman',
      spotlight: "#4 Spotlight",
      title: "Batman: The Dark Knight Returns",
      description: "After a decade of absence, Bruce Wayne returns to Gotham as crime rates soar.",
      duration: "1h 42m",
      releaseDate: "Feb 10, 2025",
      rating: "HD",
      ageRating: "13+"
    },
  ];

  const totalItems = slides.length;
  const [activeItem, setActiveItem] = useState(0);
  const autoplayInterval = 5000; // Set default autoplay interval
  
  // Auto-advance carousel only if there's more than one slide
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
                className="absolute block w-full h-full object-cover" 
                alt={slide.alt} 
              />
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20"></div>
            </div>
            
            {/* Text content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16 text-white">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 mb-3 text-sm font-medium text-pink-500 bg-pink-500/20 rounded-full">
                  {slide.spotlight}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">{slide.title}</h2>
                <p className="text-gray-300 text-lg mb-6 line-clamp-2 md:line-clamp-3 max-w-2xl">{slide.description}</p>
                
                <div className="flex items-center flex-wrap gap-4 md:gap-6 mb-8">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>TV</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>{slide.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>{slide.releaseDate}</span>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-pink-500/80 rounded">
                    {slide.rating}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-green-500/80 rounded">
                    {slide.ageRating}
                  </span>
                </div>
                
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full transition-colors">
                    <Play size={18} />
                    <span className="font-medium">Watch Now</span>
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gray-800/70 hover:bg-gray-700 rounded-full transition-colors">
                    <Info size={18} />
                    <span>Detail</span>
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