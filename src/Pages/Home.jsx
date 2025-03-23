import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Home() {
  const [activeItem, setActiveItem] = useState(1);
  const Images = [
    { src: '/aot.png', alt: 'Attack on Titan' },
  ]

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((current) => (current === totalItems - 1 ? 0 : current + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle navigation
  const goToPrev = () => {
    setActiveItem((current) => (current === 0 ? totalItems - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveItem((current) => (current === totalItems - 1 ? 0 : current + 1));
  };

  return (
    <div id="controls-carousel" className="relative w-full" data-carousel="static">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {Images.map((image, index) => (
          <div 
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              activeItem === index ? 'opacity-100' : 'opacity-0'
            }`}
            data-carousel-item={activeItem === index ? "active" : ""}
          >
            <img 
              src={image.src} 
              className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" 
              alt={`Carousel item ${index + 1}`} 
            />
          </div>
        ))}
      </div>
      
      {/* Previous button */}
      <button 
        type="button" 
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
        onClick={goToPrev}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <ChevronLeft className="w-6 h-6 text-white dark:text-gray-800" />
          <span className="sr-only">Previous</span>
        </span>
      </button>
      
      {/* Next button */}
      <button 
        type="button" 
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
        onClick={goToNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <ChevronRight className="w-6 h-6 text-white dark:text-gray-800" />
          <span className="sr-only">Next</span>
        </span>
      </button>
      
      {/* Indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        {[...Array(totalItems)].map((_, index) => (
          <button
            key={`indicator-${index}`}
            type="button"
            className={`w-3 h-3 rounded-full ${
              activeItem === index ? 'bg-white' : 'bg-white/50'
            }`}
            aria-current={activeItem === index ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveItem(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Home;