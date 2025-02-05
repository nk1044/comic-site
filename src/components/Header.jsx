import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800">
      <h1 className="text-pink-500 text-2xl font-bold">h!anime</h1>
      <input
        type="text"
        placeholder="Search anime..."
        className="p-2 rounded-md text-black"
      />
      <button className="bg-pink-500 text-white px-4 py-2 rounded-md">Login</button>
    </header>
  );
};

export default Header;