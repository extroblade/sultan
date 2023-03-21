import {ItemAction, ItemActionTypes, ItemState} from "../types/item";
import data from "../../test.json"

const initialState: ItemState = {
  items: data,
  loading: false,
  error: null
}

export const itemsReducer = (state = initialState, action: ItemAction): ItemState  => {
 switch(action.type) {
   case ItemActionTypes.FETCH_ITEMS:
     return {items: data, loading: true, error: null}
   case ItemActionTypes.FETCH_ITEMS_SUCCESS:
     return {items: action.payload, loading: false, error: null}
   case ItemActionTypes.FETCH_ITEMS_ERROR:
     return {items: [], loading: false, error: action.payload}
   default:
     return state
 }
}

