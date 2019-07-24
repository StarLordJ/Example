import ApiClient from "../../Api/ApiClient";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { Store } from 'Store/Store';
import { DataBaseA } from "../../components/Types"

export enum Actions {
    GET_DATA_FROM_DATABASE = "GET_DATA_FROM_DATABASE",
    SEND_EDITED_DATA = "SEND_EDITED_DATA",
    SET_NEW_ITEM = "SET_NEW_ITEM",
    DELETE_ITEM = "DELETE_ITEM"
}

export type DataBaseActions =
    { type: Actions.GET_DATA_FROM_DATABASE, data: DataBaseA[], name: string }
    | { type: Actions.SEND_EDITED_DATA, table: string, row: Partial<DataBaseA> }
    | { type: Actions.SET_NEW_ITEM, table: string, row: Partial<DataBaseA> }
    | { type: Actions.DELETE_ITEM, table: string, id: number }

type MyThunkAction<Res> = ThunkAction<Res, Store.State, null, DataBaseActions>;
type MyThunkDispatch = ThunkDispatch<Store.State, null, DataBaseActions>;

export function getDataFromBase(name: string): MyThunkAction<Promise<void>> {
    return async (dispatch: MyThunkDispatch): Promise<void> => {
        try {
            const data = await ApiClient.getDataBaseData(name);
            dispatch({ type: Actions.GET_DATA_FROM_DATABASE, data, name });
        } catch (e) {
            console.log(e);
        }
    }
}

export function editDataInTable(table: string, row: Partial<DataBaseA>, isEditedItem: boolean): MyThunkAction<Promise<void>> {
    return async (dispatch: MyThunkDispatch): Promise<void> => {
        try {
            const result = await ApiClient.updateDataBaseA(table, row, isEditedItem);

            if (isEditedItem) {
                dispatch({ type: Actions.SEND_EDITED_DATA, table, row });
            } else {
                dispatch({ type: Actions.SET_NEW_ITEM, table, row: { ...row, id: result.data.max } });
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export function deleteItem(table: string, id: number): MyThunkAction<Promise<void>> {
    return async (dispatch: MyThunkDispatch): Promise<void> => {
        try {
            await ApiClient.deleteItem(table, id);
            dispatch({ type: Actions.DELETE_ITEM, table, id })
        } catch (e) {
            console.log(e);
        }
    }
}


