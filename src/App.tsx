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
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleLogin = (token: string) => {
    if (token) {
      setToken(token);
      localStorage.setItem('token', token); // Save token in localStorage
      setErrorMessage('');
    } else {
      setErrorMessage('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="container">
      {!token ? (
        <div>
          {errorMessage && <h3 style={{ color: 'red' }}>{errorMessage}</h3>}
          <Login onLogin={handleLogin} />
        </div>
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
