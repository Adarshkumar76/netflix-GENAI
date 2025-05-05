import React from "react";
import { BG_URL } from "../../utils/constants";
import GenAISearchBar from "../GenAI/GenAISearchBar";
import GenAIMoviesSuggestion from "../GenAI/GenAIMoviesSuggestion";

const GenAISearch = () => {
  return (
    <div>
      <div className="absolute bg-black -z-10">
        <img className="" src={BG_URL} alt="bg" />
      </div>
      <GenAISearchBar />
      <GenAIMoviesSuggestion />
    </div>
  );
};

export default GenAISearch;
