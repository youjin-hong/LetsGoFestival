import { useNavigate } from "react-router-dom";
import CardList from "../../../components/CardList";
import {
  CalendarIcon,
  CloseIcon,
  LocationIcon,
} from "../../../components/ui/icon";
import useFestivalRegionStore from "../../../store/festivalRegionStore";
import useFestivalSearchStore from "../../../store/festivalSearchStore";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function SearchResultPage() {
  const navigate = useNavigate();

  const { dateRange, selectedRegion, keyword } = useFestivalSearchStore();
  const { setActiveStep, setDateRange, setKeyword } = useFestivalSearchStore();
  const { setSelectedRegion, regionList } = useFestivalRegionStore();

  const selectedRegionData = regionList.find(
    (region) => region.code === selectedRegion
  );
  const selectedRegionName = selectedRegionData
    ? selectedRegionData.name
    : "지역 선택";

  const formattedDateRange = dateRange
    ? `${formatDate(dateRange[0])} ~ ${formatDate(dateRange[1])}`
    : "날짜 선택";

  const backToCalender = () => {
    setActiveStep(0);
    navigate("/search");
  };

  const backToRegion = () => {
    setActiveStep(1);
    navigate("/search");
  };

  const backToKeyword = () => {
    setActiveStep(2);
    navigate("/search");
  };

  const resetSearch = () => {
    setActiveStep(0);
    setDateRange([new Date(), new Date()]);
    setKeyword("");
    setSelectedRegion("all");
    navigate("/search");
  };

  return (
    <div className="flex flex-col gap-2 mt-24">
      <div className="flex justify-between gap-2 z-[900]">
        <div
          onClick={backToCalender}
          className="w-full rounded-md shadow-bottomShadow flex items-center px-3 py-3 gap-3 cursor-pointer"
        >
          <CalendarIcon />
          <span className="text-sm text-beforeHover">{formattedDateRange}</span>
        </div>
        <div
          onClick={backToRegion}
          className="w-full rounded-md shadow-bottomShadow flex items-center px-3 py-3 gap-3 cursor-pointer z-[900]"
        >
          <LocationIcon />
          <span className="text-sm text-beforeHover">{selectedRegionName}</span>
        </div>
      </div>
      <div className="shadow-bottomShadow rounded-md flex justify-between items-center px-3 py-3 cursor-pointer z-[900]">
        <p onClick={backToKeyword} className="text-beforeHover flex-1">
          {keyword || "키워드 선택"}
        </p>
        <div onClick={resetSearch}>
          <CloseIcon />
        </div>
      </div>
      <div className="translate-y-1">
        <CardList dateRange={dateRange} isSearchPage={true} />
      </div>
    </div>
  );
}
