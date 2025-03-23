import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimeCard from "./AnimeCard";

// Example Data
const animeData = [
  { name: "Attack On Titan", index: "01", img: "/aot.png" },
  { name: "Jujutsu Kaisen", index: "02", img: "/jjk1.png" },
  { name: "Solo Leveling", index: "03", img: "/solo-leveling.jpg" },
  { name: "Jujutsu Kaisen", index: "04", img: "/jjk2.png" },
  { name: "Jujutsu Kaisen", index: "05", img: "/jjk1.png" },
  { name: "Solo Leveling", index: "06", img: "/solo-leveling.jpg" },
  { name: "Jujutsu Kaisen", index: "07", img: "/jjk2.png" },
  { name: "Attack On Titan", index: "08", img: "/aot.png" },
  { name: "Jujutsu Kaisen", index: "05", img: "/jjk1.png" },
  { name: "Batman", index: "06", img: "/batman.jpg" },
];

const AnimeCarousel = () => {
  const carouselRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState(1);
  const [startIndex, setStartIndex] = useState(0);

  // Calculate how many cards fit on screen
  useEffect(() => {
    const updateVisibleCards = () => {
      if (carouselRef.current) {
        const cardWidth = 200; // Adjust based on your card width
        const containerWidth = carouselRef.current.offsetWidth;
        setVisibleCards(Math.floor(containerWidth / cardWidth));
      }
    };
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const handleNext = () => {
    if (startIndex + visibleCards < animeData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="relative w-full px-8 py-6">
      {/* Anime Cards Container */}
      <div className="overflow-hidden">
        <div
          ref={carouselRef}
          className="flex gap-6 transition-transform duration-300"
          style={{ transform: `translateX(-${startIndex * 200}px)` }} // Adjust based on card width
        >
          {animeData.map((anime, index) => (
            <AnimeCard key={index} {...anime} />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-3 flex-col">
        <button
          onClick={handlePrev}
          className="p-3 bg-gray-800 text-white rounded-full disabled:opacity-50 flex items-center justify-center"
          disabled={startIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="p-3 bg-gray-800 text-white rounded-full disabled:opacity-50 flex items-center justify-center"
          disabled={startIndex + visibleCards >= animeData.length}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default AnimeCarousel;
