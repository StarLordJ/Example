import { combineReducers } from "redux";
import { data } from "./data";
import { edit } from "./edit";
import { Store } from 'Store/Store';

export const reducers = combineReducers<Store.State>({
    data: data,
    edit: edit
});
