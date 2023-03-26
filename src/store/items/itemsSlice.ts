import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ItemsSliceState} from './itemsTypes';
import {getItemsFromAdmin} from "../../utils/getItemsFromAdmin";
import ItemsType from "../../types/items-type";

const initialState: ItemsSliceState = {
  items: getItemsFromAdmin(),
  limit: 15,
  filters: [],
  brands: [...[...new Set([...getItemsFromAdmin()].map(i => i.brand))].sort((a,b) => a.localeCompare(b))],
  sellers: [...[...new Set([...getItemsFromAdmin()].map(i => i.seller))].sort((a,b) => a.localeCompare(b))],
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
      let minVal=0, maxVal=1000000;
      if (state.filters.length > 1) {
        let helpArray: ItemsType[] = [],
          brandsArray: ItemsType[] = [],
          sellersArray: ItemsType[] = [];

        [...getItemsFromAdmin()].map(i => {
          state.filters.map(f => {
            if(i[f.key] === f.value && f.key === "brand") {
              brandsArray.push(i)
            }
            if(i[f.key] === f.value && f.key === "seller") {
              sellersArray.push(i)
            }
            if(f.key === "price"){
              minVal = +f.value[0];
              maxVal = +f.value[1];
            }
          })
        })
        if(sellersArray.length && brandsArray.length){
          sellersArray.map(s => {
            brandsArray.map(b => {
              if(s.code === b.code){
                helpArray.push(b)
              }
            })
          })
        } else if (sellersArray.length){
          helpArray = [...sellersArray]
        } else if (brandsArray.length){
          helpArray = [...brandsArray]
        }
        state.items = [...helpArray].filter(i => i.price>=minVal && i.price<=maxVal)

      } else if (state.filters.length) {
        state.items = [...getItemsFromAdmin()].filter(i => i.price>=minVal && i.price<=maxVal)
      } else {
        state.items = [...getItemsFromAdmin()]
      }
    },
    setFilters(state, action){
      state.filters = [...action.payload]
    },
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
} = itemsSlice.actions;

export default itemsSlice.reducer;
