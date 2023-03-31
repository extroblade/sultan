
import json from "../test.json"

export const getItemsFromAdmin = () => {
  const data = localStorage.getItem('items');

  return data ? (JSON.parse(data).length ? JSON.parse(data) : json) : json
  //return data ? (JSON.parse(data).length ? JSON.parse(data) : localStorage.setItem("items", JSON.stringify(json))) : localStorage.setItem("items", JSON.stringify(json))

};
