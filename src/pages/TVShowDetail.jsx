import { useParams } from "react-router-dom";
import Loading from "@component/Loading";
import Banner from "@component/MediaDetails/Banner";
import ActorList from "@component/MediaDetails/ActorList";
import RelatedMediaList from "@component/MediaDetails/RelatedMediaList";
import useFetch from "@hooks/useFetch";
import TVShowInformation from "@component/MediaDetails/TVShowInformation";
import SeasonList from "@component/MediaDetails/SeasonList";

const TVShowDetail = () => {
  const { id } = useParams();

  const { isLoading, data: tvInfo } = useFetch({
    url: `/tv/${id}?append_to_response=content_ratings,aggregate_credits,videos`,
  });

  const {
    isLoading: isRelatedTVShowsListLoading,
    data: relatedTVShowsResponse,
  } = useFetch({
    url: `/tv/${id}/recommendations`,
  });

  const relatedTVShows = relatedTVShowsResponse.results || [];

  if (isLoading || isRelatedTVShowsListLoading) {
    return <Loading />;
  }

  const certification = (tvInfo.content_ratings?.results || []).find(
    (result) => result.iso_3166_1 === "US",
  )?.rating;

  const crews = (tvInfo.aggregate_credits?.crew || [])
    .filter((crew) => {
      const jobs = (crew.jobs || []).map((j) => j.job);
      return ["Director", "Writer"].some((job) => jobs.find((j) => j === job));
    })
    .slice(0, 10)
    .map((crew) => ({ id: crew.id, job: crew.jobs[0].job, name: crew.name }));

  return (
    <div>
      <Banner
        title={tvInfo.name}
        backdropPath={tvInfo.backdrop_path}
        posterPath={tvInfo.poster_path}
        releaseDate={tvInfo.first_air_date}
        genres={tvInfo.genres}
        point={tvInfo.vote_average}
        certification={certification}
        overview={tvInfo.overview}
        crews={crews}
        trailerVideoKey={
          (tvInfo.videos?.results || []).find(
            (video) => video.type === "Trailer",
          )?.key
        }
      />

      <div className="bg-black text-white">
        <div className="mx-auto flex max-w-screen-lg gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-[2] text-[1.2vw]">
            <ActorList
              actors={(tvInfo.aggregate_credits?.cast || []).map((cast) => ({
                ...cast,
                character: cast.roles[0]?.character,
                episodeCount: cast.roles[0]?.episode_count,
              }))}
            />
            <SeasonList seasons={(tvInfo.seasons || []).reverse()} />
            <RelatedMediaList
              relatedList={relatedTVShows}
              isLoading={isRelatedTVShowsListLoading}
            />
          </div>
          <div className="mb-4 flex-1">
            <TVShowInformation tvInfo={tvInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TVShowDetail;
