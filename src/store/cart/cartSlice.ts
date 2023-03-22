import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLs';
import { CartItem, CartSliceState } from './types';


const initialState: CartSliceState = getCartFromLS();

const saveCartToLS = (state: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(state));
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.cartItems.find((obj) => obj.code === action.payload.code);

      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({
          ...action.payload
        });
      }

      state.totalPrice = calcTotalPrice(state.cartItems);
      saveCartToLS(state.cartItems);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.cartItems.find((obj) => obj.code === action.payload);

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = calcTotalPrice(state.cartItems);
      saveCartToLS(state.cartItems);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter((obj) => obj.code !== action.payload);
      state.totalPrice = calcTotalPrice(state.cartItems);
      saveCartToLS(state.cartItems);
    },
    clearItems(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      saveCartToLS(state.cartItems);
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
