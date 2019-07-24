import React from 'react';
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(3),
    },
    focused: {
        borderWidth: "1px !important"
    }
}));

export type Props = TextFieldProps & { tableName: string, path: string, setValue: (value: string) => void }

export function TextArea(props: Props) {
    const { label, tableName, path, setValue, ...filteredProps } = props;
    const classes = useStyles();

    return (
        <FormControl>
            <InputLabel shrink htmlFor="bootstrap-input">{props.label}</InputLabel>
            <TextField
                {...filteredProps}
                onChange={e => props.setValue(e.target.value)}
                className={classes.textField}
                InputProps={{
                    classes: {
                        notchedOutline: classes.focused,
                    },
                }}
                multiline
                rows="4"
                variant="outlined"
            />
        </FormControl>
    )
}

