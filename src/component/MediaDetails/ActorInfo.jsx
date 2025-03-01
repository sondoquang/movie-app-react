const ActorInfo = ({ id, name, character, profilePath }) => {
  return (
    <div className="rounded-lg border border-slate-300 shadow-sm" key={id}>
      <img
        width={276}
        height={350}
        className="rounded-lg"
        src={
          profilePath
            ? `https://image.tmdb.org/t/p/original${profilePath}`
            : "/no-image.svg"
        }
        alt=""
      />
      <div className="bg-black p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        <p>18</p>
      </div>
    </div>
  );
};
export default ActorInfo;
