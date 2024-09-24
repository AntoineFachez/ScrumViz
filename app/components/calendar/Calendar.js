import React, { useState, useContext } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';

import PTBalanceContext from '../../context/PTBalanceContext';

export default function BasicDateCalendar({ pickedDate, setPickedDate }) {
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

  function DayIndicator(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) >= 0;
    const isPastDate = dayjs(day).isBefore(dayjs(), 'day');

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? '🌚' : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          // outsideCurrentMonth={outsideCurrentMonth ? ' ' : day.format('D')}
          day={day}
          disabled={isPastDate} // Pass the 'disabled' prop here
        />
      </Badge>
    );
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={pickedDate ? pickedDate : dayjs('2024-08-2')}
        onChange={(newValue) =>
          setPickedDate(newValue ? newValue : dayjs('2024-08-2'))
        }
        slots={{
          day: DayIndicator,
          // disabled: (day) => dayjs(day).isBefore(dayjs(), 'day'), // no effect
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
    </LocalizationProvider>
  );
}
