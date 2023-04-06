
import { CartItem } from "../store/cart/types";
import json from "./test.json"
import cats from "./cats.json"
import {iFilters} from "../components/SideFilters/SideFilters";
import {ItemsType} from "../store/items/itemsTypes";

export const calcTotalAmount = (arr: any[]): number => arr.reduce((a) => a+1, 0)

export const calcCartAmount = (arr: CartItem[]): number => arr.reduce((a, b: CartItem) => a + b.count,0)

export const calcMaxPrice = (arr: ItemsType[]): number => {
  return [...arr].sort((a,b) => b.price-a.price)[0].price
}

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');

  const cartItems = data ? JSON.parse(data) : []

  const totalPrice = calcTotalPrice(cartItems);

  return {
    cartItems: cartItems as CartItem[],
    totalPrice,
  };
};

export const getItemsFromAdmin = () => {
  const data = localStorage.getItem('items');
  return data ? (JSON.parse(data).length ? JSON.parse(data) : json) : json
};

export const getTypes = () => {
  const data = localStorage.getItem('types');

  if (!data) localStorage.setItem("types", JSON.stringify(cats))

  return data ? (JSON.parse(data).length ? JSON.parse(data) : cats) : cats
};

export const calcTotalPrice = (arr: CartItem[]) => {
  return arr.reduce((sum, obj) => {
    const findItem = [...getItemsFromAdmin()].find((item: ItemsType) => {
      return item.code === obj.code
    })
    return findItem ? sum + findItem.price * obj.count : sum
  }, 0);
};

export const resetInputs = () => {
  const inputs = document.getElementsByTagName('input');

  for (let index = 0; index < inputs.length; ++index) {
    if(inputs[index].type === "text"){
      inputs[index].value = ''
    } else if (inputs[index].type === "checkbox" && inputs[index].checked){
      inputs[index].checked = !inputs[index].checked
    }
  }
}

export const filterPrice = (arr: ItemsType[], filters: iFilters[]) => {
  return arr.filter((item: ItemsType) => item.price >= +filters[0].value[0] && item.price <= +filters[0].value[1])
}
