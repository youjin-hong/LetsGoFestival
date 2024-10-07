import { Link, useLocation } from "react-router-dom";
import { HomeIcon, MoveTopIcon, SearchIcon, WishIcon } from "./ui/icon";

export default function Footer() {
  const location = useLocation();

  const isWishPage = location.pathname === "/wish";
  const isHomePage = location.pathname === "/";
  const isSearchPage = location.pathname === "/search";

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="fixed bottom-0 shadow-topShadow py-2 max-w-screen-sm z-[900] bg-white w-full dark:bg-bgDark">
      {isHomePage && <MoveTopIcon scrollTop={scrollTop} />}
      <nav className="flex justify-evenly">
        <Link
          to="/"
          className={`text-beforeHover hover:text-afterHover ${
            isHomePage ? "text-activeIcon" : ""
          }`}
        >
          <HomeIcon handleHomeIcon={() => {}} clickHome={isHomePage} />
          <p
            className={`text-center text-[10px] ${
              isHomePage ? "text-iconActive" : ""
            }`}
          >
            홈
          </p>
        </Link>
        <Link
          to="/search"
          className={`text-beforeHover hover:text-afterHover ${
            isSearchPage ? "text-activeIcon" : ""
          }`}
        >
          <SearchIcon handleSearchIcon={() => {}} clickSearch={isSearchPage} />
          <p
            className={`text-center text-[10px] ${
              isSearchPage ? "text-iconActive" : ""
            }`}
          >
            축제 검색
          </p>
        </Link>
        <Link
          to="/wish"
          className={`text-beforeHover hover:text-afterHover ${
            isWishPage ? "text-activeIcon" : ""
          }`}
        >
          <WishIcon handleWishIcon={() => {}} clickWish={isWishPage} />
          <p
            className={`text-center text-[10px] ${
              isWishPage ? "text-iconActive" : ""
            }`}
          >
            찜
          </p>
        </Link>
      </nav>
    </footer>
  );
}
