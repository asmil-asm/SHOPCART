
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosError from "@util/axiosError";
import api from "@services/API/apiUser";



export const FavoriteAction = createAsyncThunk(
  "Favorite/favoriteGETaction",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    try {
      const state: any = getState();

      const userId = state.login.user?.id;

      if (!userId) {
        return rejectWithValue(
          "User is not logged in"
        );
      }

    const res = await api.get(
  `/wishlists?filters[users_permissions_user][id][$eq]=${userId}&populate[wishlist_items][populate][proudct][populate]=image`
);

      return res.data.data[0] || null;
    } catch (error) {
      return rejectWithValue(
        axiosError(error)
      );
    }
  }
);



export const AddtoFavorite = createAsyncThunk(
  "addToFavorite/postItem",
  async (
    {
      productId,
    }: {
      productId: string | number;
    },
    thunkAPI
  ) => {
    const {
      rejectWithValue,
      getState,
      dispatch,
    } = thunkAPI;

    try {
      const state: any = getState();

      const userId = state.login.user?.id;

      if (!userId) {
        return rejectWithValue(
          "User is not logged in"
        );
      }

      // البحث عن Wishlist الخاصة بالمستخدم
      const wishlistResponse = await api.get(
        `/wishlists?filters[users_permissions_user][id][$eq]=${userId}`
      );

      let wishlist =
        wishlistResponse.data.data[0];

      // إنشاء Wishlist إذا لم تكن موجودة
      if (!wishlist) {
        const createWishlistResponse =
          await api.post("/wishlists", {
            data: {
              users_permissions_user: userId,
            },
          });

        wishlist =
          createWishlistResponse.data.data;
      }

      // إنشاء WishlistItem
      const res = await api.post(
        "/wishlist-items",
        {
          data: {
            wishlist: wishlist.id,
            proudct: productId,
          },
        }
      );

      dispatch(FavoriteAction());

      return res.data.data;
    } catch (error: any) {
      console.log(
        "WISHLIST ERROR:",
        JSON.stringify(
          error.response?.data,
          null,
          2
        )
      );

      return rejectWithValue(
        axiosError(error)
      );
    }
  }
);

export const RemoveFavoriteItem = createAsyncThunk(
  "Remove/DeleteItem",
  async (
    { ItemId }: { ItemId: string },
    thunkAPI
  ) => {
    const {
      rejectWithValue,
      dispatch,
    } = thunkAPI;

    try {
      const res = await api.delete(
        `/wishlist-items/${ItemId}`
      );

      dispatch(FavoriteAction());

      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        axiosError(error)
      );
    }
  }
);



