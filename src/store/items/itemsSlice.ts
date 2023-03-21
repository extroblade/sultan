import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {fetchItems} from "./getItems";
import ItemsType from "../../types/items-type";
import data from "../../test.json"
import {ItemsSliceState, Status} from './itemsTypes';

const initialState: ItemsSliceState = {
  items: data,
  status: Status.LOADING,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ItemsType[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchItems.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
