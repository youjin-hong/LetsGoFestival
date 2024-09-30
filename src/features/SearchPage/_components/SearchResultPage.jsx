import CardList from "../../../components/CardList";
import {
  CalendarIcon,
  CloseIcon,
  LocationIcon,
} from "../../../components/ui/icon";

export default function SearchResultPage() {
  return (
    <div className="flex flex-col gap-2 mt-24">
      <div className="flex justify-between gap-2 z-[900]">
        <div className=" w-full rounded-md shadow-bottomShadow flex items-center px-3 py-3 gap-3 cursor-pointer">
          <CalendarIcon />
          <span className="text-sm text-beforeHover">09.24 ~ 09.29</span>
        </div>
        <div className="w-full rounded-md shadow-bottomShadow flex items-center px-3 py-3 gap-3 cursor-pointer z-[900]">
          <LocationIcon />
          <span className="text-sm text-beforeHover">부산광역시</span>
        </div>
      </div>
      <div className="shadow-bottomShadow rounded-md flex justify-between items-center px-3 py-3 cursor-pointer z-[900]">
        <p className="text-beforeHover">고창 핑크뮬리 축제</p>
        <CloseIcon />
      </div>
      <div className="-translate-y-24">
        <CardList />
      </div>
    </div>
  );
}
