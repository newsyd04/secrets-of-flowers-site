import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#544265] text-white py-16">
      <div className="container mx-auto px-6 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Secrets of Flowers</h3>
            <p className="text-gray-400">
              Bringing creativity to life through vibrant colors and captivating artworks.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-gray-300 transition">About Me</Link></li>
              <li><Link to="/photography" className="hover:text-gray-300 transition">Artworks</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300 transition">Contact</Link></li>
              <li><Link to="/login" className="hover:text-gray-300 transition">Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">📍 Tralee, Co. Kerry, Ireland</p>
            <p className="text-gray-400">📞 +123-456-7890</p>
            <p className="text-gray-400">
              ✉️ <a href="mailto:mairead@secretsofflowers.com" className="hover:text-gray-300">
                mairead@secretsofflowers.com
              </a>
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-400">
          <p>© {new Date().getFullYear()} Secrets of Flowers. All rights reserved.</p>
          
          {/* Designed by Dara Newsome */}
          <p className="text-sm mt-4 md:mt-0">
            Designed & Developed by <a href="https://daranewso.me" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 font-semibold">Dara Newsome</a>
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300"><i className="fa-brands fa-facebook text-2xl"></i></a>
            <a href="#" className="hover:text-gray-300"><i className="fa-brands fa-instagram text-2xl"></i></a>
            <a href="#" className="hover:text-gray-300"><i className="fa-brands fa-twitter text-2xl"></i></a>
            <a href="#" className="hover:text-gray-300"><i className="fa-brands fa-linkedin text-2xl"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
