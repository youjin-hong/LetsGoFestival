import { create } from "zustand";

const useFestivalRegionStore = create((set) => ({
  regionList: [],
  setRegionList: (regions) => set({ regionList: regions }),
}));

export default useFestivalRegionStore;
