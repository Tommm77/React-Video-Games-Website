import React from 'react';

function Profile({ favorites, completed }) {
  return (
    <div>
      <h1>Profil</h1>
      <h2>Favoris</h2>
      <ul>
        {favorites.map(game => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
      <h2>Jeux terminés</h2>
      <ul>
        {completed.map(game => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
      {completed.length >= 10 && <div>Badge pour avoir terminé 10 jeux!</div>}
    </div>
  );
}

export default Profile;