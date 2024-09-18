import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="absolute max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 gap-x-20">
      {/* Logo */}
      <div className="flex items-center gap-20 z-50">
        <Link to="/">
          <h1 className="text-white text-base sm:text-xl md:text-2xl  lg:text-3xl font-bold tracking-wide uppercase px-4 py-2 lg:mb-0 sm:px-1">
            CINE VERSE
          </h1>
        </Link>
      </div>

      {/* Desktop nvbar items */}
      <div className="hidden sm:flex gap-2 items-center text-white">
        <Link to="/" className="hover:underline">
          Movies
        </Link>
        <Link to="/" className="hover:underline">
          Tv Shows
        </Link>
        <Link to="/history" className="hover:underline">
          Search History
        </Link>
      </div>
      {/* Mobile navbar items */}

      {isMobileMenuOpen && (
        <div className="w-full sm:hideen mt-4 z-50 bg-black rounded border-gray-800">
            <Link  to={"/"} className="block hover:underline p-2"
            onClick={toggleMobileMenu}
            >
            Movie
            </Link>
            <Link  to={"/"} className="block hover:underline p-2"
            onClick={toggleMobileMenu}
            >
            Tv Shows
            </Link>
            <Link  to={"/history"} className="block hover:underline p-2"
            onClick={toggleMobileMenu}
            >
            Searchhistory
            </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
