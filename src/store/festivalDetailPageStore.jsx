import { create } from "zustand";

const useFestivalDetailPageStore = create((set) => ({
  overview: JSON.parse(localStorage.getItem("overview")) || "",
  category: JSON.parse(localStorage.getItem("category")) || "",
  setOverview: (overview) => {
    set({ overview });
    localStorage.setItem("overview", JSON.stringify(overview));
  },
  setCategory: (category) => {
    set({ category });
    localStorage.setItem("category", JSON.stringify(category));
  },
}));

export default useFestivalDetailPageStore;
