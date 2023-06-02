import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from './GameCard';
import '../styles/Home.css';

const Home = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('A-Z');

  useEffect(() => {
    axios.get(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_APP_RAWG_API_KEY}`)
    .then(response => {
      const gamePromises = response.data.results.map(game => {
        return axios.get(`https://api.rawg.io/api/games/${game.id}?key=${import.meta.env.VITE_APP_RAWG_API_KEY}`);
      });

      Promise.all(gamePromises).then(gameResponses => {
        const detailedGames = gameResponses.map(gameResponse => gameResponse.data);
        setGames(detailedGames);
        setIsLoading(false);
      });
    })
    .catch(error => {
      console.error(`Error: ${error}`);
      setIsLoading(false);
    });
  }, []);

  const sortedGames = [...games].sort((a, b) => {
    switch (sortOrder) {
      case 'A-Z':
        return a.name.localeCompare(b.name);
      case 'Z-A':
        return b.name.localeCompare(a.name);
      case 'Rating High-Low':
        return b.rating - a.rating;
      case 'Rating Low-High':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  return (
    <div className='Home'>
      <div className='sort-container'>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Rating High-Low">Rating High-Low</option>
          <option value="Rating Low-High">Rating Low-High</option>
        </select>
      </div>
    <div className='Home-Card'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        sortedGames.map(game => <GameCard key={game.id} game={game} />)
      )}
    </div>
    </div>
  );
};

export default Home;
