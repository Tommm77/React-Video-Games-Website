import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header>
      <div className='Header'>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          {/* Ajoutez d'autres liens de navigation ici si nécessaire */}
        </ul>
      </nav>
      </div>
    </header>
  );
};

export default Header;
