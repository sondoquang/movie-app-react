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
    url: `/movie/${id}?append_to_response=release_dates,credits`,
  });

  const { isLoading: isRelatedMovieListLoading, data: relatedMoviesResponse } =
    useFetch({
      url: `/movie/${id}/recommendations`,
    });

  const relatedMovies = relatedMoviesResponse.results || [];

  if (isLoading || isRelatedMovieListLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Banner mediaInfo={movieInfo} />
      <div className="bg-black text-white">
        <div className="mx-auto flex max-w-screen-lg gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-[2] text-[1.2vw]">
            <ActorList actors={movieInfo.credits?.cast || []} />
            <RelatedMediaList
              relatedList={relatedMovies}
              isLoading={isRelatedMovieListLoading}
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
