import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Page404 from './components/Page404';
import GameDetail from './components/GameDetail';
import Profile from './components/Profile';
import './index.css';

export const GameContext = createContext();

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [completed, setCompleted] = useState([]);

  const addToFavorites = (game) => {
    setFavorites((prevFavorites) => [...prevFavorites, game]);
  };

  const markAsCompleted = (game) => {
    setCompleted((prevCompleted) => [...prevCompleted, game]);
  };

  return (
    <Router>
      <div className='app-content'>
        <Header />
        <GameContext.Provider value={{ favorites, completed, addToFavorites, markAsCompleted }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </GameContext.Provider>
        <Footer />
      </div>
    </Router>
  );
};

export default App;