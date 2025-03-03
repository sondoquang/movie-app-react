import { useParams } from "react-router-dom";
import Loading from "@component/Loading";
import Banner from "@component/MediaDetails/Banner";
import ActorList from "@component/MediaDetails/ActorList";
import RelatedMediaList from "@component/MediaDetails/RelatedMediaList";
import MovieInformation from "@component/MediaDetails/MovieInformation";
import useFetch from "@hooks/useFetch";

const MovieDetail = () => {
  const { id } = useParams();

  const { isLoading, data: movieInfo } = useFetch({
    url: `/movie/${id}?append_to_response=release_dates,credits,videos`,
  });

  const { isLoading: isRelatedMovieListLoading, data: relatedMoviesResponse } =
    useFetch({
      url: `/movie/${id}/recommendations`,
    });

  console.log(relatedMoviesResponse.results);

  const relatedMovies = relatedMoviesResponse.results || [];

  if (isLoading || isRelatedMovieListLoading) {
    return <Loading />;
  }

  const certification = (
    (movieInfo.release_dates?.results || []).find(
      (result) => result.iso_3166_1 === "US",
    )?.release_dates || []
  ).find((releaseDate) => releaseDate.certification)?.certification;

  const crews = (movieInfo.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));

  return (
    <div>
      <Banner
        title={movieInfo.title}
        backdropPath={movieInfo.backdrop_path}
        posterPath={movieInfo.poster_path}
        releaseDate={movieInfo.release_date}
        genres={movieInfo.genres}
        point={movieInfo.vote_average}
        certification={certification}
        crews={crews}
        overview={movieInfo.overview}
        trailerVideoKey={
          (movieInfo.videos?.results || []).find(
            (movie) => movie.type === "Trailer" && movie.site === "YouTube",
          )?.key
        }
      />
      <div className="bg-black text-white">
        <div className="container">
          <div className="flex-[2] text-[1.2vw]">
            <ActorList actors={movieInfo.credits?.cast || []} />
            <RelatedMediaList
              relatedList={relatedMovies}
              isLoading={isRelatedMovieListLoading}
              title={"More like this"}
            />
          </div>
          <div className="mb-4 flex-1">
            <MovieInformation mediaInfo={movieInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;
