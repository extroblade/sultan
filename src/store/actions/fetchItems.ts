import {Dispatch} from "redux";
import {ItemAction, ItemActionTypes} from "../types/item";
import data from "../../test.json"

export const fetchItems = () => {
  return (dispatch: Dispatch<ItemAction>) => {
    try {
      dispatch({type: ItemActionTypes.FETCH_ITEMS})
      dispatch({type: ItemActionTypes.FETCH_ITEMS_SUCCESS, payload: data})//fix
    } catch (e){
      dispatch({type: ItemActionTypes.FETCH_ITEMS_ERROR, payload: 'err'})
    }
  }
}
