import React from 'react';
import '../styles/GameCard.css';
import { Link } from 'react-router-dom';

const GameCard = ({ game, isLoading }) => {
  return (
    <div className="GameCard">
      <div className="game-image">
        <img src={game.background_image} alt={game.name} />
        <div className="game-info">
          <p>Released: {game.released}</p>
          <p>Developers: {game.developers ? game.developers.map(dev => dev.name).join(', ') : 'N/A'}</p>
          <p>Rating: {game.rating}</p>
        </div>
      </div>
      <h2>{game.name}</h2>
      <div className="platforms">
        {game.platforms ? game.platforms.map(platform => (
          <span key={platform.platform.id} className="platform">
            {platform.platform.name}
          </span>
        )) : 'N/A'}
      </div>
      <Link to={`/game/${game.id}`}>More details</Link>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : null}
    </div>
  );
};

export default GameCard;
