import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FestivalState, WishIcon } from "./ui/icon";

export default function Card({ card }) {
  const navigate = useNavigate();
  const [clickWish, setClickWish] = useState(false);

  const handleWishIcon = () => {
    // e.stopPropagation();
    setClickWish(!clickWish);
  };

  const handleCard = () => {
    navigate(`/detail/${card.contentid}`, {
      state: { card },
    });
  };

  return (
    <div className=" w-[315px] relative pt-2 pb-5 cursor-pointer">
      <div className="flex justify-between absolute w-full p-3">
        <FestivalState />
        <WishIcon handleWishIcon={handleWishIcon} clickWish={clickWish} />
      </div>
      <div className="w-[315px] h-52" onClick={() => handleCard()}>
        <img
          src={card.firstimage}
          alt="축제이미지"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="mt-3" onClick={() => handleCard()}>
        <p className="text-base font-bold mt-0.5">{card.title}</p>
        <div className="mt-1">
          <p className="text-xs text-beforeHover -mb-0.3">
            {card.eventstartdate}~{card.eventenddate}
          </p>
          <p className="text-xs text-beforeHover">{card.addr1}</p>
        </div>
      </div>
    </div>
  );
}
