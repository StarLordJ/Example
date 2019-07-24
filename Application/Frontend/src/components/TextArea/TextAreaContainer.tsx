import { connect } from 'react-redux';
import { setValue } from '../../Store/Actions/edit';
import { Dispatch } from 'redux';
import { Store } from 'Store/Store';
import { TextArea, Props } from "./TextArea";

type OwnProps = Pick<Props, "tableName" | "path">;
type MappedStateProps = Pick<Props, "value">;
type MappedDispatchProps = Pick<Props, "setValue">;

const mapStateToProps = (state: Store.State, ownProps: OwnProps): MappedStateProps => {
    const value = ((state.edit.edited as Record<string, any>)[ownProps.tableName] || {})[ownProps.path] || "";

    return {
        value
    }
}

const mapDispatchProps = (dispatch: Dispatch, ownProps: OwnProps): MappedDispatchProps => {
    return {
        setValue: (value: string) => dispatch(setValue(ownProps.tableName, ownProps.path, value)),
    }
}

export const TextAreaContainer = connect(mapStateToProps, mapDispatchProps)(TextArea);
