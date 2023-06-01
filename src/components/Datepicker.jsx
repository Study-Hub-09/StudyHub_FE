import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  datePicker: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '12px',
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#00573F',
    },
    secondary: {
      main: '#2ffce5',
    },
  },
});

export default function BasicDatePicker() {
  const custom = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker className={custom.datePicker} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
