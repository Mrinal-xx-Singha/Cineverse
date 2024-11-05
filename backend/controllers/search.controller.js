import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

/**
 *  Retrieves a query parameter from the request and searches for a person on TMDB using that query.
    If no results are found, it returns a 404 response.
    If a result is found, the first result's details (ID, profile image, name) are stored in the user’s searchHistory under the searchType "person."
    Responds with a success message and the list of results.
 * 
 */

export async function searchPerson(req, res) {
  //
  const { query } = req.params;

  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in Search Person Controller", error);
    res.status(500).json({ sucees: false, message: "Internal Server Error" });
  }
}

/**
 *  Similar to searchPerson, this function searches for movies using the TMDB API.
    If a movie is found, it adds the movie’s ID, poster image, title, and search type to the user’s search history as "movie."
    Responds with the search results.
 * 
 */

export async function searchMovie(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in Search Movie Controller", error);
    res.status(500).json({ sucees: false, message: "Internal Server Error" });
  }
}

/**
 * 
 *  Similar to the other search functions, but searches for TV shows.
    Adds the first TV show result to the user’s search history with relevant details (id, poster_path, name) under the search type "tv."
    Responds with the list of results.
 *
 */

export async function searchTv(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in Search Tv Controller", error);
    res.status(500).json({ sucees: false, message: "Internal Server Error" });
  }
}

/**
 * 
 *  Fetches the searchHistory from the authenticated req.user object.
    Returns the search history as a JSON response, showing what the user has previously searched.
 * 
 */
export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
/**
 * 
 *  Retrieves an id parameter from the request, which represents the ID of a search history entry to remove.
    Uses MongoDB’s $pull operator to remove an entry from searchHistory with a matching id.
    Responds with a success message once the entry is removed.
 *
 */


export async function removeItemFromSearchHistory(req, res) {
  let { id } = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });
    res
      .status(200)
      .json({ success: true, message: "Item removed from search history" });
  } catch (error) {
    console.log(
      "Error in Remove Item From Search History Controller",
      error.message
    );
    res.status(500).json({ sucees: false, message: "Internal Server Error" });
  }
}
