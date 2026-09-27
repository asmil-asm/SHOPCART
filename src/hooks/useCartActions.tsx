import toast from "react-hot-toast";

import type { TProducts } from "@typeCustome/TypeProducts";
import { AddtoFavorite, RemoveFavoriteItem } from "@store/actions/FavoriteAction";

import {
  useAppDispatch,
  useAppSelector,
} from "@store/Hooks";

import {
  AddtoCart,
  RemoveItem,
  UpdateQuntity,
} from "@store/actions/CartAction";

import Message from "@components/feedback/Toast/Message";

import { useNavigate } from "react-router-dom";

import { useCallback } from "react";

const useCartActions = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { user, token } =
    useAppSelector(
      (state) => state.login
    );

  const { items } =
    useAppSelector(
      (state) => state.cart
    );
    const {favorite}=useAppSelector((state)=>state.favorite)
  const handleAddToCart = 
  useCallback(
    (product: TProducts) => {
      if (!product) return;

      if (!user || !token) {
        toast.error(
          "Please log in to order products"
        );

        navigate("/login");

        return;
      }
      const exitProduct =
        items.find(
          (item) =>
            item.proudct?.id ===
            product.id
        );

      if (exitProduct) {
        toast.error(
          "Product is already in the cart"
        );

        return;
      }
      const productId =
        product.documentId ??
        product.id;

      if (productId === undefined) {
        return;
      }

      dispatch(
        AddtoCart({
          productId,
          quantity: 1,
        })
      );

      toast(
        <Message
          path="/cart"
          title="Product added to cart!"
          id={product.id}
        />,
        {
          duration: 4000,
        }
      );
    },
    [
      dispatch,
      user,
      token,
      items,
      navigate,
    ]
  );


// add to wishlist

  const handleAddToFavorite =
    useCallback(
    (product: TProducts) => {
      if (!product) return;

      if (!user || !token) {
        toast.error(
          "Please log in to order products"
        );

        navigate("/login");

        return;
      }
      const exitProduct =
        favorite.find(
          (item) =>
            item.proudct?.id ===
            product.id
        );

      if (exitProduct) {
        toast.error(
          "Product is already in the Wishlist"
        );

        return;
      }
      const productId =
        product.documentId ??
        product.id;

      if (productId === undefined) {
        return;
      }

      dispatch(
        AddtoFavorite({
          productId,
        })
      );

      toast(
        <Message
          path="/favorite"
          title="Product added to Wishlist!"
          id={product.id}
        />,
        {
          duration: 4000,
        }
      );
    },
    [
      dispatch,
      user,
      token,
      items,
      navigate,
    ]
  );

 
// remove form wishlist
  const handleRemoveFromFavorite =
    useCallback(
      (documentId: string) => {
        dispatch(
          RemoveFavoriteItem({ ItemId: documentId,})
        );

        toast.success(
          <p>
            Product removed from favorite!
          </p>,
          {
            duration: 4000,
          }
        );
      },
      [dispatch]
    );


// remove form cart

  const handleRemoveFromCart =
    useCallback(
      (documentId: string) => {
        dispatch(
          RemoveItem({
            ItemId: documentId,
          })
        );

        toast.success(
          <p>
            Product removed from cart!
          </p>,
          {
            duration: 4000,
          }
        );
      },
      [dispatch]
    );

// change quantity

  const handleUpdateQuantity =
    useCallback(
      (
        newQuantity: number,
        documentId: string
      ) => {
        if (newQuantity <= 0) {
          return;
        }

        dispatch(
          UpdateQuntity({
            ItemId: documentId,
            quantity: newQuantity,
          })
        );
      },
      [dispatch]
    );

  return {
    handleAddToCart,
    handleAddToFavorite,
    handleRemoveFromFavorite,
    handleRemoveFromCart,
    handleUpdateQuantity,
  };
};

export default useCartActions;