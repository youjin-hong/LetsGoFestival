import { create } from "zustand";

const useFestivalSearchStore = create((set) => ({
  activeStep: JSON.parse(localStorage.getItem("activeStep")) || 0,
  dateRange: JSON.parse(localStorage.getItem("dateRange")) || [
    new Date(),
    new Date(),
  ],
  keyword: JSON.parse(localStorage.getItem("keyword")) || "",

  setActiveStep: (activeStep) => {
    set({ activeStep });
    localStorage.setItem("activeStep", JSON.stringify(activeStep));
  },
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
