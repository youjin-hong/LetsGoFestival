import { useLocation } from "react-router-dom";
import CardList from "../../../components/CardList";
import {
  CalendarIcon,
  CloseIcon,
  LocationIcon,
} from "../../../components/ui/icon";
import useFestivalRegionStore from "../../../store/festivalRegionStore";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function SearchResultPage() {
  const location = useLocation();
  const { dateRange, selectedRegion } = location.state || {};
  const { regionList } = useFestivalRegionStore();

  const selectedRegionData = regionList.find(
    (region) => region.code === selectedRegion
  );
  const selectedRegionName = selectedRegionData
    ? selectedRegionData.name
    : "지역 선택";

  const formattedDateRange = dateRange
    ? `${formatDate(dateRange[0])} ~ ${formatDate(dateRange[1])}`
    : "날짜 선택";

  return (
    <div className="flex flex-col gap-2 mt-24">
      <div className="flex justify-between gap-2 z-[900]">
        <div className="w-full rounded-md shadow-bottomShadow flex items-center px-3 py-3 gap-3 cursor-pointer">
          <CalendarIcon />
          <span className="text-sm text-beforeHover">{formattedDateRange}</span>
        </div>
        <div className="w-full rounded-md shadow-bottomShadow flex items-center px-3 py-3 gap-3 cursor-pointer z-[900]">
          <LocationIcon />
          <span className="text-sm text-beforeHover">{selectedRegionName}</span>
        </div>
      </div>
      <div className="shadow-bottomShadow rounded-md flex justify-between items-center px-3 py-3 cursor-pointer z-[900]">
        <p className="text-beforeHover">{selectedRegionName}</p>
        <CloseIcon />
      </div>
      <div className="translate-y-1">
        <CardList dateRange={dateRange} isSearchPage={true} />
      </div>
    </div>
  );
}
