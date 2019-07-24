import { Actions, EditActions } from "../Actions/edit";
import { Store } from 'Store/Store';

export function edit(state: Store.edit = { toEdit: {}, edited: {} }, action: EditActions): Store.edit {
    switch (action.type) {
        case Actions.SET_ITEM_TO_EDIT: {
            const newState: Record<string, any> = {};
            newState[action.table] = action.row;

            return { ...state, toEdit: { ...state.toEdit, ...newState }, edited: { ...state.edited, ...newState } };
        }
        case Actions.RESET_ITEM_EDITING: {
            const newState: Record<string, any> = {};
            newState[action.table] = null;

            return { ...state, toEdit: { ...state.toEdit, ...newState }, edited: { ...state.edited, ...newState } };
        }
        case Actions.SET_VALUE: {
            const newState: Record<string, any> = {};
            const chunk: Record<string, any> = {};
            const id = state.toEdit[action.table] ? state.toEdit[action.table].id : undefined;

            chunk[action.field] = action.value;
            newState[action.table] = { ...state.edited[action.table], id, ...chunk };

            return { ...state, edited: { ...newState } }
        }
        default: {
            return state;
        }
    }
}
