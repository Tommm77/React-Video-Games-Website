import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GameContext } from "../GameContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/GameDetail.css";

/**
 * GameDetail component to display detailed information about a game.
 *
 * @returns {JSX.Element} - The rendered GameDetail component.
 */
const GameDetail = () => {
  // Get the game id from the URL parameters
  let { id } = useParams();

  // State variables
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Access the GameContext to use the favorites and completed arrays
  const { addToFavorites, markAsCompleted, favorites, completed } =
    useContext(GameContext);

  // Fetch the game details from the API
  useEffect(() => {
    axios
      .get(
        `https://api.rawg.io/api/games/${id}?key=${
          import.meta.env.VITE_APP_RAWG_API_KEY
        }`
      )
      .then((response) => {
        setGame(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        setIsLoading(false);
      });
  }, [id]);

  // Add the game to favorites
  const handleAddToFavorites = () => {
    if (!favorites.some((favorite) => favorite.id === game.id)) {
      addToFavorites(game);
      toast.success("Game added to Favorites!");
    }
  };

  // Mark the game as completed
  const handleMarkAsCompleted = () => {
    if (!completed.some((complete) => complete.id === game.id)) {
      markAsCompleted(game);
      toast.info("Game marked as Completed!");
    }
  };

  // Render the game details
  if (isLoading) {
    return <p className="Loading">Loading...</p>;
  }

  return (
    <div className="game-detail">
      {/* Display the game image */}
      <img src={game.background_image} alt={game.name} className="game-image" />

      {/* Display the game title, rating, description, release date, developers, genres, and platforms */}
      <h2 className="game-title">{game.name}</h2>
      <p>
        Rating: {game.rating} ({game.ratings_count} votes)
      </p>
      <p>Description: {game.description_raw}</p>
      <p>Release Date: {game.released}</p>
      <p>Developers: {game.developers.map((dev) => dev.name).join(", ")}</p>
      <p>Genres: {game.genres.map((genre) => genre.name).join(", ")}</p>
      <p>
        Platforms:{" "}
        {game.platforms.map((platform) => platform.platform.name).join(", ")}
      </p>

      {/* Button to add the game to favorites */}
      <button onClick={handleAddToFavorites} className="game-btn">
        {favorites.some((favorite) => favorite.id === game.id)
          ? "Already in Favorites"
          : "Add to Favorites"}
      </button>

      {/* Button to mark the game as completed */}
      <button onClick={handleMarkAsCompleted} className="game-btn">
        {completed.some((complete) => complete.id === game.id)
          ? "Already Completed"
          : "Mark as Completed"}
      </button>

      {/* ToastContainer for displaying toast messages */}
      <ToastContainer />
    </div>
  );
};

export default GameDetail;
