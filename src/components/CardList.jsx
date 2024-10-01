import { useEffect } from "react";
import { getFestivalCards } from "../network/FestivalApi";
import useFestivalCardStore from "../store/festivalCardStore";

import Card from "./Card";

export default function CardList() {
  // TODO: 무한스크롤 구현
  const { festivalCards, setFestivalCards } = useFestivalCardStore();

  const fetchFestivalCards = async () => {
    try {
      const cards = await getFestivalCards();
      setFestivalCards(cards);
    } catch (e) {
      console.error("축제정보 데이터 불러오기 실패", e);
    }
  };

  useEffect(() => {
    fetchFestivalCards();
  }, []);

  return (
    <div className="flex flex-wrap gap-2 justify-evenly pt-36 pb-20 w-full">
      {festivalCards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
}
