import ItemsType from "../../types/items-type";

export enum Status {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success'
}

export interface ItemsSliceState {
  items: ItemsType[];
  status: Status;
  brands: string[];
  limit: number
}
