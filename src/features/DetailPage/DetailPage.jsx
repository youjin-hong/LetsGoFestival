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
import useFestivalDetailPageStore from "../../store/festivalDetailPageStore";

export default function DetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const card = location.state?.card; // state에서 받은 card 데이터 우선 사용
  const setOverview = useFestivalDetailPageStore((state) => state.setOverview);
  const overview = useFestivalDetailPageStore((state) => state.overview);

  const fetchFestivalOverview = async () => {
    if (card) {
      try {
        const overviewData = await getFestivalOverView(card.contentid);
        if (overviewData && overviewData.length > 0) {
          setOverview(overviewData[0].overview);
        }
      } catch (e) {
        console.error("축제정보 overview 데이터 불러오기 실패", e);
        // 여기서 에러 상태를 관리할 수 있는 방법을 추가
      }
    }
  };

  useEffect(() => {
    fetchFestivalOverview();
    return () => setOverview(""); // 상세 페이지 나갈 때 상태 초기화
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
        <div className=" w-[328px] relative pt-2 pb-5 cursor-pointer">
          <div className="flex justify-between absolute w-full p-3">
            <FestivalState />
            <WishIcon />
          </div>
          <img
            src={card.firstimage}
            alt="축제이미지"
            className="w-full h-full object-cover rounded-lg cursor-default"
          />
        </div>
        <div className="w-[328px] flex flex-col gap-1.5 cursor-default">
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
        <div className="w-[328px] pt-3">
          <p className="text-sm cursor-default">{overview}</p>
        </div>
      </section>
      <section className="flex flex-col items-center w-[328px] pt-10">
        <div className="w-full mb-10">
          <h2 className="text-start font-bold pb-3 cursor-default">주변정보</h2>
          <div className="border-solid border-2 border-red-900 bg-yellow-50 h-24 relative">
            <div className="border-solid border-2 border-red-700">지도</div>
            <button className="absolute top-2 right-3 text-[12px] bg-white shadow-bottomShadow w-14 h-6 rounded-lg dark:text-black">
              음식점
            </button>
            <button className="absolute top-11 right-3 text-[12px] bg-white shadow-bottomShadow w-14 h-6 rounded-lg dark:text-black">
              카페
            </button>
          </div>
        </div>
        <div className="w-full mb-24">
          <h2 className="font-bold text-start pb-3 cursor-default">
            주변 (카페) 검색 결과
          </h2>
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <CafeIcon />
            <CafeIcon />
            <CafeIcon />
            <CafeIcon />
          </div>
        </div>
      </section>
    </div>
  );
}
