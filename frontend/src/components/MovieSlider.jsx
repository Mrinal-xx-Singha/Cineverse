import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Rendering Cards on the UI
const MovieSlider = ({ category }) => {
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrow] = useState(false);

  const sliderRef = useRef(null);

  const { contentType } = useContentStore();
  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";
  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(res.data.content);
    };
    getContent();
  }, [contentType, category]);

  // Scroll Left
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth, // Scroll by the width of the slider container
        behavior: "smooth",
      });
    }
  };

  // Scroll Right
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth, // Scroll by the width of the slider container
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="relative text-white bg-black px-5 md:px-20 py-6"
      onMouseEnter={() => setShowArrow(true)}
      onMouseLeave={() => setShowArrow(false)}
    >
      {/* Category Heading */}
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategoryName} {formattedContentType}
      </h2>

      {/* Movie Slider */}
      <div className="relative">
        <div
          className="flex space-x-4 overflow-x-scroll no-scrollbar snap-x snap-mandatory
          scrollbar-hide
          "
          ref={sliderRef}
        >
          {content.map((item) => (
            <Link
              to={`/watch/${item.id}`}
              key={item.id}
              className="min-w-[250px] group relative snap-start"
            >
              <div className="rounded-lg overflow-hidden">
                <img
                  src={SMALL_IMG_BASE_URL + item.backdrop_path}
                  alt="Movie Image"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:brightness-90"
                />
              </div>
              <p className="mt-2 text-center text-sm md:text-base">
                {item.title || item.name}
              </p>
            </Link>
          ))}
        </div>

        {/* Left Arrow */}
        {showArrows && (
          <button
            className="absolute top-1/2 transform -translate-y-1/2 left-0 md:left-4 flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80
            text-white z-20"
            onClick={scrollLeft}
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Right Arrow */}
        {showArrows && (
          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-0 md:right-4 flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80
            text-white z-20"
            onClick={scrollRight}
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieSlider;
