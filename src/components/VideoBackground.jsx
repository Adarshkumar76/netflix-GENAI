import React from "react";
import { useSelector } from "react-redux";
import useTrailerVideos from "../hooks/useTrailerVideos";

const VideoBackground = ({ movieId }) => {
  useTrailerVideos(movieId);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  return (
    <div>
      <iframe
        className="md:w-screen md:aspect-video aspect-video w-full "
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?&autoplay=1&mute=1&loop=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
