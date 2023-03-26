import ItemsType from "../../types/items-type";

interface Filters {
  key: keyof ItemsType,
  value: string
}

export interface ItemsSliceState {
  items: ItemsType[];
  limit: number;
  filters: Filters[];
  brands: string[];
  sellers: string[];
}
