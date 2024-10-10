import { create } from "zustand";

const useFestivalSearchStore = create((set) => ({
  activeStep: JSON.parse(localStorage.getItem("activeStep")) || 0,
  dateRange: JSON.parse(localStorage.getItem("dateRange"))?.map(
    (date) => new Date(date)
  ) || [new Date(), new Date()],
  inputKeyword: JSON.parse(localStorage.getItem("inputKeyword")) || "",
  keywordResult: JSON.parse(localStorage.getItem("keywordResult")) || [],

  setActiveStep: (activeStep) => {
    set({ activeStep });
    localStorage.setItem("activeStep", JSON.stringify(activeStep));
  },
  setDateRange: (dateRange) => {
    set({ dateRange });
    localStorage.setItem(
      "dateRange",
      JSON.stringify(dateRange.map((date) => date.toISOString()))
    );
  },
  setInputKeyword: (inputKeyword) => {
    set({ inputKeyword });
    localStorage.setItem("inputKeyword", JSON.stringify(inputKeyword));
  },
  setKeywordResult: (keywordResult) => {
    set({ keywordResult });
    localStorage.setItem("keywordResult", JSON.stringify(keywordResult));
  },
}));

export default useFestivalSearchStore;
