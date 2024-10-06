import { useEffect, useState } from "react";
import { getFestivalCards } from "../network/FestivalApi";
import useFestivalCardStore from "../store/festivalCardStore";
import useFestivalRegionStore from "../store/festivalRegionStore";
import Card from "./Card";
import { useFestivalWishStore } from "../store/festivalWishStore";

export default function CardList({ clickWishIcon = false }) {
  // TODO: 무한스크롤 구현
  const { festivalCards, setFestivalCards } = useFestivalCardStore();
  const [selectFestivalStatus, setSelectFestivalStatus] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);
  const { selectedRegion } = useFestivalRegionStore();
  const { wishList } = useFestivalWishStore();

  const fetchFestivalCards = async (areaCode) => {
    try {
      const cards =
        areaCode === "all"
          ? await getFestivalCards("")
          : await getFestivalCards(areaCode);

      setFestivalCards(cards);
      setFilteredCards(cards);
    } catch (e) {
      console.error("축제정보 데이터 불러오기 실패", e);
    }
  };

  const filterCards = () => {
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10).replace(/-/g, "");

    // festivalCards가 배열인지 확인
    if (!Array.isArray(festivalCards)) {
      setFilteredCards([]);
      return;
    }

    let filtered = festivalCards.filter((card) => {
      if (selectFestivalStatus === "진행중") {
        return (
          card.eventstartdate <= todayString && todayString <= card.eventenddate
        );
      }
      if (selectFestivalStatus === "예정") {
        return todayString < card.eventstartdate;
      }
      if (selectFestivalStatus === "종료") {
        return todayString > card.eventenddate;
      }
      return true; // 기본적으로 모든 카드를 반환
    });

    if (clickWishIcon) {
      filtered = filtered.filter((card) => wishList[card.contentid]);
    }

    setFilteredCards(filtered);
  };

  useEffect(() => {
    if (selectedRegion) {
      fetchFestivalCards(selectedRegion);
    }
  }, [selectedRegion]);

  useEffect(() => {
    filterCards();
  }, [festivalCards, selectFestivalStatus, wishList]);

  return (
    <>
      <ul className="flex justify-end gap-2 pt-36">
        <li
          onClick={() => setSelectFestivalStatus("진행중")}
          className={`cursor-pointer text-sm text-white rounded-md py-1 px-1.5 ${
            selectFestivalStatus === "진행중"
              ? "bg-iconActive"
              : "bg-[#fdaa7b] hover:bg-iconActive"
          } duration-200`}
        >
          진행중인 행사
        </li>
        <li
          onClick={() => setSelectFestivalStatus("예정")}
          className={`cursor-pointer text-sm text-white rounded-md py-1 px-1.5 ${
            selectFestivalStatus === "예정"
              ? "bg-[#007BFF]"
              : "bg-[#76b5f8] hover:bg-[#007BFF]"
          } duration-200`}
        >
          개최 예정인 행사
        </li>
        <li
          onClick={() => setSelectFestivalStatus("종료")}
          className={`cursor-pointer text-sm text-white rounded-md py-1 px-1.5 ${
            selectFestivalStatus === "종료"
              ? "bg-subText"
              : "bg-[#b6b6b6] hover:bg-subText"
          } duration-200`}
        >
          종료된 행사
        </li>
      </ul>
      <div className="flex flex-wrap justify-evenly pt-4 pb-20 w-full">
        {filteredCards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </>
  );
}
