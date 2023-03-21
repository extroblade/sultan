import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../store/reducers/main";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
