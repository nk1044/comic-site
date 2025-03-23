import React from 'react';
import Carousel from './Carousel'; 
import AnimeCarousel from '../Components/TrendsCard';

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="h-[90vh] w-full">
          <Carousel />
        </div>

        {/* Anime Carousel Section */}
        <div className="mt-10 px-4">
          <AnimeCarousel />
        </div>
      </main>
    </div>
  );
}

export default Home;
