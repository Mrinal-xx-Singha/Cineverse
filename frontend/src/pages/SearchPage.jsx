import React, { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Nothing found, make sure you are searching under the right category"
        );
      } else {
        toast.error("An error occurred, please try again later");
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            className={`py-2 px-6 rounded-lg font-semibold shadow transition-all ${
              activeTab === "movie"
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-gray-300"
            } hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-6 rounded-lg font-semibold shadow transition-all ${
              activeTab === "tv"
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-gray-300"
            } hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-6 rounded-lg font-semibold shadow transition-all ${
              activeTab === "person"
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-gray-300"
            } hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600`}
            onClick={() => handleTabClick("person")}
          >
            Person
          </button>
        </div>

        {/* Search Input */}
        <form
          className="flex gap-3 items-stretch mb-10 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search for a ${activeTab}...`}
            className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-red-600 focus:outline-none"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg shadow-lg transition-all focus:ring-2 focus:ring-red-600 focus:outline-none">
            <Search className="h-6 w-6" />
          </button>
        </form>

        {/* Search Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;
            return (
              <div
                className="group bg-gray-800 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
                key={result.id}
              >
                {activeTab === "person" ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                      alt={result.name}
                      className="w-48 h-48 object-cover rounded-full shadow-md transition-opacity group-hover:opacity-90"
                    />
                    <h2 className="mt-4 text-xl font-bold text-center group-hover:text-red-400 transition-colors">
                      {result.name}
                    </h2>
                  </div>
                ) : (
                  <Link to={`/watch/${result.id}`}>
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                      alt={result.title || result.name}
                      className="w-full h-72 object-cover rounded-lg shadow-md transition-opacity group-hover:opacity-90"
                    />
                    <h2 className="mt-4 text-lg font-semibold text-center truncate group-hover:text-red-400 transition-colors">
                      {result.title || result.name}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
