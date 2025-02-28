import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState } from "react";

const FeatureMovie = () => {
  const [movies, setMovie] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState();
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmY5N2JhY2IwNzU4ZjM1NjIxZmI5Zjg0YzQyZjJmZCIsIm5iZiI6MTczOTExNTU4OS4zNzEsInN1YiI6IjY3YThjYzQ1MDZiZDBjZWZhNmUwNmViZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rqNNL0KS8_p6E8bdwcHPwTyQBxR49_GfkuTpfzNXGOQ`,
      },
    }).then(async (res) => {
      const data = await res.json();
      const popularMovies = data.results.slice(0, 4);
      setMovie(popularMovies);
      setActiveMovieId(popularMovies[0].id);
    });
  }, []);

  return (
    <div className="relative">
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie data={movie} key={movie.id} />
        ))}
      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};
export default FeatureMovie;
