import React from "react";
import { Link } from "react-router-dom";
import "../styles/GameCard.css";

/**
 * GameCard component to display a game card with game information.
 *
 * @param {Object} game - The game object containing the game information.
 * @param {boolean} isLoading - Indicates whether the game is currently being loaded.
 * @returns {JSX.Element} - The rendered GameCard component.
 */
const GameCard = ({ game, isLoading }) => {
  // Render the game card
  return (
    <div className="GameCard">
      {/* Display the game image */}
      <div className="game-image">
        <img src={game.background_image} alt={game.name} />

        {/* Display additional game information */}
        <div className="game-info">
          <p>Released: {game.released}</p>
          <p>
            Developers:{" "}
            {game.developers
              ? game.developers.map((dev) => dev.name).join(", ")
              : "N/A"}
          </p>
          <p>Rating: {game.rating}</p>
        </div>
      </div>

      {/* Display the game name */}
      <h2>{game.name}</h2>

      {/* Display the platforms where the game is available */}
      <div className="platforms">
        {game.platforms
          ? game.platforms.map((platform) => (
              <span key={platform.platform.id} className="platform">
                {platform.platform.name}
              </span>
            ))
          : "N/A"}
      </div>

      {/* Link to the game detail page */}
      <Link to={`/game/${game.id}`}>More details</Link>

      {/* Display a loading message if the game is being loaded */}
      {isLoading ? <p className="loading">Loading...</p> : null}
    </div>
  );
};

export default GameCard;
