import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const DateInput: React.FC<{
  value: string;
  type: "checkIn" | "checkOut";
  handleChange: (d: string, type: "checkIn" | "checkOut") => void;
}> = ({ value, type, handleChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        shouldDisableDate={(date: any) => {
          return (
            date.year() === new Date().getFullYear() &&
            date.month() === new Date().getMonth() &&
            date.date() === new Date().getDate()
          );
        }}
        disablePast={true}
        renderInput={(params) => <TextField {...params} />}
        value={value}
        onChange={(newValue) => handleChange(newValue, type)}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
