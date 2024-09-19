import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Info, Play } from "lucide-react";
import useFetchTrendingContent from "../../hooks/useFetchTrendingContent";
import {
  MOVIE_CATEGORIES,
  TV_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
} from "../../utils/constants";
import { useContentStore } from "../../store/content";
import MovieSlider from "../../components/MovieSlider";
import { useState } from "react";

const HomeScreen = () => {
  // Fetch trending content from your zustand store
  const { trendingContent } = useFetchTrendingContent();
  const { contentType } = useContentStore();
  const [imgLoading, setImgLoading] = useState(true);

  // Show shimmer effect while loading
  if (!trendingContent) {
    return (
      <div className="h-screen relative">
        <Navbar />
        {/* Shimmer loader */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/70">
          <div className="w-full h-screen shimmer rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-screen">
        <Navbar />

        {/* Img Optimization hack */}
        {imgLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/70">
            <div className="w-full h-screen shimmer rounded-md"></div>
          </div>
        )}
        {/* Background Image */}
        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="img"
          className="absolute top-0 left-0 w-full h-full object-cover -z-20"
          onLoad={() => setImgLoading(false)}
        />

        {/* Dark Overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"
          aria-hidden={true}
        />

        {/* Content Overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-center
          px-8 md:px-16 lg:px-32 text-white z-30"
        >
          {/* Gradient for Fading Effect */}
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 z-20" />

          {/* Main Content */}
          <div className="max-w-2xl z-30">
            <h1 className="mt-4 text-6xl font-extrabold">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="mt-2 text-lg">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0]}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}
            </p>
            <p className="mt-4 text-lg">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200) + "..."
                : trendingContent?.overview}
            </p>
          </div>

          {/* Play and More Info Buttons */}
          <div className="flex mt-4 z-30">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded
              mr-4 flex items-center"
            >
              <Play className="size-6 inline-block mr-2 fill-black" />
              Play
            </Link>
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center"
            >
              <Info className="size-6 inline-block mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>
      {/* Cards Section */}
      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
