import React, { useState } from 'react';
import './css/Header.css'; 
import { FaMoon, FaSun } from 'react-icons/fa'; // Make sure to install react-icons

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const [isLightMode, setIsLightMode] = useState(true);

  const toggleMode = () => {
    setIsLightMode(prevMode => !prevMode);
  };

  return (
    <header className={`header ${isLightMode ? 'light-mode' : 'dark-mode'}`}>
      <h1 className="header-title" style={{ fontFamily: "Oswald, sans-serif" }}>{title}</h1>
      <p className="header-subtitle" style={{ fontFamily: "Playwrite AU NSW, cursive" }}>{subtitle}</p>
      <button className="mode-toggle" onClick={toggleMode}>
        {isLightMode ? <FaMoon /> : <FaSun />}
      </button>
    </header>
  );
};

export default Header;
