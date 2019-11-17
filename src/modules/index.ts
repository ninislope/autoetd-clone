import { combineReducers, Reducer } from "redux";
import main from "./main";
import { RootStore } from "../models";

const reducer: Reducer<RootStore> = combineReducers({
    main,
});

export default reducer;
