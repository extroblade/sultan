import {combineReducers} from "redux";
import {itemsReducer} from "./itemsReducer";


export const rootReducer = combineReducers({
  items: itemsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
