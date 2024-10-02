import { create } from "zustand";

const useFestivalCardStore = create((set) => ({
  festivalCards: [],
  selectedAreaCode: null,
  setFestivalCards: (cards) => set({ festivalCards: cards }),
  setSelectedAreaCode: (areaCode) => set({ selectedAreaCode: areaCode }),
}));

export default useFestivalCardStore;
