import React from 'react';
import './css/Footer.css'; 

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} <span style={{fontFamily: "Playwrite AU NSW, cursive", color:"orange"}}>SiCrm</span> All rights reserved.</p>
    </footer>
  );
};

export default Footer;
