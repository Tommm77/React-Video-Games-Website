import React, { useContext } from 'react';
import { GameContext } from '../GameContext';

const Profile = () => {
  const { favorites, completed } = useContext(GameContext);

  console.log('Favorites:', favorites);
  console.log('Completed:', completed);

  return (
    <div>
      <h2>My Profile</h2>
      <h3>Favorite Games</h3>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((game) => (
            <li key={game.id}>{game.name}</li>
          ))}
        </ul>
      ) : (
        <p>No favorite games yet.</p>
      )}

      <h3>Completed Games</h3>
      {completed.length > 0 ? (
        <ul>
          {completed.map((game) => (
            <li key={game.id}>{game.name}</li>
          ))}
        </ul>
      ) : (
        <p>No completed games yet.</p>
      )}
    </div>
  );
};

export default Profile;
