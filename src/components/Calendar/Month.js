import React from 'react';
import { useMonth } from '@datepicker-react/hooks';

import Day from './Day';
import './Calendar.scss';

const Month = ({ year, month, firstDayOfWeek, disabled }) => {
  const { days, weekdayLabels, monthLabel } = useMonth({
    year,
    month,
    firstDayOfWeek
  });

  // function checkDisabled(day) { 
  //   const tomorrow = new Date();
  //   tomorrow.setDate(tomorrow.getDate() + 2);
  //   const date = new Date(day.date);
  //   if(date && date.getDay() === 6 || date && date.getDay() === 0) {
  //     return true
  //   } else {
  //     if(date.getTime() < tomorrow) { return true } else { return false }
  //   }
  // }

  return (
    <div className="month-wrap">
      <div className="month-label">
        <label>{monthLabel}</label>
      </div>
      <div className="weekdays">
        {weekdayLabels.map(dayLabel => (
          <div className="text-center day-label" key={dayLabel}>
            {dayLabel}
          </div>
        ))}
      </div>
      <div className="days">

        {days.map((day, i) => (
          <Day 
            date={day.date} 
            key={i} 
            day={day.dayLabel} 
            disabled={disabled}  
          />
        ))}
      </div>
    </div>
  );
}

export default Month;
