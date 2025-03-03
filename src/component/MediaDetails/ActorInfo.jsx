import ImageComponent from "@component/ImageComponent";
import { Link } from "react-router-dom";

const ActorInfo = ({ id, name, character, profilePath, episodeCount }) => {
  return (
    <div className="rounded-lg border border-slate-300 shadow-sm">
      <Link to={`/people/${id}`}>
        <ImageComponent
          width={276}
          height={350}
          className="rounded-lg"
          src={
            profilePath
              ? `https://image.tmdb.org/t/p/original${profilePath}`
              : "/no-image.svg"
          }
        />
      </Link>
      <div className="bg-black p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        {episodeCount && <p>{episodeCount} Episodes</p>}
      </div>
    </div>
  );
};
export default ActorInfo;
