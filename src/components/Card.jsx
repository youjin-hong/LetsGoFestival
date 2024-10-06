import { useNavigate } from "react-router-dom";
import { useFestivalWishStore } from "../store/festivalWishStore";
import { FestivalState, WishIcon } from "./ui/icon";
import festivalNullImg from "../assets/images/festivalNullImg.png";

export default function Card({ card }) {
  const navigate = useNavigate();
  const { wishList, toggleWish } = useFestivalWishStore();

  // firstimage에서 .png, .jpg, .jpeg까지의 문자열만 추출하는 함수
  const extractImageUrl = (url) => {
    const match = url.match(/https?:\/\/[^\s",]+/);
    return match ? match[0] : festivalNullImg;
  };

  const handleCard = () => {
    navigate(`/detail/${card.contentid}`, {
      state: { card },
    });
  };

  const handleWishIcon = () => {
    toggleWish(card.contentid);
  };

  return (
    <div className="w-[315px] relative pt-2 pb-5 cursor-pointer">
      <div className="flex justify-between absolute w-full p-3">
        <FestivalState card={card} />
        <WishIcon
          clickWish={wishList[card.contentid]}
          handleWishIcon={handleWishIcon}
        />
      </div>
      <div className="w-[315px] h-52" onClick={() => handleCard()}>
        <img
          src={extractImageUrl(card.firstimage)}
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
