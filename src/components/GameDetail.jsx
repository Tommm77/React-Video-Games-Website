import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GameContext } from '../GameContext';
import '../styles/GameDetail.css'; // Import the stylesheet

const GameDetail = () => {
  let { id } = useParams();
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { addToFavorites, markAsCompleted, favorites, completed } = useContext(GameContext);

  useEffect(() => {
    axios.get(`https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_APP_RAWG_API_KEY}`)
      .then(response => {
        setGame(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(`Error: ${error}`);
        setIsLoading(false);
      });
  }, [id]);

  const handleAddToFavorites = () => {
    if (!favorites.some(favorite => favorite.id === game.id)) {
      addToFavorites(game);
    }
  };

  const handleMarkAsCompleted = () => {
    if (!completed.some(complete => complete.id === game.id)) {
      markAsCompleted(game);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className='game-detail'>
      <img src={game.background_image} alt={game.name} className='game-image' />
      <h2 className='game-title'>{game.name}</h2>
      <p>Rating: {game.rating} ({game.ratings_count} votes)</p>
      <p>Description: {game.description_raw}</p>
      <p>Release Date: {game.released}</p>
      <p>Developers: {game.developers.map(dev => dev.name).join(', ')}</p>
      <p>Genres: {game.genres.map(genre => genre.name).join(', ')}</p>
      <p>Platforms: {game.platforms.map(platform => platform.platform.name).join(', ')}</p>
      <button onClick={handleAddToFavorites} className='game-btn'>
        {favorites.some(favorite => favorite.id === game.id) ? 'Already in Favorites' : 'Add to Favorites'}
      </button>
      <button onClick={handleMarkAsCompleted} className='game-btn'>
        {completed.some(complete => complete.id === game.id) ? 'Already Completed' : 'Mark as Completed'}
      </button>
    </div>
  );
};

export default GameDetail;
