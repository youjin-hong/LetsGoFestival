import { CafeIcon } from "../../../components/ui/icon";

export default function CafeCard() {
  return (
    <div className="flex flex-col shadow-bottomShadow rounded-lg w-[120px] p-2 gap-0.5 cursor-pointer">
      <div className="flex justify-evenly items-center">
        <CafeIcon />
        <p className="text-[12px] font-bold">카페이름</p>
      </div>
      <p className="text-center text-[10px] text-subText">축제로부터 ~km</p>
    </div>
  );
}
