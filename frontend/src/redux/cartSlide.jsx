import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  cartItem: [],
};

export const cartSlide = createSlice({
  name: "product",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const existingItem = state.cartItem.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        toast.success("Đã thêm vào giỏ hàng");
        existingItem.qty += 1;
        existingItem.total = existingItem.price * existingItem.qty;
        return;
      }

      toast.success("Đã thêm vào giỏ hàng");
      const total = action.payload.price;
      state.cartItem.push({ ...action.payload, qty: 1, total });
    },
    deleteCartItem: (state, action) => {
      toast.success("Đã xóa khỏi giỏ hàng");
      const index = state.cartItem.findIndex((el) => el.id === action.payload);
      state.cartItem.splice(index, 1);
    },
    increaseQuantity: (state, action) => {
      const index = state.cartItem.findIndex((el) => el.id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;

      const price = state.cartItem[index].price;
      const total = price * qtyInc;

      state.cartItem[index].total = total;
    },
    decreaseQuantity: (state, action) => {
      const index = state.cartItem.findIndex((el) => el.id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartItem[index].qty = qtyDec;

        const price = state.cartItem[index].price;
        const total = price * qtyDec;

        state.cartItem[index].total = total;
      }
    },
    clearCart: (state) => {
      state.cartItem = [];
    },
  },
});

export const {
  addCartItem,
  deleteCartItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlide.actions;

export default cartSlide.reducer;
