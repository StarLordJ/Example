import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const CustomInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid rgba(0, 0, 0, 0.23)',
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: theme.palette.primary.main
        },
        '&:hover': {
            borderColor: "black"
        }
    },
}))(InputBase);

export type Props = InputBaseProps & { label: string, width?: string, path: string, tableName: string } & { setValue: (value: string) => void }

export function Input(props: Props) {
    const { label, path, tableName, setValue, ...filteredProps } = props;
    return (
        <FormControl>
            <InputLabel shrink htmlFor="bootstrap-input">{label}</InputLabel>
            <CustomInput onChange={e => props.setValue(e.target.value)} {...filteredProps} inputProps={{ style: { width: props.width || "100%" } }}></CustomInput>
        </FormControl>
    )
}

