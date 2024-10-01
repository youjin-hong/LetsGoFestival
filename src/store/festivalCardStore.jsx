import { create } from "zustand";

const useFestivalCardStore = create((set) => ({
  festivalCards: [],
  setFestivalCards: (cards) => set({ festivalCards: cards }),
}));

export default useFestivalCardStore;
