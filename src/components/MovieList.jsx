import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <>
      <h1 className="text-3xl px-6 py-2 font-bold">{title}</h1>
      <div className="flex overflow-x-scroll p-2 scroll no-scrollbar">
        <div className="flex px-6">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieList;
