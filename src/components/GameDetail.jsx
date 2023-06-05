import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // import useParams
import { GameContext } from '../GameContext';

const GameDetail = () => {
  let { id } = useParams(); // Get the id from the URL parameters
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { addToFavorites, markAsCompleted } = useContext(GameContext);
  const favorites = useContext(GameContext).favorites; // Get the favorites from the context
  const completed = useContext(GameContext).completed; // Get the completed from the context

  useEffect(() => {
    console.log(`Game ID: ${id}`); // Console log the game id
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
    addToFavorites(game);
    console.log('Add to favorites:', favorites);
  };

  const handleMarkAsCompleted = () => {
    markAsCompleted(game);
    console.log('Mark as completed:', completed);
  };


  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <img src={game.background_image} alt={game.name} />
      <h2>{game.name}</h2>
      <p>Rating: {game.rating} ({game.ratings_count} votes)</p>
      <p>Description: {game.description_raw}</p>
      <p>Release Date: {game.released}</p>
      <p>Developers: {game.developers.map(dev => dev.name).join(', ')}</p>
      <p>Genres: {game.genres.map(genre => genre.name).join(', ')}</p>
      <p>Platforms: {game.platforms.map(platform => platform.platform.name).join(', ')}</p>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
      <button onClick={handleMarkAsCompleted}>Mark as Completed</button>
    </div>
  );
};

export default GameDetail;
