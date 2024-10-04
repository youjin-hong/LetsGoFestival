import { create } from "zustand";

export const useFooterWishStore = create((set) => ({
  isWished: false,
  toggleWish: () => set((state) => ({ isWished: !state.isWished })),
}));
