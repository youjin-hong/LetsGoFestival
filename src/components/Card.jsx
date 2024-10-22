import { useNavigate } from "react-router-dom";
import { useFestivalWishStore } from "../store/festivalWishStore";
import { FestivalState, WishIcon } from "./ui/icon";
import festivalNullImg from "../assets/images/festivalNullImg.png";
import { useMemo } from "react";

export default function Card({ card }) {
  const navigate = useNavigate();
  const { wishList, toggleWish } = useFestivalWishStore();

  // 이미지 URL을 HTTPS로 변환하고 유효성을 확인하는 함수
  const extractImageUrl = useMemo(() => {
    if (!card.firstimage) return festivalNullImg;

    try {
      // URL 추출
      const urlMatch = card.firstimage.match(/https?:\/\/[^\s",]+/);
      if (!urlMatch) return festivalNullImg;

      let imageUrl = urlMatch[0];

      // HTTP를 HTTPS로 변환
      if (imageUrl.startsWith("http://")) {
        imageUrl = imageUrl.replace("http://", "https://");
      }

      // 이미지 URL이 유효한지 확인
      return imageUrl;
    } catch (error) {
      console.error("이미지 URL 처리 중 오류 발생:", error);
      return festivalNullImg;
    }
  }, [card.firstimage]);

  const handleCard = () => {
    navigate(`/detail/${card.contentid}`, {
      state: {
        card: {
          ...card,
          // 상세 페이지로 넘어갈 때도 HTTPS URL을 사용하도록 수정
          firstimage: extractImageUrl,
        },
      },
    });
  };

  const handleWishIcon = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    toggleWish(card.contentid);
  };

  return (
    <div className="w-[315px] relative pt-2 pb-5 cursor-pointer">
      <div className="flex justify-between absolute w-full p-3 z-10">
        <FestivalState card={card} />
        <WishIcon
          clickWish={wishList[card.contentid]}
          handleWishIcon={handleWishIcon}
        />
      </div>
      <div
        className="w-full h-56"
        onClick={handleCard}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleCard();
          }
        }}
      >
        <img
          src={extractImageUrl}
          alt={`${card.title} 축제 이미지`}
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
          onError={(e) => {
            e.target.src = festivalNullImg;
            e.target.onerror = null; // 무한 루프 방지
          }}
        />
      </div>
      <div
        className="mt-3"
        onClick={handleCard}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleCard();
          }
        }}
      >
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
