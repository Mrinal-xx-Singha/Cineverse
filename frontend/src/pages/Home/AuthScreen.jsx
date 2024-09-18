import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    navigate("/signup?email="+email);
  };

  return (
    <div className="hero-bg relative min-h-screen ">
      {/* Navbar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <h1 className="text-white text-base sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wide uppercase px-4 py-2 lg:mb-0 sm:px-1">
          CINE VERSE
        </h1>

        <Link
          to={"/login"}
          className="text-white bg-red-600 py-2 px-3 sm:px-4 rounded hover:bg-red-700 transition text-sm sm:text-base md:text-lg lg:text-xl"
        >
          SIGN IN
        </Link>
      </header>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center flex-grow py-16 md:py-32 px-4 text-white max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Watch Trailers, Movies, TV Shows, and More
        </h1>
        <p className="text-xl md:text-2xl font-bold mb-6">
          Watch Anywhere on Your TV, PC, or Mobile
        </p>
        <p className="mb-6 text-base md:text-lg">
          Ready to watch? Enter your email to create your account and enjoy
          unlimited access.
        </p>
        {/* Form to submit email  */}
        <form
          className="flex flex-col md:flex-row gap-4 w-full max-w-md md:max-w-2xl"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            placeholder="Email Address"
            className="p-3 rounded flex-1 bg-black/80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-red-600 text-xl px-4 py-3 rounded flex items-center justify-center hover:bg-red-700 transition"
            type="submit"
          >
            Get Started
            <ChevronRight className="ml-2 w-6 h-6 md:w-8 md:h-8" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;
