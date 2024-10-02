import { create } from "zustand";

const useFestivalDetailPageStore = create((set) => ({
  overview: "",
  category: "",
  setOverview: (overview) => set({ overview }),
  setCategory: (category) => set({ category }),
}));

export default useFestivalDetailPageStore;
