import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex h-20 items-center justify-between bg-slate-950 px-8 text-white">
      <div className="flex items-center gap-4 lg:gap-6">
        <Link to="/">
          <img src="/netflix.png" alt="" className="w-16 sm:w-24" />
        </Link>

        <a href="#" className="lg:text-xl">
          Phim
        </a>
        <a href="#" className="lg:text-xl">
          Truyền Hình
        </a>
      </div>
      <div>
        <Link to={`/search`}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="cursor-pointer"
          />
        </Link>
      </div>
    </header>
  );
};
export default Header;
