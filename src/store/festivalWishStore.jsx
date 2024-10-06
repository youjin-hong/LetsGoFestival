import { create } from "zustand";

export const useFestivalWishStore = create((set) => ({
  wishList: JSON.parse(localStorage.getItem("wishList")) || {},
  toggleWish: (contentid) => {
    set((state) => {
      const updateWishList = { ...state.wishList };
      if (updateWishList[contentid]) {
        delete updateWishList[contentid];
      } else {
        updateWishList[contentid] = true;
      }
      localStorage.setItem("wishList", JSON.stringify(updateWishList));
      return { wishList: updateWishList };
    });
  },
}));
