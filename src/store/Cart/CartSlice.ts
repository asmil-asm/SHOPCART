import { createSlice } from "@reduxjs/toolkit";

import type { TCart } from "@typeCustome/TypsCart";

import { isString } from "@typeCustome/guard";

import { CartAction } from "@store/actions/CartAction";

const initialState: TCart = {
  items: [],
  loading: "idle",
  error: null,
};

const CartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    cleanItems: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      CartAction.pending,
      (state) => {
        state.loading = "pending";
        state.error = null;
      }
    );

    builder.addCase(
      CartAction.fulfilled,
      (state, action) => {
        state.loading = "succeed";

        state.items =
          action.payload?.cart_items || [];
      }
    );

    builder.addCase(
      CartAction.rejected,
      (state, action) => {
        state.loading = "failed";

        if (isString(action.payload)) {
          state.error = action.payload;
        }
      }
    );
  },
});

export const { cleanItems } =
  CartSlice.actions;

export default CartSlice.reducer;