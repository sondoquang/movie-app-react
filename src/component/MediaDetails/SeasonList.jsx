import CircularProgressBar from "@component/CircularProgressBar";
import ImageComponent from "@component/ImageComponent";
import { useState } from "react";

const SeasonList = ({ seasons = [] }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  const currentSeasons = isShowMore
    ? seasons.slice(0, 32)
    : seasons.slice(0, 4);

  return (
    <div className="mt-8 text-[1.3vw]">
      <p className="mb-4 text-[1.4vw] font-bold">Seasons</p>
      <div className="space-y-2">
        {currentSeasons.map((season) => (
          <div
            key={season.id}
            className="flex gap-4 rounded-lg border border-slate-200 p-3 shadow-md"
          >
            <ImageComponent
              className="w-1/4 rounded-lg"
              src={
                season.poster_path ||
                `https://image.tmdb.org/t/p/w300${season.poster_path}`
              }
              width={130}
              height={195}
            />
            <div className="space-y-1">
              <p className="text-[1.4vw] font-bold">Season {season.name}</p>
              <div className="flex items-center gap-2">
                <p className="font-bold">Rating:</p>
                <CircularProgressBar
                  percent={Math.round(season.vote_average * 10)}
                  size={2.5}
                  strokeWidth={0.2}
                />
              </div>
              <p>
                <span className="font-bold">Release date:</span>
                {season.air_date}
              </p>
              <p>{season.episode_count} Episodes</p>
              <p>{season.overview}</p>
            </div>
          </div>
        ))}
      </div>
      <p
        className="mt-3 cursor-pointer"
        onClick={() => {
          setIsShowMore(!isShowMore);
        }}
      >
        {isShowMore ? "Show less" : "Show more"}
      </p>
    </div>
  );
};
export default SeasonList;
