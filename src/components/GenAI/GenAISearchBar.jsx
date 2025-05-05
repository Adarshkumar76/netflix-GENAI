import React, { useRef } from "react";
import lang from "../../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import ai from "../../utils/genai";
import { API_OPTIONS } from "../../utils/constants";
import { addGenAIMoviesResult } from "../../slices/genAiSlice";

const GenAISearchBar = () => {
  const langKey = useSelector((state) => state.config.lang);
  const searchTxt = useRef(null);
  const dispatch = useDispatch();

  const searchMovies = async (movies) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movies}&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGenAISearchClick = async () => {
    // API call to GENAI
    const Query =
      "Act as a movie recommender. I am looking for a movie to watch. Please suggest me a movie based on the following query: " +
      searchTxt.current.value +
      ". Please provide only 5  movie name, comma separated. like: movie1, movie2, movie3, movie4, movie5";
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: Query,
    });
    const GenAIMovies = response?.text.split(",");

    const PromiseArray = GenAIMovies.map((movie) => searchMovies(movie));
    const moviesResult = await Promise.all(PromiseArray);
    dispatch(
      addGenAIMoviesResult({
        moviesName: GenAIMovies,
        moviesResult: moviesResult,
      })
    );
  };

  return (
    <div className="flex items-center justify-center h-100 ">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-black rounded-lg grid grid-cols-12"
      >
        <input
          ref={searchTxt}
          type="text"
          className="px-3 py-5 m-2 col-span-9 text-white border border-gray-700 rounded-lg focus:border-none"
          placeholder={lang[langKey].placeholder}
        />
        <button
          onClick={handleGenAISearchClick}
          className="px-7 py-2 m-2 col-span-3 bg-red-700 text-white rounded-lg cursor-pointer"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GenAISearchBar;
