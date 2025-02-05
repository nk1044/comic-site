import React from "react";

const trendingAnime = [
  { id: 1, title: "One Piece", image: "onepiece.jpg" },
  { id: 2, title: "Dandadan", image: "dandadan.jpg" },
  { id: 3, title: "Blue Lock: Season 2", image: "bluelock.jpg" },
  { id: 4, title: "Blue Box", image: "bluebox.jpg" },
  { id: 5, title: "Bleach: Thousand-Year Blood War", image: "bleach.jpg" },
  { id: 6, title: "Rurouni Kenshin", image: "kenshin.jpg" },
];

const Trending = () => {
  return (
    <section className="p-6">
      <h2 className="text-xl font-bold mb-4">Trending</h2>
      <div className="grid grid-cols-3 gap-4">
        {trendingAnime.map((anime) => (
          <div key={anime.id} className="bg-gray-700 p-4 rounded-lg text-center">
            <img src={anime.image} alt={anime.title} className="w-32 h-48 rounded-md mx-auto" />
            <p className="mt-2 font-semibold">{anime.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;