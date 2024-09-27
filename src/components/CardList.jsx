import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import Card from "./Card";

export default function CardList() {
  // TODO: 무한스크롤 구현
  const [cardList, setCardList] = useState([]);

  const getFestivalInfo = async () => {
    try {
      const result = await axios.get(
        `https://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${
          import.meta.env.VITE_APP_FESTIVAL_API_KEY
        }&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&eventStartDate=20170901`
      );
      console.log("결과", result.data.response.body.items.item);
      setCardList(result.data.response.body.items.item);
    } catch (e) {
      console.error("축제정보 데이터 불러오기 실패", e);
    }
  };

  useEffect(() => {
    getFestivalInfo();
  }, []);

  return (
    <div className="flex flex-wrap justify-evenly mt-32 mb-20">
      {cardList.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
}
