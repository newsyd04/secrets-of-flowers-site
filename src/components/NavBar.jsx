import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NAV_LINKS = [
  { to: "/about", label: "About Me" },
  { to: "/photography", label: "Photography" },
  { to: "/booking", label: "Bookings" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  // Only the home route has a full-bleed dark hero — everywhere else the
  // navbar should default to solid so it stays readable.
  const isHeroRoute = location.pathname === "/";

  // Scroll-aware solid bar after 80px (only matters on hero routes; others
  // are solid from the start)
  useEffect(() => {
    if (!isHeroRoute) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHeroRoute]);

  // Lock scroll while mobile menu open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  const handleNavigation = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const navTone = scrolled
    ? "bg-cream-50/90 backdrop-blur shadow-sm text-ink-900"
    : "bg-transparent text-white";

  const linkUnderline =
    "cursor-pointer transition decoration-2 underline-offset-[6px] hover:underline";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navTone}`}>
        <div className="mx-auto max-w-page px-6 lg:px-8 py-5 md:py-6 flex items-center justify-between relative">
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-2xl leading-none p-2 -ml-2"
            aria-label="Open menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <i className="fa-solid fa-bars" />
          </button>

          {/* Mobile centered wordmark */}
          <Link
            to="/"
            className="md:hidden absolute left-1/2 -translate-x-1/2 font-Italianno text-3xl leading-none"
          >
            Secrets of Flowers
          </Link>

          {/* Spacer for mobile right side */}
          <span className="md:hidden w-8" />

          {/* Desktop wordmark (left) */}
          <Link
            to="/"
            className="hidden md:block font-Italianno text-4xl leading-none"
          >
            Secrets of Flowers
          </Link>

          {/* Desktop links (right) */}
          <ul className="hidden md:flex items-center gap-8 text-base font-quicksand font-medium">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkUnderline}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={isAuthenticated ? "/upload" : "/login"}
                className={linkUnderline}
              >
                {isAuthenticated ? "Upload" : "Login"}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-cream-50 z-[60] flex flex-col">
          <div className="px-6 py-5 flex items-center justify-between border-b border-sage-100">
            <button
              className="text-sage-800 text-2xl p-2 -ml-2"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fa-solid fa-xmark" />
            </button>
            <span
              onClick={() => handleNavigation("/")}
              className="cursor-pointer font-Italianno text-3xl text-sage-800"
            >
              Secrets of Flowers
            </span>
            <span className="w-8" />
          </div>

          <ul className="flex-1 flex flex-col items-center justify-center gap-8 text-2xl font-quicksand text-sage-800">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <span
                  onClick={() => handleNavigation(l.to)}
                  className="cursor-pointer hover:text-sage-600 transition"
                >
                  {l.label}
                </span>
              </li>
            ))}
            <li>
              <span
                onClick={() => handleNavigation(isAuthenticated ? "/upload" : "/login")}
                className="cursor-pointer hover:text-sage-600 transition"
              >
                {isAuthenticated ? "Upload" : "Login"}
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
