import { create } from "zustand";

const useFestivalCardStore = create((set) => ({
  festivalCards: JSON.parse(localStorage.getItem("festivalCards")) || [],
  setFestivalCards: (cards) => {
    set({ festivalCards: cards });
    localStorage.setItem("festivalCards", JSON.stringify(cards));
  },
}));

export default useFestivalCardStore;
