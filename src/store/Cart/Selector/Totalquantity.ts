import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";

const selectCartItems = (state: RootState) => state.cart.items;

export const TotalQuantity = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, item) => sum + (item.quantity ?? 0), 0)
);

export const TotalPrice = createSelector(
  [selectCartItems],
  (items) => {
    const total = items.reduce((sum, item) => {
      const price = Number(
        item.proudct?.price ??
        item.proudct?.product?.price ??
        0
      );

      const quantity = Number(item.quantity ?? 0);

      return sum + price * quantity;
    }, 0);

    return Math.round(total * 100) / 100;
  }
);