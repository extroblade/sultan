import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Categories, ItemsSliceState, ItemsType} from './itemsTypes';
import {getTypes, getItemsFromAdmin, filterPrice} from "../../utils/functions";

const initialState: ItemsSliceState = { //todo: разбить на 2 слайса
  items: getItemsFromAdmin(),
  limit: 15,
  filters: [],
  categories: getTypes(),
  currentPage: 1,
  currentCat: "",
  brands: [...[...new Set([...getItemsFromAdmin()].map(i => i.brand))].sort((a,b) => a.localeCompare(b))],
  sellers: [...[...new Set([...getItemsFromAdmin()].map(i => i.seller))].sort((a,b) => a.localeCompare(b))],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    updateItems(state){
      state.items = getItemsFromAdmin()
      state.brands = [...[...new Set([...getItemsFromAdmin()].map(i => i.brand))].sort((a,b) => a.localeCompare(b))]
      state.sellers = [...[...new Set([...getItemsFromAdmin()].map(i => i.seller))].sort((a,b) => a.localeCompare(b))]
    },
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
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTypes(state){
      state.categories = getTypes()
    },

    sort(state, action) {
      switch (action.payload){
        case("Цена (сначала недорогие)"): {
          state.items = state.items.sort((a,b) => a.price - b.price)
          break
        }
        case("Цена (сначала дорогие)"): {
          state.items = state.items.sort((a,b) => b.price - a.price)
          break
        }
        case("Название А-Я"): {
          state.items = state.items.sort((a,b) => a.name.localeCompare(b.name))
          break
        }
        case("Название Я-А"):{
          state.items = state.items.sort((a,b) =>  b.name.localeCompare(a.name))
          break
        }
        default: {
          state.items = state.items.sort((a,b) => a.price - b.price)
          break;
        }
      }
    },

    sortCat(state){
      if(state.currentCat.length){
        const findItem = state.categories.find((item: Categories) => {
          return item.name === state.currentCat
        })
        state.items = [...getItemsFromAdmin()].filter((i: ItemsType) => {
          return i.code === (findItem ? findItem.itemsCodes.find(item => item === i.code) : "")
        })
      } else {
        state.items = [...getItemsFromAdmin()]
      }
    },

    filterItems(state){
      let temp: ItemsType[] = []
      let res: ItemsType[] = []
      if (state.filters.length>1) {
        [...state.filters].splice(1, state.filters.length-1).forEach(f => {
          let g = [...getItemsFromAdmin()].filter((item: ItemsType) => item[f.key] === f.value);
          if (g) temp = [...temp, ...g]
        })
        temp = [...temp].sort((a,b) => a.price-b.price)

        let filtersLength = [...new Set([...[...state.filters].map(i => i.key)])].length-2

        for(let i=0; i<temp.length; i++){
          if ( temp[i+filtersLength] && temp[i].code === temp[i+filtersLength].code) {
            res = [...res, temp[i]]
          }
        }

        state.items = filterPrice(res, state.filters)
      } else if (state.filters.length === 1) {
        state.items = filterPrice(getItemsFromAdmin(), state.filters)
      } else {
        state.items = getItemsFromAdmin()
      }
    },

    setFilters(state, action){
      state.filters = action.payload
    },

    setCategories(state, action){
      state.currentCat = action.payload
    },
  },
});

export const {
  updateItems,
  filterItems,
  sortCat,
  sort,
  setFilters,
  setTypes,
  setCurrentPage,
  setCategories,
  addToLocalStorage,
  removeFromLocalStorage,
} = itemsSlice.actions;

export default itemsSlice.reducer;
