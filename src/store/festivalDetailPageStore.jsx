import { create } from "zustand";

const useFestivalDetailPageStore = create((set) => ({
  overview: "",
  setOverview: (overview) => set({ overview }),
}));

export default useFestivalDetailPageStore;
