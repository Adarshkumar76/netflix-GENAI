import React from "react";
import { TMDB_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if(!posterPath) return null;
  return (
    <div className="w-48 p-2">
      <img className="rounded" src={TMDB_CDN_URL + posterPath} alt="moviePoster" />
    </div>
  );
};

export default MovieCard;
