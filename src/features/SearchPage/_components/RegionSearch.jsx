import useFestivalRegionStore from "../../../store/festivalRegionStore";

export default function RegionSearch({ onSelect }) {
  const { regionList, setSelectedRegion, selectedRegion } =
    useFestivalRegionStore();

  const handleSelectRegion = (regionCode) => {
    setSelectedRegion(regionCode);

    if (onSelect) {
      onSelect(regionCode);
    }
  };

  return (
    <div className="w-full flex justify-center items-center relative rounded-lg p-4">
      <ul className="shadow-bottomShadow rounded-lg flex flex-col justify-center items-center gap-1 w-full bg-white dark:text-black">
        {regionList.map((region) => (
          <li
            key={region.code}
            className={`w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)] ${
              selectedRegion === region.code ? "bg-[rgba(255,131,67,0.5)]" : ""
            }`}
            onClick={() => handleSelectRegion(region.code)}
          >
            {region.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
