import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosError from "@util/axiosError";
import api from "@services/API/apiUser";



export const CartAction = createAsyncThunk(
  "cart/cartGETaction",
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
        `/carts?filters[users_permissions_user][id][$eq]=${userId}&populate[cart_items][populate][proudct][populate]=image`
      );

      return res.data.data[0] || null;
    } catch (error) {
      return rejectWithValue(
        axiosError(error)
      );
    }
  }
);



export const AddtoCart = createAsyncThunk(
  "addTocart/postItem",
  async (
    {
      productId,
      quantity,
    }: {
      productId: string | number;
      quantity: number;
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

      /* 1. Get user's cart */
      const cartResponse = await api.get(
        `/carts?filters[users_permissions_user][id][$eq]=${userId}`
      );

      let cart =
        cartResponse.data.data[0];

      /* 2. Create cart if not exists */
      if (!cart) {
        const createCartResponse =
          await api.post("/carts", {
            data: {
              users_permissions_user:
                userId,
            },
          });

        cart =
          createCartResponse.data.data;
      }

      /* 3. Create CartItem */
      const res = await api.post(
        "/cart-items",
        {
          data: {
            cart: cart.id,
            proudct: productId,
            quantity,
          },
        }
      );

      /* 4. Refresh cart */
      dispatch(CartAction());

      return res.data.data;
    } catch (error: any) {
      console.log(
        "CART ERROR:",
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

/* =========================
   REMOVE CART ITEM
========================= */

export const RemoveItem = createAsyncThunk(
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
        `/cart-items/${ItemId}`
      );

      dispatch(CartAction());

      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        axiosError(error)
      );
    }
  }
);


/* =========================
   REMOVE ALL CART ITEMS
========================= */

export const clearItems = createAsyncThunk(
  "cart/clearItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, dispatch, getState } = thunkAPI;

    try {
      const state: any = getState();
      const userId = state.login.user?.id;

      if (!userId) {
        return rejectWithValue("User is not logged in");
      }

      const cartRes = await api.get(
        `/carts?filters[users_permissions_user][id][$eq]=${userId}`
      );

      const cart = cartRes.data?.data?.[0];
      console.log("CART:", cart);

      if (!cart) {
        console.log("No cart found — nothing to clear");
        return null;
      }

      const itemsRes = await api.get(
        `/cart-items?filters[cart][id][$eq]=${cart.id}`
      );

      const cartItems = itemsRes.data?.data ?? [];
      console.log("CART ITEMS TO DELETE:", cartItems);

      if (cartItems.length === 0) {
        console.log("Cart is already empty");
        dispatch(CartAction());
        return [];
      }

      const results = await Promise.allSettled(
        cartItems.map((item: any) =>
          api.delete(`/cart-items/${item.documentId}`)
        )
      );

      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(
            `Failed to delete item ${cartItems[i].documentId}:`,
            r.reason?.response?.status,
            r.reason?.response?.data
          );
        }
      });

      // 5) حدّث السلة
      dispatch(CartAction());

      return cartItems;
    } catch (error) {
      console.error("clearItems error:", error);
      return rejectWithValue(axiosError(error));
    }
  }
);


/* =========================
   UPDATE QUANTITY
========================= */

export const UpdateQuntity =
  createAsyncThunk(
    "Update/UpdateQuntity",
    async (
      {
        ItemId,
        quantity,
      }: {
        ItemId: string;
        quantity: number;
      },
      thunkAPI
    ) => {
      const {
        rejectWithValue,
        dispatch,
      } = thunkAPI;

      try {
        const res = await api.put(
          `/cart-items/${ItemId}`,
          {
            data: {
              quantity,
            },
          }
        );

        dispatch(CartAction());

        return res.data.data;
      } catch (error) {
        return rejectWithValue(
          axiosError(error)
        );
      }
    }
  );