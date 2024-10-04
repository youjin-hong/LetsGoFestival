import { create } from "zustand";

export const useFestivalWishStore = create((set) => ({
  wishList: {},
  toggleWish: (contentid) =>
    set((state) => ({
      wishList: {
        ...state.wishList,
        [contentid]: !state.wishList[contentid],
      },
    })),
}));
