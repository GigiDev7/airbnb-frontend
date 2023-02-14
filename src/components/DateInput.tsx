import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { IProperty } from "../interfaces";

const DateInput: React.FC<{
  value: string;
  type: "checkIn" | "checkOut";
  handleChange: (d: string, type: "checkIn" | "checkOut") => void;
  property: IProperty;
}> = ({ value, type, handleChange, property }) => {
  const datesFilter = (date: any) => {
    let isInvalid = false;
    for (const b of property.bookings) {
      if (date.isBetween(b.checkIn, b.checkOut)) {
        isInvalid = true;
        break;
      }
    }
    return isInvalid;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        shouldDisableDate={(date: any) => datesFilter(date)}
        disablePast={true}
        renderInput={(params) => <TextField {...params} />}
        value={value}
        onChange={(newValue) => handleChange(newValue, type)}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
