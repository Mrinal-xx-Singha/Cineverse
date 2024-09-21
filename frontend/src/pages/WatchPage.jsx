import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar"; // Ensure this path is correct
import { useContentStore } from "../store/content"; // Ensure this is correctly imported
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants"; // Ensure correct constants
import formatReleaseDate from "../utils/dateFunctions"; // Import your date format function
import WatchPageSkeleton from "../components/skeleton/WatchPageSkeleton"; // Skeleton loader component

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();

  const sliderRef = useRef(null);

  // Fetch trailers
  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers || []); // Make sure it doesn't break on undefined trailers
      } catch (error) {
        setTrailers([]); // Fallback to empty array if there's an error
      }
    };
    getTrailers();
  }, [contentType, id]);

  // Fetch similar content
  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar || []); // Fallback to empty array
      } catch (error) {
        setSimilarContent([]); // Handle errors gracefully
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  // Fetch content details
  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content || null); // Ensure we get either content or null
      } catch (error) {
        setContent(null); // Handle errors
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };
    getContentDetails();
  }, [contentType, id]);

  const handleNext = () => {
    if (currentTrailerIndex < trailers.length - 1) {
      setCurrentTrailerIndex(currentTrailerIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentTrailerIndex > 0) {
      setCurrentTrailerIndex(currentTrailerIndex - 1);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  // Loading state
  if (loading)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );

  // No content state
  if (!content) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mx-auto px-4 py-8 h-full">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        

        {/* Showing trailers */}
        {trailers.length > 0 ? (
          <div className="relative flex flex-col items-center mb-8 mt-10">
            <div className="w-full max-w-4xl aspect-video relative">
              <ReactPlayer
                controls
                width="100%"
                height="100%"
                className="absolute top-0 left-0"
                url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex].key}`}
              />
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                className={`bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full transition-all ${
                  currentTrailerIndex === 0 ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={handlePrev}
                disabled={currentTrailerIndex === 0}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className={`bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full transition-all ${
                  currentTrailerIndex === trailers.length - 1
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                onClick={handleNext}
                disabled={currentTrailerIndex === trailers.length - 1}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        ) : (
          <h2 className="text-xl text-center mt-5">
            No trailers available for{" "}
            <span className="font-bold text-red-600">
              {content?.title || content?.name}
            </span>{" "}
            😥
          </h2>
        )}

        {/* Content details */}
        {content && (
          <div className="flex flex-col md:flex-row mt-8 md:space-x-8">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <img
                src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
                alt="Poster"
                className="w-full rounded-md shadow-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {content?.title || content?.name}
              </h2>
              <p className="text-lg">
                {formatReleaseDate(
                  content?.release_date || content?.first_air_date
                )}{" "}
                {content?.adult ? (
                  <span className="text-red-600">18+</span>
                ) : (
                  <span className="text-green-600">PG-13</span>
                )}
              </p>
              <p className="mt-4 text-lg leading-relaxed">
                {content?.overview}
              </p>
            </div>
          </div>
        )}

        {/* Similar content */}
        {similarContent.length > 0 && (
          <div className="mt-20 relative">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Similar Movies / TV Shows
            </h3>
            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4"
              ref={sliderRef}
            >
              {similarContent.map((similarItem) => {
                if (!similarItem.poster_path) return null;
                return (
                  <Link
                    key={similarItem.id}
                    to={`/watch/${similarItem.id}`}
                    className="flex-none w-36 sm:w-44"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + similarItem?.poster_path}
                      alt="Poster"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-sm font-semibold text-center">
                      {similarItem?.title || similarItem?.name}
                    </h4>
                  </Link>
                );
              })}
            </div>
            <button
              className="absolute top-1/2 -translate-y-1/2 left-0 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full"
              onClick={scrollLeft}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="absolute top-1/2 -translate-y-1/2 right-0 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full"
              onClick={scrollRight}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
