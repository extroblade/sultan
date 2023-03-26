import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ItemsSliceState} from './itemsTypes';
import {getItemsFromAdmin} from "../../utils/getItemsFromAdmin";
import ItemsType from "../../types/items-type";

const initialState: ItemsSliceState = {
  items: getItemsFromAdmin(),
  limit: 15,
  filters: [],
  brands: [...[...new Set([...getItemsFromAdmin()].map(i => i.brand))].sort((a,b) => a.localeCompare(b)), "all"],
  sellers: [...[...new Set([...getItemsFromAdmin()].map(i => i.seller))].sort((a,b) => a.localeCompare(b)), "all"],
};


const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addToLocalStorage(state, action: PayloadAction<ItemsType>) {
      const data = localStorage.getItem('items');
      state.items = [...(data ? JSON.parse(data) : []), action.payload]
      localStorage.setItem("items", JSON.stringify(state.items));
      state.items = getItemsFromAdmin()
    },
    removeFromLocalStorage(state, action: PayloadAction<string>) {
      state.items = [...getItemsFromAdmin()].filter((obj) => obj.code !== action.payload);
      localStorage.setItem("items", JSON.stringify(state.items));
      state.items = getItemsFromAdmin()
    },

    sortPriceASC(state) {
      state.items = state.items.sort((a,b) => a.price - b.price)
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
    sort(state){
      state.items = state.items.filter(i => {
        return state.filters.map(f => {
          // @ts-ignore
          return i[Object.keys(state.filters).find(item => item===f)] === f
        })
      })
      console.log(state.items)
    },
    setFilters(state, action){
      // @ts-ignore
      state.filters.push(action)
    },

    sortBrands(state, action: PayloadAction<any>) {
      if(action.payload.length){
        state.items = state.items.filter(i => {
          const find = action.payload.find((item:any) => (item === i.brand) || ("all" === item))
          return (find === i.brand) || (find === "all") || (!action.payload.length)
        })
      }
    },
    sortSellers(state, action: PayloadAction<any>) {
      if(action.payload.length){
        state.items = state.items.filter(i => {
          const find = action.payload.find((item:any) => (item === i.seller) || ("all" === item))
          return (find === i.seller) || (find === "all") || (!action.payload.length)
        })
      }
    },
    sortPrice(state, action: PayloadAction<any>){
      if(action.payload.length){
        state.items = [...getItemsFromAdmin()].filter(i => {
          return (i.price >= action.payload[0]) && (i.price <= action.payload[1])
        })
      }
    }
  },
});
export const {
  sort,
  setFilters,
  addToLocalStorage,
  removeFromLocalStorage,
  sortPriceASC,
  sortPriceDESC,
  sortTitleASC,
  sortTitleDESC,
  sortBrands,
  sortPrice,
  sortSellers
} = itemsSlice.actions;

export default itemsSlice.reducer;
