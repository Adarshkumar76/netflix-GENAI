import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[35%] md:pt-[20%] px-20 absolute text-white bg-gradient-to-r from-black w-screen aspect-video  ">
      <h1 className="font-bold text-2xl md:text-4xl">{title}</h1>
      <p className="py-5 text-sm md:text-lg w-1/2 md:w-1/3">{overview}</p>
      <div>
        <button className="bg-white text-black px-10 py-3 font-bold text-lg rounded mr-4 hover:bg-gray-200 cursor-pointer">Play</button>
        <button className="bg-gray-500 text-black px-10 py-3 font-bold text-sm rounded cursor-pointer hover:bg-gray-600">More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
