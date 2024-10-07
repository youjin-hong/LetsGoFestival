import { create } from "zustand";

const useFestivalSearchStore = create((set) => ({
  dateRange: JSON.parse(localStorage.getItem("dateRange")) || [
    new Date(),
    new Date(),
  ],
  keyword: JSON.parse(localStorage.getItem("keyword")) || "",

  setDateRange: (dateRange) => {
    set({ dateRange });
    localStorage.setItem("dateRange", JSON.stringify(dateRange));
  },
  setKeyword: (keyword) => {
    set({ keyword });
    localStorage.setItem("keyword", JSON.stringify(keyword));
  },
}));

export default useFestivalSearchStore;
