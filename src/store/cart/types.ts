import ItemsType from "../../types/items-type";

interface CI {
  count: number
}

export type CartItem = ItemsType & CI

export interface CartSliceState {
  totalPrice: number
  cartItems: CartItem[]
}
