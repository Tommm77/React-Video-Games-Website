import React, { useState, useEffect } from "react";
import axios from "axios";
import GameCard from "./GameCard";
import "../styles/SearchPage.css";

// This is a functional React component named SearchPage.
const SearchPage = () => {
  // The useState React Hook initializes and provides methods to update state variables - query, games, and isLoading.
  const [query, setQuery] = useState(""); // 5
  const [games, setGames] = useState([]); // 6
  const [isLoading, setIsLoading] = useState(false); // 7

  // The useEffect React Hook is used to perform side effects in functional components.
  // In this case, it initiates a search whenever the `query` changes and its length is 3 or more.
  useEffect(() => {
    if (query.length >= 3) searchGames();
  }, [query]); // useEffect dependency array

  // This function is called when the input field changes. It updates the `query` state.
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // This function sends a GET request to the RAWG Video Games Database API to fetch games based on the search `query`.
  const searchGames = () => {
    setIsLoading(true); // Set loading state to true before starting the request.
    axios
      .get(
        `https://api.rawg.io/api/games?key=${
          import.meta.env.VITE_APP_RAWG_API_KEY
        }&search=${query}`
      )
      .then((response) => {
        // Once the response is received, update the `games` state with the received data and set loading state to false.
        setGames(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        // If an error occurs during the request, log it and set loading state to false.
        console.error(`Error: ${error}`);
        setIsLoading(false);
      });
  };

  // This component returns JSX to be rendered.
  // Contains an input field for searching games, a search button, and a section for displaying the games or a loading message.
  return (
    <div className="SearchPage">
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a game..."
        />
        <button onClick={searchGames}>Search</button>
      </div>

      <div className="SearchPage-Card">
        {isLoading ? (
          // Display "Loading..." message if the request is in progress.
          <p>Loading...</p>
        ) : (
          // If the request has finished, display the fetched games using the GameCard component.
          games.map((game) => <GameCard key={game.id} game={game} />)
        )}
      </div>
    </div>
  );
};

export default SearchPage;
