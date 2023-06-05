import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import GameCard from './GameCard';
import '../styles/Home.css';
import { GameContext } from '../GameContext';

const Home = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('None');
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchedGameIds, setFetchedGameIds] = useState(new Set());
  const { favorites } = useContext(GameContext);

  console.log('Favorites:', favorites);

  const fetchGames = (page) => {
    axios.get(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_APP_RAWG_API_KEY}&page=${page}`)
    .then(response => {
      const gamePromises = response.data.results.map(game => {
        if (fetchedGameIds.has(game.id)) {
          return Promise.resolve(null);
        }
        return axios.get(`https://api.rawg.io/api/games/${game.id}?key=${import.meta.env.VITE_APP_RAWG_API_KEY}`);
      });

      Promise.all(gamePromises).then(gameResponses => {
        const detailedGames = gameResponses.filter(gameResponse => gameResponse !== null).map(gameResponse => gameResponse.data);
        const uniqueGames = Array.from(new Set([...games, ...detailedGames].map(game => game.id)))
                                .map(id => [...games, ...detailedGames].find(game => game.id === id));
        setGames(uniqueGames);
        setIsLoading(false);
      });
    })
    .catch(error => {
      console.error(`Error: ${error}`);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    fetchGames(currentPage);
  }, [currentPage]);

  const loadMoreGames = () => {
    setCurrentPage(currentPage + 1);
  }

  let sortedGames = [...games];
  if (sortOrder !== "None") {
    sortedGames.sort((a, b) => {
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
  }

  return (
    <div className='Home'>
      <div className='sort-container'>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="None">None</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Rating High-Low">Rating High-Low</option>
          <option value="Rating Low-High">Rating Low-High</option>
        </select>
      </div>
    <div className='Home-Card'>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        sortedGames.map(game => <GameCard key={game.id} game={game} />)
      )}
    </div>
    <div className='more-container'>
      <button onClick={loadMoreGames}>Load more games</button>
      </div>
    </div>
  );
};

export default Home;