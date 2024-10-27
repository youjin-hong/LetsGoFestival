import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

import { getRegion } from "../network/FestivalApi";
import useThemeStore from "../store/darkModeStore";
import useFestivalRegionStore from "../store/festivalRegionStore";

import { CloseIcon, DarkModeIcon } from "./ui/icon";

import logo from "../assets/images/logo.svg";

export default function Header() {
  const location = useLocation();
  const scrollRef = useRef(null);

  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);
  const { regionList, setRegionList, selectedRegion, setSelectedRegion } =
    useFestivalRegionStore();

  const fetchRegions = async () => {
    try {
      const regions = await getRegion();
      setRegionList(regions);
    } catch (error) {
      console.error("지역 목록 불러오기 실패", error.message || error);
    }
  };

  useEffect(() => {
    fetchRegions();
  }, [location.pathname]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  // useRef로 헤더 슬라이드 구현

  // TODO: 터치 이벤트 추가하여 헤더 지역 리스트 슬라이드 구현
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

  // 지역을 클릭했을 때 areaCode로 API 요청
  const handleRegionClick = async (code) => {
    setSelectedRegion(code);
  };
  return (
    <>
      {location.pathname === "/search" ||
      location.pathname === "/search/:keyword" ? (
        <header className="w-full pt-8 pr-4 max-w-screen-sm bg-white dark:bg-bgDark flex justify-end">
          <CloseIcon />
        </header>
      ) : (
        <header className="shadow-lg flex flex-col pt-6 px-4 fixed top-0 max-w-screen-sm z-[999] bg-white dark:bg-bgDark text-black dark:text-white w-full left-1/2 transform -translate-x-1/2">
          <div className="flex justify-between mb-6">
            <Link to="/" className="cursor-pointer mx-2">
              <img
                src={logo}
                alt="축제7ㅏ자 로고"
                className="w-full object-cover"
              />
            </Link>
            <DarkModeIcon handleDarkMode={toggleDarkMode} />
          </div>
          {location.pathname === "/" && (
            <nav
              ref={scrollRef}
              className="flex overflow-hidden cursor-grab gap-9 font-bold pb-6 px-2"
              onMouseDown={handleRegionNav}
              style={{ scrollbarWidth: "none" }}
            >
              {regionList.map((region, index) => (
                <p
                  key={index}
                  className={`cursor-pointer flex-none w-26 text-center ${
                    selectedRegion === region.code ? "text-iconActive" : ""
                  }`}
                  onClick={() => handleRegionClick(region.code)}
                >
                  {region.name}
                </p>
              ))}
            </nav>
          )}
        </header>
      )}
    </>
  );
}
