import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ItemsType from "../../types/items-type";
import data from "../../test.json"
import {ItemsSliceState, Status} from './itemsTypes';

const initialState: ItemsSliceState = {
  items: data,
  status: Status.LOADING,
  limit: 15
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ItemsType[]>) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
