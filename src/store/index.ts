
import {configureStore} from "@reduxjs/toolkit";
import items from './items/itemsSlice'
import filter from './filters/filterSlice'
import cart from './cart/cartSlice'
import {useDispatch} from "react-redux";

export const store  = configureStore({
  reducer: {
    items,
    filter,
    cart,
  },
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();



