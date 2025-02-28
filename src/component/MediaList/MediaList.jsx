import { useEffect } from "react";
import MovieCard from "../MovieCard";
import { useState } from "react";

const MediaList = ({ title, tabs }) => {
  const [mediaList, setMediaList] = useState([]);
  const [activeTabId, setActiveTabId] = useState(`${tabs[0]?.id}`);

  useEffect(() => {
    const url = tabs.find((tab) => tab.id === activeTabId)?.url;
    if (url) {
      fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmY5N2JhY2IwNzU4ZjM1NjIxZmI5Zjg0YzQyZjJmZCIsIm5iZiI6MTczOTExNTU4OS4zNzEsInN1YiI6IjY3YThjYzQ1MDZiZDBjZWZhNmUwNmViZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rqNNL0KS8_p6E8bdwcHPwTyQBxR49_GfkuTpfzNXGOQ`,
        },
      }).then(async (res) => {
        const data = await res.json();
        const media = data.results.slice(0, 12);
        setMediaList(media);
      });
    }
  }, [activeTabId, tabs]);

  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      <div className="mb-6 flex items-center gap-4">
        <p className="text-bold text-[2vw]">{title}</p>
        <ul className="flex rounded border border-white">
          {tabs?.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer rounded px-8 py-1 ${tab.id === activeTabId ? "bg-white text-black" : ""}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
        {mediaList.map((media) => (
          <MovieCard
            movieId={media.id}
            title={media.title || media.name}
            releaseDate={media.release_date || media.first_air_date}
            poster={media.poster_path}
            point={media.vote_average}
            key={media.id}
            mediaType={media.media_type || activeTabId}
          />
        ))}
      </div>
    </div>
  );
};
export default MediaList;
