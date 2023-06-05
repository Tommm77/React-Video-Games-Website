import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Page404 from "./components/Page404";
import GameDetail from "./components/GameDetail";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import "./index.css";

// Creates a new Context object named GameContext. Components that are under a Provider for this Context will have access to the value provided by it.
export const GameContext = createContext();

// This is the main application component named App.
const App = () => {
  // The useState React Hook initializes and provides methods to update state variables - favorites and completed games.
  const [favorites, setFavorites] = useState([]);
  const [completed, setCompleted] = useState([]);

  // Function to add a game to the favorites list.
  const addToFavorites = (game) => {
    setFavorites((prevFavorites) => [...prevFavorites, game]);
  };

  // Function to add a game to the completed games list.
  const markAsCompleted = (game) => {
    setCompleted((prevCompleted) => [...prevCompleted, game]);
  };

  // This component returns JSX to be rendered.
  // Contains a Router with various Routes and a GameContext.Provider to provide state to nested components.
  return (
    // Wraps the entire application in a router to enable URL-based routing and navigation.
    <Router>
      <div className="app-content">
        {/*  Header component. */}
        <Header />
        {/* Provides the value to the GameContext. */}
        <GameContext.Provider
          value={{ favorites, completed, addToFavorites, markAsCompleted }}
        >
          {/*  Defines the various routes in the application. */}
          <Routes>
            {/* Route for the homepage. */}
            <Route path="/" element={<Home />} />
            {/*  Route for game detail pages. */}
            <Route path="/game/:id" element={<GameDetail />} />
            {/*  Route for the profile page. */}
            <Route path="/profile" element={<Profile />} />
            {/*  Route for the search page. */}
            <Route path="/search" element={<SearchPage />} />
            {/* Catch-all route that displays a 404 page when no other routes match. */}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </GameContext.Provider>
        {/* Footer component. */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
