import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search, X } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { setContentType } = useContentStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const NavLink = ({ to, onClick, children }) => (
    <Link
      to={to}
      className="hover:text-gray-300 transition-colors duration-300"
      onClick={() => {
        onClick();
        setIsMobileMenuOpen(false);
      }}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky lg:bg-transparent md:bg-transparent bg-black top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4 h-20">
        <Link to="/">
          <h1 className="text-white text-2xl lg:text-3xl font-extrabold tracking-wider uppercase">
            CINE VERSE
          </h1>
        </Link>

        <nav className="hidden sm:flex gap-6 items-center text-white">
          <NavLink to="/" onClick={() => setContentType("movie")}>Movies</NavLink>
          <NavLink to="/" onClick={() => setContentType("tv")}>TV Shows</NavLink>
          <NavLink to="/history">Search History</NavLink>
          <div className="flex gap-4 items-center">
            <Link to="/search" aria-label="Search">
              <Search size={24} className="cursor-pointer hover:text-gray-300 transition-colors duration-300" />
            </Link>
            <img
              src={user?.image || "/default-avatar.jpg"}
              alt="User Avatar"
              className="h-8 w-8 rounded-full border-2 border-gray-600 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
            />
            <LogOut
              size={24}
              className="cursor-pointer hover:text-gray-300 transition-colors duration-300"
              onClick={logout}
            />
          </div>
        </nav>

        <button 
          className="sm:hidden text-white"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

{/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden px-4 py-2 bg-black  text-white absolute top-20 left-0 w-full transition-all duration-300 ease-in-out flex flex-col">
          <NavLink to="/" onClick={() => setContentType("movie")}>Movies</NavLink>
          <NavLink to="/" onClick={() => setContentType("tv")}>TV Shows</NavLink>
          <NavLink to="/history">Search History</NavLink>
          <div className="flex items-center justify-between py-3 px-6 ">
            <Link to="/search" aria-label="Search">
              <Search size={24} className="cursor-pointer hover:text-gray-300 transition-colors duration-300" />
            </Link>
            <img
              src={user?.image || "/default-avatar.jpg"}
              alt="User Avatar"
              className="h-8 w-8 rounded-full border-2 border-gray-600 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
            />
            <LogOut
              size={24}
              className="cursor-pointer hover:text-gray-300 transition-colors duration-300"
              onClick={logout}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;