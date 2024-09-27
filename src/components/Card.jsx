import { useState } from "react";
import FestivalState from "./ui/icon/FestivalState";
import WishIcon from "./ui/icon/WishIcon";

export default function Card({ card }) {
  const [clickWish, setClickWish] = useState(false);

  const handleWishIcon = () => {
    setClickWish(!clickWish);
  };

  return (
    <div className=" w-[320px] relative pt-2 pb-5 cursor-pointer hover:scale-105 transition-transform duration-300">
      <div className="flex justify-between absolute w-full p-3">
        <FestivalState />
        <WishIcon handleWishIcon={handleWishIcon} clickWish={clickWish} />
      </div>
      <div className="w-[315px] h-52">
        <img
          src={card.firstimage}
          alt="축제이미지"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="mt-3">
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
