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
    if (searchTerm.trim() === "") {
      toast.error("Please enter a search term.");
      return;
    }
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error(
          "Nothing found, make sure you are searching under the right category."
        );
      } else {
        toast.error("An error occurred, please try again later.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black min-h-screen text-white">
      <Navbar />
      <div className="container relative mx-auto px-4 py-8">
        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {["movie", "tv", "person"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-6 text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 ${
                activeTab === tab ? "bg-red-600 text-white" : "bg-gray-800 text-gray-400"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}{tab !== "person" && "s"}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search for a ${activeTab}...`}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg shadow-md transition-all">
            <Search className="h-6 w-6" />
          </button>
        </form>

        {/* Search Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
          {results.length > 0 ? (
            results.map((result) => {
              const imageUrl = result.poster_path
                ? ORIGINAL_IMG_BASE_URL + result.poster_path
                : result.profile_path
                ? ORIGINAL_IMG_BASE_URL + result.profile_path
                : "/default-image.jpg"; // Placeholder image

              return (
                <div
                  className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
                  key={result.id}
                >
                  {activeTab === "person" ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={imageUrl}
                        alt={result.name || "Unknown Person"}
                        className="max-h-96 rounded-full object-cover"
                      />
                      <h2 className="mt-4 text-xl font-bold">{result.name}</h2>
                    </div>
                  ) : (
                    <Link to={`/watch/${result.id}`}>
                      <img
                        src={imageUrl}
                        alt={result.title || result.name || "Unknown Title"}
                        className="w-full h-72 object-cover rounded-lg"
                      />
                      <h2 className="mt-4 text-xl font-bold truncate">
                        {result.title || result.name}
                      </h2>
                    </Link>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400 col-span-full">
              No results found. Try searching for something else.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
