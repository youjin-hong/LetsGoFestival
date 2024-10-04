import { create } from "zustand";

const useFestivalCardStore = create((set) => ({
  festivalCards: localStorage.getItem("festivalCards") || [],
  selectedAreaCode: localStorage.getItem("selectAreaCode") || null,
  setFestivalCards: (cards) => {
    set({ festivalCards: cards });
    localStorage.setItem("festivalCards", JSON.stringify(cards));
  },
  setSelectedAreaCode: (areaCode) => {
    set({ selectedAreaCode: areaCode });
    localStorage.setItem("selectedAreaCode", JSON.stringify(areaCode));
  },
}));

export default useFestivalCardStore;
