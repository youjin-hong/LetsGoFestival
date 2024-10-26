import { RestaurantIcon } from "../../../components/ui/icon";

export default function RestaurantCard({ place }) {
  const handleCardClick = () => {
    window.open(`https://map.kakao.com/link/to/${place.id}`, "_blank");
  };
  return (
    <div
      className="flex flex-col  justify-around shadow-bottomShadow rounded-lg w-[150px] p-2 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex gap-2 justify-start items-center">
        <RestaurantIcon />
        <p className="text-[12px] font-bold">{place.place_name}</p>
      </div>
      <div className="flex flex-col">
        <span className=" text-[10px] text-subText">
          축제로부터 {place.distance}m
        </span>
        <span className="text-[10px] text-blue-500">길찾기</span>
      </div>
    </div>
  );
}
