import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // React Router for navigation
import logo from "../assets/art-logo.jpg";

export default function Navbar({ mode = "light" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(mode); // Default to the passed mode
  const navigate = useNavigate(); // React Router navigation

  // Disable scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  // Change theme when navigating
  const handleNavigation = (path, newMode) => {
    setTheme(newMode); // Update theme before navigation
    setIsMenuOpen(false); // Close menu
    navigate(path); // Navigate to the new page
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`absolute top-0 left-0 right-0 z-50 bg-transparent text-white`}>
        <div className="container mx-auto px-6 lg:px-32 py-8 flex justify-between items-center relative">
          
          {/* Mobile Hamburger Menu (Left) */}
          <button className={`md:hidden text-3xl text-white`} onClick={() => setIsMenuOpen(true)}>
            <i className="fa-solid fa-bars"></i>
          </button>

          {/* Mobile - Centered "Secrets of Flowers" */}
          <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 text-lg font-bold">
            <Link to="/" className={`text-4xl font-Italianno cursor-pointer font-semibold text-white`}>
            Secrets of Flowers
            </Link>
          </div>

          {/* Desktop - "Secrets of Flowers" on Left */}
          <div className="hidden md:flex text-lg font-bold py-4">
            <Link to="/" className={`text-4xl font-Italianno cursor-pointer font-semibold text-white`}>
            Secrets of Flowers
            </Link>
          </div>

          {/* Desktop Menu - Centered */}
          <ul className={`hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-10 text-xl font-medium font-quicksand items-center text-white`}>
            <li><Link to="/about" className="cursor-pointer transition decoration-2 underline-offset-4 decoration-gray-400 hover:underline">About Me</Link></li>
            <li><Link to="/photography" className="cursor-pointer transition decoration-2 underline-offset-4 decoration-gray-400 hover:underline">Photography</Link></li>            
            <li><Link to="/booking" className="cursor-pointer transition decoration-2 underline-offset-4 decoration-gray-400 hover:underline">Bookings</Link></li>
            <li><Link to="/login" className="cursor-pointer transition decoration-2 underline-offset-4 decoration-gray-400 hover:underline">Login</Link></li>
            <li><Link to="/contact" className="cursor-pointer transition decoration-2 underline-offset-4 decoration-gray-400 hover:underline">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Mobile Overlay Menu - Neutral Background */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#858d6f] flex flex-col justify-center items-center z-50">
          
          {/* Close Button (Top Left) */}
          <button className="absolute top-8 left-6 text-gray-900 text-3xl" onClick={() => setIsMenuOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>

          {/* "Secrets of Flowers" - Always Centered in Menu */}
          <div onClick={() => handleNavigation("/")} className="cursor-pointer absolute text-4xl font-Italianno top-8 left-1/2 transform -translate-x-1/2 text-white font-semibold">
            Secrets of Flowers
          </div>

          {/* Menu Links - Positioned Below */}
          <ul className="text-gray-900 text-center text-3xl space-y-8 font-quicksand absolute bottom-1/2 transform translate-y-1/2">
            <li><span onClick={() => handleNavigation("/about", "light")} className="cursor-pointer decoration-2 underline-offset-4 decoration-gray-400 hover:underline hover:text-gray-700 transition">About Me</span></li>
            <li><span onClick={() => handleNavigation("/photography", "light")} className="cursor-pointer decoration-2 underline-offset-4 decoration-gray-400 hover:underline hover:text-gray-700 transition">Photography</span></li>            
            <li><span onClick={() => handleNavigation("/booking", "light")} className="cursor-pointer decoration-2 underline-offset-4 decoration-gray-400 hover:underline hover:text-gray-700 transition">Bookings</span></li>
            <li><span onClick={() => handleNavigation("/login", "light")} className="cursor-pointer decoration-2 underline-offset-4 decoration-gray-400 hover:underline hover:text-gray-700 transition">Login</span></li>
            <li><span onClick={() => handleNavigation("/contact", "light")} className="cursor-pointer decoration-2 underline-offset-4 decoration-gray-400 hover:underline hover:text-gray-700 transition">Contact</span></li>
          </ul>
        </div>
      )}
    </>
  );
}
