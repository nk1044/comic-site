import React from 'react';
import Carousel from './Carousel'; 
import Navbar from '../Components/Navbar';

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="h-[90vh] w-full">
          <Carousel />
        </div>
        
        <section className="container mx-auto py-8 px-6">
          <h2 className="text-2xl font-bold mb-4">Popular Shows</h2>
          <p>Additional content would go here...</p>
        </section>
      </main>
      
      {/* Footer */}
      
    </div>
  );
}

export default Home;