import React, { useState, useEffect } from "react";
import { fetcher } from "./api/fetcher";
import GifViewerGrid from "./components/GifViewerGrid";

const App = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [gifData, setGifData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = async () => {
      try {
        setActiveTab("search");
          const data = await fetcher.fetchSearch(searchTerm);
          setGifData(data.data);
      }
      catch(err) {
            console.log("Error while Fetching");
      }finally {
        setSearchTerm('');
      }
  }

  useEffect(() => {
    const fetchGifs = async () => {
      switch (activeTab) {
        case "trending":
          const trendingData = await fetcher.fetchTrending(5); // Fetch 5 trending gifs
          setGifData(trendingData ? trendingData.data : []);
          break;
        case "search":
          setGifData([]);
          break;
        case "random":
          const randomData = await fetcher.fetchRandom(); // Fetch a random gif
          setGifData(randomData ? [randomData.data] : []);
          break;
        default:
          setGifData([]);
      }
    };

    fetchGifs();
  }, [activeTab]);

  return (
    <main className="bg-gray-800">
    <div className="">
    <div className="p-8">
      <h1 className="text-center text-3xl font-bold text-white">
        Gif Search Engine
      </h1>

      <div className="flex items-center mt-12 border-b-[2px] border-blue-400 gap-4">
      <button onClick={() => setActiveTab("trending")} className={`text-xl ${activeTab === "trending" ? 'text-blue-400' : 'text-white'}`}>Trending</button>
        <button onClick={() => setActiveTab("search")} className={`text-xl ${activeTab === "search" ? 'text-blue-400' : 'text-white'}`}>Search</button>
        <button onClick={() => setActiveTab("random")} className={`text-xl ${activeTab === "random" ? 'text-blue-400' : 'text-white'}`}>Random</button>
      </div>

      <div className="mt-[1rem] flex gap-4">
      
      <input type = "text" placeholder="What needs to be Searched?" className="w-full h-12 p-4 rounded-lg" onChange={(e) => setSearchTerm(e.target.value)}
       onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      }}
      />
       <button onClick={handleSearch} className="text-white bg-blue-600 w-[300px] p-4 h-12 flex items-center justify-center rounded-lg">Search</button>
      </div>

      </div>
      <GifViewerGrid activeTab = {activeTab} searchTerm = {searchTerm} gifsData={gifData} />
    </div>
    </main>
  );
};

export default App;
