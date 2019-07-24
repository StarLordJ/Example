import { setValue } from "../../Store/Actions/edit";
import { connect } from 'react-redux';
import { Input, Props } from "./Input";
import { Store } from 'Store/Store';
import { Dispatch } from 'redux';

type OwnProps = Pick<Props, "tableName" | "path" | "type">;
type MappedStateProps = Pick<Props, "value">;
type MappedDispatchProps = Pick<Props, "setValue">;


const mapStateToProps = (state: Store.State, ownProps: OwnProps): MappedStateProps => {
    let value = ((state.edit.edited as Record<string, any>)[ownProps.tableName] || {})[ownProps.path] || "";

    if (ownProps.type === "datetime-local") {
        value = value.split(".")[0] || "";
    }

    return {
        value
    }
}

const mapDispatchProps = (dispatch: Dispatch, ownProps: OwnProps): MappedDispatchProps => {
    return {
        setValue: (value) => dispatch(setValue(ownProps.tableName, ownProps.path, value)),
    }
}

export const InputContainer = connect(mapStateToProps, mapDispatchProps)(Input);
