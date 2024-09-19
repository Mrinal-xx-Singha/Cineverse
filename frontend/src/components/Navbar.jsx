import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);


  const {setContentType} = useContentStore()

  

  return (
    <header className="fixed top-0 left-0 w-full  z-50 transition-all duration-300 ease-in-out">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4 h-20">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-white text-2xl lg:text-3xl font-extrabold tracking-wider uppercase">
            CINE VERSE
          </h1>
        </Link>

        {/* Desktop Navbar Items */}
        <div className="hidden sm:flex gap-6 items-center text-white">
          <Link
            to="/"
            className="hover:text-gray-300 transition-colors duration-300"
          onClick={()=>setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to="/"
            className="hover:text-gray-300 transition-colors duration-300"
            onClick={()=>setContentType("tv")}
          >
            TV Shows
          </Link>
          <Link
            to="/history"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            Search History
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/search" aria-label="Search">
              <Search
                size={24}
                className="cursor-pointer hover:text-gray-300 transition-colors duration-300"
              />
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

        {/* Mobile Menu Icon */}
        <div className="sm:hidden">
          <Menu
            size={28}
            className="cursor-pointer text-white hover:text-gray-300 transition-colors duration-300"
            onClick={toggleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Navbar Items */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gray-800 text-white absolute top-20 left-0 w-full transition-transform duration-300 ease-in-out">
          <Link
            to="/"
            className="block py-3 px-6 border-b border-gray-700 hover:bg-gray-700 transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            to="/"
            className="block py-3 px-6 border-b border-gray-700 hover:bg-gray-700 transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            TV Shows
          </Link>
          <Link
            to="/history"
            className="block py-3 px-6 border-b border-gray-700 hover:bg-gray-700 transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
          <div className="flex items-center justify-between py-3 px-6 border-t border-gray-700">
            <Link to="/search" aria-label="Search">
              <Search
                size={24}
                className="cursor-pointer hover:text-gray-300 transition-colors duration-300"
              />
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
