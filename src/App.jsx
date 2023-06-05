import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Page404 from './components/Page404';
import GameDetail from './components/GameDetail';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className='app-content'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/profile" element={<Profile favorites={favorites} completed={completed} />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
