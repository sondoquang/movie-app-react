import { Link } from "react-router-dom";
import CircularProgressBar from "./CircularProgressBar";
import ImageComponent from "./ImageComponent";

const MovieCard = ({
  movieId,
  title,
  releaseDate,
  poster,
  point,
  mediaType,
}) => {
  return (
    <Link
      to={mediaType === "movie" ? `/movie/${movieId}` : `/tv/${movieId}`}
      className="rounded-lg border border-slate-800"
    >
      <div className="relative">
        {mediaType === "tv" && (
          <p className="absolute top-1 right-1 rounded bg-black p-1 text-sm font-bold text-white shadow-md">
            {" "}
            TV Show
          </p>
        )}
        <ImageComponent
          className="w-full rounded-lg"
          width={210}
          height={300}
          src={poster && `https://image.tmdb.org/t/p/original${poster}`}
        />

        <div className="relative -top-[1.5vw] px-4">
          <CircularProgressBar
            percent={Math.round(point * 10)}
            strokeColor={point > 7 ? "green" : point >= 5 ? "orange" : "red"}
          />
          <p className="mt-2 font-bold">{title}</p>
          <p className="text-slate-300">{releaseDate}</p>
        </div>
      </div>
    </Link>
  );
};
export default MovieCard;
