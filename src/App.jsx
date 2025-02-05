import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Trending from "./components/Trending";
import { FloatingNavDemo } from "./components/Navbar";
import { BackgroundGradientDemo } from "./components/BackgroundGradientDemo";
import { VortexDemo } from "./components/VortexDemo";


const App = () => {
  return (
    
      <div className="bg-gray-900 text-white min-h-screen">
        {/* <Header /> */}
        <FloatingNavDemo />
        <VortexDemo />
        <div className="flex flex-wrap gap-2 justify-around mt-10">
          <BackgroundGradientDemo />
          <BackgroundGradientDemo />
          <BackgroundGradientDemo />
          <BackgroundGradientDemo />
          <BackgroundGradientDemo />
          <BackgroundGradientDemo />
        </div>
        {/* <Trending /> */}
      </div>
  );
};

export default App;