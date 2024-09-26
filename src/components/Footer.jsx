import { Link } from "react-router-dom";
import HomeIcon from "./ui/icon/HomeIcon";
import SearchIcon from "./ui/icon/SearchIcon";
import WishIcon from "./ui/icon/WishIcon";

export default function Footer() {
  return (
    <footer className="border-solid border-2 border-cyan-900 py-2">
      <nav className="flex justify-evenly">
        <Link to="/" className="text-beforeHover hover:text-afterHover">
          <HomeIcon />
          <p className="text-center text-10px">홈</p>
        </Link>
        <Link to="/search" className="text-beforeHover hover:text-afterHover">
          <SearchIcon />
          <p className="text-center text-10px">축제 검색</p>
        </Link>
        <Link to="/wish" className="text-beforeHover hover:text-afterHover">
          <WishIcon />
          <p className="text-center text-10px">찜</p>
        </Link>
      </nav>
    </footer>
  );
}
