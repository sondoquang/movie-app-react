import ImageComponent from "@component/ImageComponent";
import { useModelContext } from "@contexts/ModelProvider";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Movie = (props) => {
  const {
    data: { id, backdrop_path, title, release_date, overview },
    trailerVideoKey,
  } = props;

  const { openPopup } = useModelContext();

  return (
    <div>
      <ImageComponent
        width={900}
        height={500}
        src={
          backdrop_path && `https://image.tmdb.org/t/p/original${backdrop_path}`
        }
        className="aspect-video w-full brightness-50"
      />
      <div className="absolute bottom-[10%] left-8 w-1/2 text-white sm:w-1/3">
        <p className="mb-2 font-bold sm:text-[2vw]">{title}</p>
        <div>
          <p className="mb-1 inline-block border border-gray-400 p-4 text-gray-400">
            PG13
          </p>
          <p className="text-[1.2vw]">{release_date}</p>
        </div>
        <div>
          <div className="mt-4 hidden text-[1.2vw] sm:block">
            <p className="mb-2 font-bold">Overview</p>
            <p>{overview}</p>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() => {
              openPopup(
                <iframe
                  title="trailer"
                  src={`https://www.youtube.com/embed/${trailerVideoKey}`}
                  className="aspect-video w-[50vw]"
                />,
              );
            }}
            className="cursor-pointer rounded bg-white px-4 py-2 text-[10px] text-black lg:text-lg"
          >
            <FontAwesomeIcon icon={faPlay} />
            Trailer
          </button>
          <Link to={`/movie/${id}`}>
            <button className="ms-2 cursor-pointer rounded bg-slate-300/35 px-4 py-2 text-[10px] lg:text-lg">
              View Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Movie;
