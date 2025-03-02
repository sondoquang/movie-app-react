import ImageComponent from "@component/ImageComponent";

const ActorInfo = ({ name, character, profilePath, episodeCount }) => {
  return (
    <div className="rounded-lg border border-slate-300 shadow-sm">
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
      <div className="bg-black p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        {episodeCount && <p>{episodeCount} Episodes</p>}
      </div>
    </div>
  );
};
export default ActorInfo;
