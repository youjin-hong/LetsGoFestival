import { create } from "zustand";

const useFestivalRegionStore = create((set) => ({
  regionList: JSON.parse(localStorage.getItem("regionList")) || [],
  setRegionList: (regions) => {
    set({ regionList: regions });
    localStorage.setItem("regionList", JSON.stringify(regions));
  },

  selectedRegion: JSON.parse(localStorage.getItem("selectedRegion")) || "all",
  setSelectedRegion: (areaCode) => {
    set({ selectedRegion: areaCode });
    localStorage.setItem("selectedRegion", JSON.stringify(areaCode));
  },
}));

export default useFestivalRegionStore;
