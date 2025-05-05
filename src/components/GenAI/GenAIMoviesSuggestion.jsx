import React from "react";
import { useSelector } from "react-redux";
import MovieList from "../MovieList";

const GenAIMoviesSuggestion = () => {
  const { GenAIMoviesResult, GenAIMoviesName } = useSelector(
    (store) => store.genai
  );
  if (!GenAIMoviesName) null;
  return (
    <div className="text-white bg-black">
      <div>
        {GenAIMoviesName?.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={GenAIMoviesResult[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GenAIMoviesSuggestion;
