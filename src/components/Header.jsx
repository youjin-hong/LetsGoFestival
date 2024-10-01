import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { CloseIcon, DarkModeIcon } from "./ui/icon";
import festivalAxiosInstance from "../network/FestivalApi";

const allRegionOption = { name: "전체", code: "all", rnum: 0 };
export default function Header() {
  const location = useLocation();
  const [regionList, setRegionList] = useState([]);
  const scrollRef = useRef(null);

  const getRegion = async () => {
    try {
      const response = await festivalAxiosInstance.get(
        `areaCode1?serviceKey=${
          import.meta.env.VITE_APP_FESTIVAL_API_KEY
        }&numOfRows=30&MobileOS=ETC&MobileApp=AppTest&_type=json`
      );
      setRegionList([allRegionOption, ...response.response.body.items.item]);
    } catch (error) {
      console.error("지역 목록 불러오기 실패", error.message || error);
    }
  };

  useEffect(() => {
    getRegion();
  }, [location.pathname]);

  // useRef로 헤더 슬라이드 구현
  const handleRegionNav = (e) => {
    e.preventDefault();
    const startX = e.pageX - scrollRef.current.offsetLeft;
    const scrollLeft = scrollRef.current.scrollLeft;

    const handleMouseMove = (e) => {
      const currentX = e.pageX - scrollRef.current.offsetLeft;
      const slidingDistance = (currentX - startX) * 1; // 1은 속도 조절
      scrollRef.current.scrollLeft = scrollLeft - slidingDistance;
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleDarkMode = () => {};

  return (
    <>
      {location.pathname === "/search" ||
      location.pathname === "/search/:keyword" ? (
        <header className="w-full mt-8 pr-4 max-w-screen-sm bg-white flex justify-end">
          <CloseIcon />
        </header>
      ) : (
        <header className="shadow-lg flex flex-col pt-6 pl-4 fixed top-0 max-w-screen-sm z-[999] bg-white w-full left-1/2 transform -translate-x-1/2">
          <div className="flex justify-between mb-6">
            <Link to="/" className="cursor-pointer mx-2">
              <img
                src="/logo.svg"
                alt="축제7ㅏ자 로고"
                className="w-full object-cover"
              />
            </Link>
            <DarkModeIcon handleDarkMode={handleDarkMode} />
          </div>
          {location.pathname === "/" && (
            <nav
              ref={scrollRef}
              className="flex overflow-hidden cursor-grab gap-9 font-bold pb-6 px-2"
              onMouseDown={handleRegionNav}
              style={{ scrollbarWidth: "none" }}
            >
              {regionList.map((region) => (
                <Link
                  key={region.rnum}
                  to={`/region/${region.code}`}
                  className="cursor-pointer hover:text-iconActive flex-none w-26 text-center"
                >
                  {region.name}
                </Link>
              ))}
            </nav>
          )}
        </header>
      )}
    </>
  );
}
