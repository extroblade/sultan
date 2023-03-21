import ItemsType from "../../types/items-type";

export interface ItemState {
  items: ItemsType[] | [],
  loading: boolean,
  error: null | string
}

export enum ItemActionTypes {
  FETCH_ITEMS = 'FETCH_ITEMS',
  FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS',
  FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR',
}

export interface FetchItemsAction {
  type: ItemActionTypes.FETCH_ITEMS
}

export interface FetchItemsSuccessAction {
  type: ItemActionTypes.FETCH_ITEMS_SUCCESS;
  payload: ItemsType[]
}

export interface FetchItemsErrorAction {
  type: ItemActionTypes.FETCH_ITEMS_ERROR;
  payload: string
}

export type ItemAction = FetchItemsAction | FetchItemsSuccessAction | FetchItemsErrorAction

