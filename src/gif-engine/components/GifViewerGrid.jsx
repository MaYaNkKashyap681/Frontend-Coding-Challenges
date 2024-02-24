import React, { useState, useEffect } from "react";
import { FaDownload, FaPause } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import axios from "axios";
import FullScreenViewer from "./FullScreenViewer";

const downloadGif = async (url, filename) => {
  try {
    const response = await axios({
      url: url,
      method: "GET",
      responseType: "blob",
    });
    const urlObject = window.URL.createObjectURL(
      new Blob([response.data], { type: "image/gif" })
    );
    const link = document.createElement("a");
    link.href = urlObject;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading GIF:", error);
  }
};

const Gif = ({ gif }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [selectedUrl, setSelectedUrl] = useState("");

  const handlePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleFullScreen = (url) => {
    console.log(url)
    setSelectedUrl(url);
    setIsFullScreen(true);
  };


  const handleCloseFullScreen  = () => {
    setIsFullScreen(false);
  }

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullScreen]);

  return (
    <div>
      {isFullScreen && <FullScreenViewer gifUrl={selectedUrl} handleCloseFullScreen = {handleCloseFullScreen}/>}
      <div
        key={gif.id}
        className="cursor-pointer  h-full w-full relative group mt-[2rem]"
      >
        <div className="h-12 w-full absolute transparent group-hover:flex hidden justify-end gap-4 p-4 bg-white items-center bg-opacity-50  bg-blur-3xl filter">
          <div
            onClick={() => handleFullScreen(gif.images.fixed_height.url)}
            className="h-8 w-8 bg-white rounded-full flex items-center justify-center"
          >
            <FaEye width={20} />
          </div>
          <div
            onClick={handlePlay}
            className="h-8 w-8 bg-white rounded-full flex items-center justify-center"
          >
            {isPlaying ? <FaPause width={20} /> : <FaPlay width={20} />}
          </div>
          <div
            onClick={() =>
              downloadGif(gif.images.fixed_height.url, "Gif" + gif.id)
            }
            className="h-8 w-8 bg-white rounded-full flex items-center justify-center"
          >
            <FaDownload width={20} />
          </div>
        </div>
        <img
          src={
            isPlaying
              ? gif.images.fixed_height.url
              : gif.images.fixed_height_still.url
          }
          alt={gif.title}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

const GifViewerGrid = ({ activeTab, searchTerm, gifsData }) => {
  console.log(gifsData);

  if (!gifsData || gifsData.length === 0) {
    if (activeTab === "search" && searchTerm === "")
      return <div className="px-8 bg-white pt-[2rem]">No GIFs to show</div>;
    else {
      return <div className="px-8 bg-white pt-[2rem]">GIFs are loading</div>;
    }
  }

  // If activeTab is "random" and only one GIF is received, render it occupying the whole screen
  if (activeTab === "random" && gifsData.length === 1) {
    return (
      <div className="w-screen h-screen p-8 bg-white">
        <Gif gif={gifsData[0]} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 bg-white px-8">
      {gifsData.map((gif) => (
        <Gif gif={gif} key={gif.id} />
      ))}
    </div>
  );
};


export default GifViewerGrid;
