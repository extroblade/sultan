import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ItemsSliceState, Status} from './itemsTypes';
import {getItemsFromAdmin} from "../../utils/getItemsFromAdmin";
import ItemsType from "../../types/items-type";

const initialState: ItemsSliceState = {
  items: getItemsFromAdmin(),
  status: Status.SUCCESS,
  brands: [...[...new Set([...getItemsFromAdmin()].map(i => i.brand))].sort((a,b) => a.localeCompare(b)), "all"],
  limit: 15,
};

const addItemToLS = (state: ItemsType[]) => {
  localStorage.setItem("items", JSON.stringify(state));
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {

    addToLocalStorage(state, action: PayloadAction<ItemsType>) {
      state.items.push({
        ...action.payload
      });
      addItemToLS(state.items);
    },

    sortPriceASC(state) {
      state.items= state.items.sort((a,b) => a.price - b.price)
    },
    sortPriceDESC(state) {
      state.items = state.items.sort((a,b) => b.price - a.price)
    },
    sortTitleASC(state) {
      state.items = state.items.sort((a,b) => a.name.localeCompare(b.name))
    },
    sortTitleDESC(state) {
      state.items = state.items.sort((a,b) =>  b.name.localeCompare(a.name))
    },
    sortBrands(state, action: PayloadAction<string>) {
      state.items = [...getItemsFromAdmin()].filter(i => (i.brand === action.payload) || ("all" === action.payload))
    }
  },
});
export const { sortPriceASC, sortPriceDESC, sortTitleASC, sortTitleDESC, sortBrands } = itemsSlice.actions;

export default itemsSlice.reducer;
