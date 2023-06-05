import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from './GameCard';
import '../styles/SearchPage.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(query.length >= 3) searchGames();
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const searchGames = () => {
    setIsLoading(true);
    axios
      .get(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_APP_RAWG_API_KEY}&search=${query}`)
      .then(response => {
        setGames(response.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(`Error: ${error}`);
        setIsLoading(false);
      });
  };

  return (
    <div className='SearchPage'>
      <div className='search-container'>
        <input
          type='text'
          value={query}
          onChange={handleInputChange}
          placeholder='Search for a game...'
        />
        <button onClick={searchGames}>Search</button>
      </div>

      <div className='SearchPage-Card'>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          games.map(game => <GameCard key={game.id} game={game} />)
        )}
      </div>
    </div>
  );
};

export default SearchPage;