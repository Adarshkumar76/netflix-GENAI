import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../slices/movieSlice";
import { useEffect } from "react";

const useTrailerVideos = (movieId) => {
  const dispatch = useDispatch();
  const tailerVideo = useSelector((store) => store.movies.trailerVideo);
  const getMovieVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    if (!tailerVideo) {
      getMovieVideo();
    }
  }, []);
};

export default useTrailerVideos;
