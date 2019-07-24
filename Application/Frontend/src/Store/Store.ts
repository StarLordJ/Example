import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./Reducers/Reducer";
import { DataBaseA } from 'components/Types';

export const store = createStore(reducers, applyMiddleware(thunk));

export declare module Store {

    export type edit = { toEdit: { [tableName: string]: DataBaseA | null }, edited: { [tableName: string]: Partial<DataBaseA> | null } };
    export type data = {
        [tableName: string]: DataBaseA[],
    };

    export type State = {
        data: data;
        edit: edit;
    }
}
