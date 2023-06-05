import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [completed, setCompleted] = useState([]);

  const addToFavorites = (game) => {
    setFavorites((prevFavorites) => [...prevFavorites, game]);
  };

  const markAsCompleted = (game) => {
    setCompleted((prevCompleted) => [...prevCompleted, game]);
  };

  return (
    <GameContext.Provider value={{ favorites, completed, addToFavorites, markAsCompleted }}>
      {children}
    </GameContext.Provider>
  );
};
