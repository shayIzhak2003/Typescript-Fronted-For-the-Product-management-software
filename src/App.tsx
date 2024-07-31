import React, { useState } from 'react';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Carousel from './components/Carousel';
import SearchBar from './components/SearchBar';
import './App.css';

const App: React.FC = () => {
  const carouselItems = [
    { src: '/images/tv-4.webp', alt: 'TV' },
    { src: '/images/ear.webp', alt: 'Ear' },
    { src: '/images/c11.webp', alt: 'C11' },
  ];

  const [token, setToken] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleLogin = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token); // Save token in localStorage
  };

  return (
    <div className="container">
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <Carousel items={carouselItems} />
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <ProductList token={token} searchQuery={searchQuery} />
        </div>
      )}
    </div>
  );
};

export default App;
