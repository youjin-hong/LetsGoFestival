import { create } from "zustand";

const useFestivalRegionStore = create((set) => ({
  regionList: [],
  setRegionList: (regions) => set({ regionList: regions }),

  selectedRegion: "all",
  setSelectedRegion: (areaCode) => set({ selectedRegion: areaCode }),
}));

export default useFestivalRegionStore;
