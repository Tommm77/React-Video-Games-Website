import React from 'react';
import '../styles/GameCard.css';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  return (
    <div className="GameCard">
      <div className="game-image">
        <img src={game.background_image} alt={game.name} />
        <div className="game-info">
          <p>Released: {game.released}</p>
          <p>Developers: {game.developers.map(dev => dev.name).join(', ')}</p>
          <p>Rating: {game.rating}</p>
        </div>
      </div>
      <h2>{game.name}</h2>
      <div className="platforms">
        {game.platforms.map(platform => (
          <span key={platform.platform.id} className="platform">
            {platform.platform.name}
          </span>
        ))}
      </div>
      <Link to={`/game/${game.id}`}>More details</Link>
    </div>
  );
};

export default GameCard;
