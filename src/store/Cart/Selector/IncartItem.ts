import type { RootState } from "@store/store";

export const IncartItem =
  (productId: number | undefined) =>
  (state: RootState) => {
    if (productId === undefined) {
      return false;
    }

    return state.cart.items.some(
      (item) => item?.proudct?.id === productId
    );
  };