import ItemsType from "../../types/items-type";

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}

export type SearchItemsParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export interface ItemsSliceState {
  items: ItemsType[];
  status: Status;
  limit: number
}
