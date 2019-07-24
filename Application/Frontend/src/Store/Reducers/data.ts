import { DataBaseActions, Actions } from "../Actions/database";
import { Store } from 'Store/Store';
import { DataBaseA } from "../../components/Types"

export function data(state: Store.data = {}, action: DataBaseActions): Store.data {
    switch (action.type) {
        case Actions.GET_DATA_FROM_DATABASE: {
            const newState: Store.data = {};

            newState[action.name] = action.data;

            return { ...state, ...newState };
        }
        case Actions.SEND_EDITED_DATA: {
            const editedRow = action.row;
            const newState: Store.data = {};

            newState[action.table] = state[action.table].map(el => el.id === editedRow.id ? { ...el, ...editedRow } : el);

            return { ...state, ...newState };
        }
        case Actions.SET_NEW_ITEM: {
            const emptyRow: DataBaseA = { field_1: null, field_2: null, field_3: null, field_4: null, field_5: null, field_6: null, field_7: null, field_8: null, field_9: null, field_10: null, id: null }
            const newRow = action.row;
            const newState: Store.data = {};

            newState[action.table] = [...state[action.table], { ...emptyRow, ...newRow }];

            return { ...state, ...newState };
        }
        case Actions.DELETE_ITEM: {
            const newState: Record<string, any> = {};

            newState[action.table] = state[action.table].filter(({ id }) => id !== action.id);

            return { ...state, ...newState };
        }
        default: {
            return state;
        }
    }
}
