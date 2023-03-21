
import {rootReducer} from "./reducers/main";
import {configureStore} from "@reduxjs/toolkit";

import items from './items/itemsSlice'

export const store  = configureStore({
  reducer: {
    items,
  },
})

export type RootState = ReturnType<typeof rootReducer>



