import { useAppSelector } from "@store/Hooks";

export const useQuantity = (
  productId: number | undefined
) => {
  return useAppSelector((state) =>
    state.cart.items.find(
      (item) => item.proudct?.id === productId
    )?.quantity
  );
};