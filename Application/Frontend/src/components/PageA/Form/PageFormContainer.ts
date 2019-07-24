import { PageForm, Props } from "./PageForm";
import { connect } from 'react-redux';
import { Store } from 'Store/Store';
import { resetValues } from "../../../Store/Actions/edit";
import { editDataInTable, deleteItem } from "../../../Store/Actions/database";
import { DataBaseA } from 'components/Types';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from 'Store/Actions/Actions';

type OwnProps = Pick<Props, "tableName">
type MappedStateProps = Pick<Props, "selectedItem" | "isEdited" | "editedItem">;

function getDiff(original: DataBaseA | null, edited: Partial<DataBaseA> | null): Partial<DataBaseA> | null {
    const diff: Partial<DataBaseA> = {};

    if (original) {
        Object.keys(original).forEach(key => {
            if (original[key] !== edited[key]) {
                diff[key] = edited[key]
            }
        })
        diff.id = original.id;

        return diff;
    }
    return edited
}

const mapStateToProps = (state: Store.State, ownProps: OwnProps): MappedStateProps => {
    const editedItem = state.edit.edited[ownProps.tableName];
    const selectedItem = state.edit.toEdit[ownProps.tableName];
    const diff = getDiff(selectedItem, editedItem);

    let isEdited = undefined;

    if (selectedItem) {
        isEdited = Boolean(diff && Object.keys(diff).length > 1)
    } else if (editedItem) {
        isEdited = null;
    }

    return {
        isEdited,
        editedItem: diff,
        selectedItem
    }
}

const mapDispatchProps = (dispatch: Dispatch | ThunkDispatch<Store.State, null, Actions>, ownProps: OwnProps) => {
    return {
        resetValues: () => dispatch(resetValues(ownProps.tableName)),
        sendData: (row: Partial<DataBaseA>, isEditedItem: boolean) => dispatch(editDataInTable(ownProps.tableName, row, isEditedItem)),
        deleteItemFromDB: (id: number) => dispatch(deleteItem(ownProps.tableName, id))
    }
}

export const PageFormContainer = connect(mapStateToProps, mapDispatchProps)(PageForm);
