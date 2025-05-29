import React from 'react';
import { FaFacebookF, FaPinterestP, FaYoutube, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Logo */}
        <div className="text-center text-md-start mb-3 mb-md-0">
          <h5 className="mb-0">
             <span style={{ color: '#ff69b4' }}>PARTY</span><span>PLANER</span>
          </h5>
        </div>

        {/* Links + Social */}
        <div className="d-flex flex-column flex-md-row align-items-center">
          {/* Links */}
          <div className="d-flex align-items-center mb-2 mb-md-0 me-md-4">
            <a href="#" className="text-white text-decoration-none me-2 fw-bold">CONTACT</a>
            <span className="text-white mx-1">•</span>
            <a href="#" className="text-white text-decoration-none ms-2 fw-bold">PRESS</a>
          </div>

          {/* Icons */}
          <div className="d-flex gap-3 fs-5">
            <a href="#" className="text-white"><FaFacebookF /></a>
            <a href="#" className="text-white"><FaPinterestP /></a>
            <a href="#" className="text-white"><FaYoutube /></a>
            <a href="#" className="text-white"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
