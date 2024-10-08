import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CafeIcon,
  CalendarIcon,
  CallIcon,
  FestivalState,
  GoBackIcon,
  LocationIcon,
  WishIcon,
} from "../../components/ui/icon";
import { getFestivalOverView } from "../../network/FestivalApi";
import KakaoMapApi from "../../network/KakaoMapApi";
import useFestivalDetailPageStore from "../../store/festivalDetailPageStore";
import { useFestivalWishStore } from "../../store/festivalWishStore";

export default function DetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const card = location.state?.card; // state에서 받은 card 데이터 우선 사용
  const setOverview = useFestivalDetailPageStore((state) => state.setOverview);
  const overview = useFestivalDetailPageStore((state) => state.overview);
  const { category, setCategory } = useFestivalDetailPageStore();
  const { wishList, toggleWish } = useFestivalWishStore();

  const fetchFestivalOverview = async () => {
    if (card) {
      try {
        const overviewData = await getFestivalOverView(card.contentid);
        if (overviewData && overviewData.length > 0) {
          setOverview(overviewData[0].overview);
        }
      } catch (e) {
        console.error("축제정보 overview 데이터 불러오기 실패", e);
      }
    }
  };

  const handleCafeBtn = () => {
    setCategory("cafe");
  };
  const handleRestaurantBtn = () => {
    setCategory("restaurant");
  };
  const handleWishIcon = () => {
    toggleWish(card.contentid);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchFestivalOverview();
    return () => setOverview("");
  }, [card, setOverview]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!card) {
    return <div>카드 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="pt-24 pb-8 flex flex-col items-center">
      <div className="flex justify-between w-full p-4">
        <GoBackIcon handleGoBack={handleGoBack} />
        <p className="text-xl font-bold cursor-default">{card.title}</p>
        <span></span>
      </div>
      <section className="flex flex-col items-center">
        <h2 hidden>축제상세정보</h2>
        <div className=" w-[350px] relative pt-2 pb-5 cursor-pointer">
          <div className="flex justify-between absolute w-full p-3">
            <FestivalState card={card} />
            <WishIcon
              clickWish={wishList[card.contentid]}
              handleWishIcon={handleWishIcon}
            />
          </div>
          <div className="w-full h-56">
            <img
              src={card.firstimage}
              alt="축제이미지"
              className="w-full h-full object-cover rounded-lg cursor-default"
            />
          </div>
        </div>
        <div className="w-[350px] flex flex-col gap-1.5 cursor-default">
          <div className="flex gap-4 text-[15px]">
            <CalendarIcon />
            <p>
              {card.eventstartdate} ~ {card.eventenddate}
            </p>
          </div>
          <div className="flex gap-4 text-[15px]">
            <LocationIcon />
            <p>
              {card.addr1} {card.addr2}
            </p>
          </div>
          <div className="flex gap-4 text-[15px]">
            <CallIcon />
            <p>{card.tel}</p>
          </div>
        </div>
        <div className="w-[350px] pt-4">
          <p className="text-sm cursor-default">{overview}</p>
        </div>
      </section>
      <section className="flex flex-col items-center w-[350px] pt-10">
        <div className="w-full mb-10">
          <h2 className="text-start font-bold pb-3 cursor-default">주변정보</h2>
          <div className="h-[253px] relative">
            <KakaoMapApi latitude={card.mapy} longitude={card.mapx} />
            <ul>
              <li
                id="FD6"
                onClick={handleRestaurantBtn}
                className={`z-[100] absolute top-2 right-3 text-[12px] shadow-bottomShadow w-14 h-6 rounded-lg dark:text-black hover:bg-[#F7DE00] transition duration-200 flex justify-center items-center cursor-pointer ${
                  category === "restaurant" ? "bg-[#F7DE00]" : "bg-white"
                }`}
              >
                음식점
              </li>
              <li
                id="CE7"
                onClick={handleCafeBtn}
                className={`z-[100] absolute top-11 right-3 text-[12px] bg-white shadow-bottomShadow w-14 h-6 rounded-lg dark:text-black hover:bg-[#F7DE00] transition duration-200 flex justify-center items-center cursor-pointer ${
                  category === "cafe" ? "bg-[#F7DE00]" : "bg-white"
                }`}
              >
                카페
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full mb-24">
          <h2 className="font-bold text-start pb-3.5 cursor-default">
            주변 ({category === "cafe" ? "카페" : "음식점"}) 검색 결과
          </h2>
          <div className="grid grid-cols-2 grid-rows-2 gap-2.5">
            <div className="flex flex-col shadow-bottomShadow rounded-lg w-[120px] p-2 gap-0.5 cursor-pointer">
              <div className="flex justify-evenly items-center">
                <CafeIcon />
                <p className="text-[12px] font-bold">카페이름</p>
              </div>
              <p className="text-center text-[10px] text-subText">
                축제로부터 ~km
              </p>
            </div>
            <div className="flex flex-col shadow-bottomShadow rounded-lg w-[120px] p-2 gap-0.5 cursor-pointer">
              <div className="flex justify-evenly items-center">
                <CafeIcon />
                <p className="text-[12px] font-bold">카페이름</p>
              </div>
              <p className="text-center text-[10px] text-subText">
                축제로부터 ~km
              </p>
            </div>
            <div className="flex flex-col shadow-bottomShadow rounded-lg w-[120px] p-2 gap-0.5 cursor-pointer">
              <div className="flex justify-evenly items-center">
                <CafeIcon />
                <p className="text-[12px] font-bold">카페이름</p>
              </div>
              <p className="text-center text-[10px] text-subText">
                축제로부터 ~km
              </p>
            </div>
            <div className="flex flex-col shadow-bottomShadow rounded-lg w-[120px] p-2 gap-0.5 cursor-pointer">
              <div className="flex justify-evenly items-center">
                <CafeIcon />
                <p className="text-[12px] font-bold">카페이름</p>
              </div>
              <p className="text-center text-[10px] text-subText">
                축제로부터 ~km
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
