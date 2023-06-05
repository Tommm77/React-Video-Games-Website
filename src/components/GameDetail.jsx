import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // import useParams

const GameDetail = () => {
  let { id } = useParams(); // Get the id from the URL parameters
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [completed, setCompleted] = useState(JSON.parse(localStorage.getItem('completed')) || []);

  const addToFavorites = (game) => {
    setFavorites([...favorites, game]);
  };

  const markAsCompleted = (game) => {
    setCompleted([...completed, game]);
  };

  useEffect(() => {
    console.log(`Game ID: ${id}`); // Console log the game id
    axios.get(`https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_APP_RAWG_API_KEY}`)
      .then(response => {
        console.log('API response:', response.data); // Console log the API response
        setGame(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(`Error: ${error}`);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    console.log('Favorites updated:', favorites); // Console log when favorites are updated
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    console.log('Completed games updated:', completed); // Console log when completed games are updated
    localStorage.setItem('completed', JSON.stringify(completed));
  }, [completed]);

  console.log('Game data:', game); // Debug log for the game data

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
      <button onClick={() => addToFavorites(game)}>Add to Favorites</button>
      <button onClick={() => markAsCompleted(game)}>Mark as Completed</button>
    </div>
  );
};

export default GameDetail;
