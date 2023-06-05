import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

/**
 * Header component to display the navigation menu.
 *
 * @returns {JSX.Element} - The rendered Header component.
 */
const Header = () => {
  return (
    <header>
      <div className="Header">
        {/* Navigation menu */}
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/profile">Profil</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
