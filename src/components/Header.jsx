import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import DarkModeIcon from "./ui/icon/DarkModeIcon";

export default function Header() {
  const [regionList, setRegionList] = useState([]);
  const scrollRef = useRef(null);

  const getRegion = async () => {
    try {
      const result = await axios.get(
        `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${
          import.meta.env.VITE_APP_FESTIVAL_API_KEY
        }&numOfRows=30&MobileOS=ETC&MobileApp=AppTest&_type=json`
      );
      setRegionList(result.data.response.body.items.item);
    } catch (e) {
      console.error("지역 목록 불러오기 실패", e);
    }
  };

  useEffect(() => {
    getRegion();
  }, []);

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

  return (
    <header className="border-solid border-2 border-indigo-600 flex flex-col py-6 px-4">
      <div className="flex justify-between mb-6">
        <Link to="/" className="cursor-pointer">
          <img
            src="/logo.svg"
            alt="축제7ㅏ자 로고"
            className="w-full object-cover"
          />
        </Link>
        <DarkModeIcon />
      </div>
      <nav
        ref={scrollRef}
        className="flex overflow-hidden cursor-grab gap-6 font-bold"
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
    </header>
  );
}
