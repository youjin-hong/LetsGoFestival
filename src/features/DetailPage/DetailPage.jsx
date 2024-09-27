// import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  CallIcon,
  FestivalState,
  GoBackIcon,
  LocationIcon,
  WishIcon,
} from "../../components/ui/icon";

export default function DetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const card = location.state?.card; // state에서 받은 card 데이터 우선 사용

  if (!card) {
    return <div>카드 정보를 불러오는 중입니다...</div>;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="border-solid border-2 border-red-950 mt-20 flex flex-col items-center">
      <div className="flex justify-between w-full p-4">
        <GoBackIcon handleGoBack={handleGoBack} />
        <p className="text-xl font-bold">{card.title}</p>
        <span></span>
      </div>
      <section className="flex flex-col justify-center">
        <h2 hidden>축제상세정보</h2>
        <div className=" w-[328px] relative pt-2 pb-5 cursor-pointer">
          <div className="flex justify-between absolute w-full p-3">
            <FestivalState />
            <WishIcon />
          </div>
          <img
            src={card.firstimage}
            alt="축제이미지"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <div>
            <CalendarIcon />
            <p>
              {card.eventstartdate} ~ {card.eventenddate}
            </p>
          </div>
          <div>
            <LocationIcon />
            <p>
              {card.addr1} {card.addr2}
            </p>
          </div>
          <div>
            <CallIcon />
            <p>{card.tel}</p>
          </div>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
            inventore reprehenderit, cupiditate unde quia eos perferendis est
            nam corporis laboriosam voluptates id minima nihil eligendi nobis.
            Provident mollitia at et.
          </p>
        </div>
      </section>
      <section>
        <h2>주변정보</h2>
      </section>
    </div>
  );
}
