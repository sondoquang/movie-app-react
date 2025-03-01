import MovieCard from "../MovieCard";
import { useState } from "react";
import useFetch from "@hooks/useFetch";

const MediaList = ({ title, tabs }) => {
  const [activeTabId, setActiveTabId] = useState(`${tabs[0]?.id}`);

  const url = tabs.find((tab) => tab.id === activeTabId)?.url;

  const { data: mediaListResponse } = useFetch({
    url,
  });

  const mediaList = (mediaListResponse.results || []).slice(0, 12);

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
