import React from 'react';
import './css/Header.css'; 

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="header">
      <h1 className="header-title" style={{fontFamily: "Oswald, sans-serif"}}>{title}</h1>
      <p className="header-subtitle" style={{fontFamily: "Playwrite AU NSW, cursive"}}>{subtitle}</p>
    </header>
  );
};

export default Header;
