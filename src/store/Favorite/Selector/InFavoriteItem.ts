import type { RootState } from "@store/store";
export const InFavoriteItem= (productId: number | undefined) =>
  (state: RootState) => {
    if (productId === undefined) {
      return false;
    }

    return state.favorite.favorite.some(
      (item) => item?.proudct?.id === productId
    );
  };
 