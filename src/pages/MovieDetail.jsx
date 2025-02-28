import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "@component/Loading";
import Banner from "@component/MediaDetails/Banner";
import ActorList from "@component/MediaDetails/ActorList";
import RelatedMediaList from "@component/MediaDetails/RelatedMediaList";
import MovieInformation from "../component/MediaDetails/MovieInformation";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isRelatedMovieListLoading, setIsRelatedMovieListLoading] =
    useState(false);

  useEffect(() => {
    setIsRelatedMovieListLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmY5N2JhY2IwNzU4ZjM1NjIxZmI5Zjg0YzQyZjJmZCIsIm5iZiI6MTczOTExNTU4OS4zNzEsInN1YiI6IjY3YThjYzQ1MDZiZDBjZWZhNmUwNmViZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rqNNL0KS8_p6E8bdwcHPwTyQBxR49_GfkuTpfzNXGOQ`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        const currentRelatedMovies = (data.results || []).slice(0, 12);
        setRelatedMovies(currentRelatedMovies);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsRelatedMovieListLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmY5N2JhY2IwNzU4ZjM1NjIxZmI5Zjg0YzQyZjJmZCIsIm5iZiI6MTczOTExNTU4OS4zNzEsInN1YiI6IjY3YThjYzQ1MDZiZDBjZWZhNmUwNmViZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rqNNL0KS8_p6E8bdwcHPwTyQBxR49_GfkuTpfzNXGOQ`,
        },
      },
    )
      .then(async (res) => {
        const data = await res.json();
        setMovieInfo(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

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
            <RelatedMediaList relatedList={relatedMovies} />
          </div>
          <div className="mb-4 flex-1">
            <MovieInformation movieInfo={movieInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;
