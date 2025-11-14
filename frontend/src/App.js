import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import InvestorsPage from "./pages/InvestorsPage";
import ResidentsPage from "./pages/ResidentsPage";
import BuildersPage from "./pages/BuildersPage";
import ResearchersPage from "./pages/ResearchersPage";
import ResourcesPage from "./pages/ResourcesPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/residents" element={<ResidentsPage />} />
          <Route path="/builders" element={<BuildersPage />} />
          <Route path="/researchers" element={<ResearchersPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
