import { create } from "zustand";

const useFestivalWishStore = create((set) => ({
  wishList: {},
  toggleWish: (contentid) =>
    set((state) => ({
      wishList: {
        ...state.wishList,
        [contentid]: !state.wishList[contentid],
      },
    })),
}));

export default useFestivalWishStore;
