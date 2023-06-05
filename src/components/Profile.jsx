import React, { useContext, useEffect } from 'react';
import { GameContext } from '../GameContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Profile.css';

const Profile = () => {
  const { favorites, completed } = useContext(GameContext);

  useEffect(() => {
    if (completed.length === 10) {
      toast.success("Congratulations! You've completed 10 games!");
    }
  }, [completed]);

  return (
    <div className='Profile'>
      <h2>My Profile</h2>

      {completed.length >= 10 && (
        <div className='badge'>Congratulations! You have completed 10 games.</div>
      )}

      <h3>Favorite Games</h3>
      {favorites.length > 0 ? (
        <ul className='game-list'>
          {favorites.map((game) => (
            <li key={game.id} className='game-card'>
              <img src={game.background_image} alt={game.name} className='game-image' />
              <p className='game-name'>{game.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite games yet.</p>
      )}

      <h3>Completed Games</h3>
      {completed.length > 0 ? (
        <ul className='game-list'>
          {completed.map((game) => (
            <li key={game.id} className='game-card'>
              <img src={game.background_image} alt={game.name} className='game-image' />
              <p className='game-name'>{game.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No completed games yet.</p>
      )}

      <ToastContainer />
    </div>
  );
};

export default Profile;
