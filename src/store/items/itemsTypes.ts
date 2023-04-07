
export interface ItemsType {
  url: string,
  name: string,
  type: "weight" | "volume" | string,
  size: number,
  code: string,
  seller: string,
  brand: string,
  desc: string,
  price: number,
}

export interface Filters {
  key: keyof ItemsType,
  value: string | []
}

export interface Categories {
  name: string,
  itemsCodes: string[]
}

export interface ItemsSliceState {
  items: ItemsType[];
  limit: number;
  currentPage: number;
  categories: Categories[]
  currentCat: string
  filters: Filters[];
  brands?: string[];
  sellers?: string[];
}
