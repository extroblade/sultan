
import ItemsType from "../../types/items-type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SearchItemsParams } from "./itemsTypes";
import axios from "axios";

export const fetchItems = createAsyncThunk<ItemsType[], SearchItemsParams>(
  'items/fetchItemsStatus',
  async () => {
    const { data } = await axios.get<ItemsType[]>("../../test.json");

    return data;
  },
);
