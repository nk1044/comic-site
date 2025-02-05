import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Trending from "./components/Trending";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <Header />
        <Trending />
      </div>
    </Router>
  );
};

export default App;