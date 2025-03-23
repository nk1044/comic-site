import React from 'react';
import Carousel from '../Components/Carousel'; 
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
          <h2 className='text-3xl font-bold text-[#ffbade] pl-12'>Trending</h2>
          <AnimeCarousel />
        </div>
        <div className='h-40 w-full'>
    
        </div>
      </main>
    </div>
  );
}

export default Home;
