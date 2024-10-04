import { create } from "zustand";

const allRegionOption = { name: "전체", code: "all", rnum: 0 };

const useFestivalRegionStore = create((set) => ({
  regionList: JSON.parse(localStorage.getItem("regionList")) || [],

  setRegionList: (regions) => {
    const updatedRegions = [allRegionOption, ...regions];
    set({ regionList: updatedRegions });
    localStorage.setItem("regionList", JSON.stringify(updatedRegions));
  },

  selectedRegion:
    JSON.parse(localStorage.getItem("selectedRegion")) || allRegionOption.code,

  setSelectedRegion: (areaCode) => {
    set({ selectedRegion: areaCode });
    localStorage.setItem("selectedRegion", JSON.stringify(areaCode));
  },
}));

export default useFestivalRegionStore;
