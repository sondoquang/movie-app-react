import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgressBar from "../CircularProgressBar";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { groupBy } from "lodash";
import ImageComponent from "@component/ImageComponent";
import { useModelContext } from "@contexts/ModelProvider";

const Banner = ({
  title,
  backdropPath,
  posterPath,
  releaseDate,
  genres,
  point = 0,
  certification,
  crews,
  overview,
  trailerVideoKey,
}) => {
  const groupCrews = groupBy(crews, "job");

  const { openPopup } = useModelContext();

  return (
    <div className="shadow-md-slate-800-sm relative overflow-hidden">
      <ImageComponent
        width={740}
        height={370}
        className="absolute inset-0 aspect-video w-full brightness-[.2]"
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        alt=""
      />
      <div className="relative mx-auto flex max-w-screen-lg gap-6 px-6 py-10 text-white lg:gap-8">
        <div className="flex-1">
          <ImageComponent
            width={600}
            height={900}
            className=""
            src={`https://image.tmdb.org/t/p/original${posterPath}`}
          />
        </div>
        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold">{title}</p>
          <div className="flex items-center gap-4">
            <span className="border border-gray-400 p-1 text-gray-400">
              {certification}
            </span>
            <p>{releaseDate}</p>
            {genres?.map((genre) => (
              <p key={genre.id}>{genre.name}</p>
            ))}
          </div>
          <div className="item-center mt-4 flex gap-4">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                percent={Math.round(point * 10 || 0)}
                size={3.5}
                strokeWidth={0.3}
              />
              Rating
            </div>
            <button
              className="cursor-pointer"
              onClick={() => {
                openPopup(
                  <iframe
                    title="trailer"
                    src={`https://www.youtube.com/embed/${trailerVideoKey}`}
                    className="aspect-video w-[50vw]"
                  />,
                );
              }}
            >
              <FontAwesomeIcon icon={faPlay} className="mr-1" /> Trailer
            </button>
          </div>
          <div>
            <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
            <p>{overview}</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.keys(groupCrews).map((job) => (
              <div key={job}>
                <p className="font-bold">{job}</p>
                <p>{groupCrews[job].map((job) => job.name).join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
