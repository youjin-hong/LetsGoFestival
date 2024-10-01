import { create } from "zustand";

const useThemeStore = create((set) => ({
  isDarkMode: localStorage.getItem("isDarkMode") === "true",
  toggleDarkMode: () => {
    set((state) => {
      const newDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", newDarkMode);
      return { isDarkMode: newDarkMode };
    });
  },
}));

export default useThemeStore;
