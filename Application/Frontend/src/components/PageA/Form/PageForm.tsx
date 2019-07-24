import React from "react";
import { Input } from "../../Input";
import { TextArea } from "../../TextArea";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { DataBaseA } from "../../Types";

export interface Props {
    isEdited?: boolean | null;
    editedItem: Partial<DataBaseA> | null;
    selectedItem: DataBaseA | null;
    tableName: string;
    resetValues: () => null;
    sendData: (editedItem: Partial<DataBaseA>, isEditedItem: boolean) => null;
    deleteItemFromDB: (id: number) => null;
}

export class PageForm extends React.Component<Props> {

    public handleChangeValue = () => {
        this.props.sendData(this.props.editedItem, Boolean(this.props.isEdited));
        this.props.resetValues();
    }

    public handleDeleteValue = () => {
        this.props.deleteItemFromDB(this.props.selectedItem.id);
        this.props.resetValues();
    }

    render() {
        const buttonText = this.props.isEdited ? "Сохранить" : this.props.isEdited === null ? "Добавить" : "";
        return (
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={3}><Input label={"Поле 1"} tableName={this.props.tableName} path="field_1" /></Grid>
                        <Grid item xs={3}><Input label={"Поле 2"} tableName={this.props.tableName} path="field_2" /></Grid>
                        <Grid item xs={3}><Input label={"Поле 3"} tableName={this.props.tableName} path="field_3" /></Grid>
                        <Grid item xs={3}><Input label={"Поле 4"} tableName={this.props.tableName} path="field_4" /></Grid>
                        <Grid item xs={3}><Input label={"Поле 5"} tableName={this.props.tableName} path="field_5" /></Grid>
                        <Grid item xs={3}><Input label={"Поле 6"} tableName={this.props.tableName} path="field_6" /></Grid>
                        <Grid item xs={3}><Input label="Поле 7" width={"80%"} type="datetime-local" tableName={this.props.tableName} path="field_7" /></Grid>
                        <Grid item xs={3}><Input label={"Поле 8"} tableName={this.props.tableName} path="field_8" /></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={9}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}><TextArea label="Поле 9" tableName={this.props.tableName} path="field_9"></TextArea></Grid>
                                <Grid item xs={6}><TextArea label="Поле 10" tableName={this.props.tableName} path="field_10"></TextArea></Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            {Boolean(buttonText) && <Button onClick={this.handleChangeValue}>{buttonText}</Button>}
                            {Boolean(buttonText) && <Button onClick={this.props.resetValues}>{"Сбросить"}</Button>}
                            {Boolean(this.props.selectedItem) && <Button onClick={this.handleDeleteValue}>{"Удалить из БД"}</Button>}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
