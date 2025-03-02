import Loading from "@component/Loading";
import MovieCard from "../MovieCard";

const RelatedMediaList = ({ relatedList = [], isRelatedMovieListLoading }) => {
  return (
    <div className="mt-6">
      <p className="mb-4 text-[1.4vw] font-bold">More like this</p>
      {isRelatedMovieListLoading ? (
        <Loading />
      ) : (
        <div className="ld:gap-6 grid grid-cols-3 gap-6 sm:grid-cols-4">
          {relatedList.map((media) => (
            <MovieCard
              key={media.id}
              movieId={media.id}
              title={media.name || media.original_title}
              releaseDate={media.first_air_date || media.release_date}
              poster={media.poster_path}
              point={media.vote_average}
              mediaType={media.media_type}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default RelatedMediaList;
