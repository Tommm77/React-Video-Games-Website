import React, { useContext, useEffect } from "react";
import { GameContext } from "../GameContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Profile.css";

// This is a functional React component named Profile.
const Profile = () => {
  // Using the useContext React Hook to access the context value - favorites and completed games - from GameContext (1).
  const { favorites, completed } = useContext(GameContext);

  // The useEffect Hook runs after every completed render when the `completed` list changes.
  // If the length of the completed list equals 10, it displays a toast notification (2) congratulating the user.
  useEffect(() => {
    if (completed.length === 10) {
      toast.success("Congratulations! You've completed 10 games!");
    }
  }, [completed]); // useEffect dependency array

  // This component returns JSX to be rendered.
  // Displays profile information including favorite games and completed games.
  return (
    <div className="Profile">
      <h2>My Profile</h2>

      {/* If the user has completed at least 10 games, a congratulatory message is shown. */}
      {completed.length >= 10 && (
        <div className="badge">
          Congratulations! You have completed 10 games.
        </div>
      )}

      <h3>Favorite Games</h3>
      {/* If the user has favorite games, they are displayed in a list. Otherwise, a placeholder message is shown. */}
      {favorites.length > 0 ? (
        <ul className="game-list">
          {favorites.map((game) => (
            // Each game is displayed with its background image and name.
            <li key={game.id} className="game-card">
              <img
                src={game.background_image}
                alt={game.name}
                className="game-image"
              />
              <p className="game-name">{game.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite games yet.</p>
      )}

      <h3>Completed Games</h3>
      {/* If the user has completed games, they are displayed in a list. Otherwise, a placeholder message is shown. */}
      {completed.length > 0 ? (
        <ul className="game-list">
          {completed.map((game) => (
            //  Each game is displayed with its background image and name.
            <li key={game.id} className="game-card">
              <img
                src={game.background_image}
                alt={game.name}
                className="game-image"
              />
              <p className="game-name">{game.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No completed games yet.</p>
      )}

      {/* This container is used for displaying toast notifications (2). */}
      <ToastContainer />
    </div>
  );
};

export default Profile;
