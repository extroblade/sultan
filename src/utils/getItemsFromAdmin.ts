
import json from "../test.json"

export const getItemsFromAdmin = () => {
  const data = localStorage.getItem('items');

  return data ? JSON.parse(data) : json;
};
