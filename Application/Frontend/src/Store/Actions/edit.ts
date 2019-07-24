import { DataBaseA } from 'components/Types';

export enum Actions {
    SET_ITEM_TO_EDIT = "SET_ITEM_TO_EDIT",
    RESET_ITEM_EDITING = "RESET_ITEM_EDITING",
    SET_VALUE = "SET_VALUE"
}

export type EditActions =
    { type: Actions.SET_ITEM_TO_EDIT, table: string, row: DataBaseA }
    | { type: Actions.RESET_ITEM_EDITING, table: string }
    | { type: Actions.SET_VALUE, table: string, field: string, value: string | Date }


export function selectToEdit(table: string, row: DataBaseA): EditActions {
    return {
        type: Actions.SET_ITEM_TO_EDIT,
        table,
        row
    }
}

export function resetValues(table: string): EditActions {
    return {
        type: Actions.RESET_ITEM_EDITING,
        table
    }
}

export function setValue(table: string, field: string, value: string | Date) {
    return {
        type: Actions.SET_VALUE,
        table,
        field,
        value
    }
}
