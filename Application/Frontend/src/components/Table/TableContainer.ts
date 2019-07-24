import { CustomTable, Props } from "./Table";
import { getDataFromBase } from "../../Store/Actions/database";
import { selectToEdit } from "../../Store/Actions/edit";
import { connect } from 'react-redux';
import { Store } from 'Store/Store';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from 'Store/Actions/Actions';
import { DataBaseA } from 'components/Types';


const mapStateToProps = (state: Store.State, ownProps: Props) => {
    return {
        rows: state.data[ownProps.tableName] || [],
    }
}

const mapDispatchProps = (dispatch: ThunkDispatch<Store.State, null, Actions>, ownProps) => {
    return {
        getDataFromBase: () => dispatch(getDataFromBase(ownProps.tableName)),
        selectToEdit: (id: DataBaseA) => dispatch(selectToEdit(ownProps.tableName, id)),
    }
}

export const TableContainer = connect(mapStateToProps, mapDispatchProps)(CustomTable);
