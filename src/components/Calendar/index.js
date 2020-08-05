import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useDatepicker, START_DATE } from "@datepicker-react/hooks";
import Month from "components/Calendar/Month";
import DatepickerContext from "components/Calendar/datePickerContext";


const Calendar = (props) => {
    const [state, setState] = React.useState({
      startDate: props.startDate ? props.startDate : null, 
      endDate: props.endDate ? props.endDate : null,
      focusedInput: START_DATE
    });
    const {
        firstDayOfWeek,
        activeMonths,
        isDateSelected,
        isDateHovered,
        isFirstOrLastSelectedDate,
        isDateBlocked,
        isDateFocused,
        focusedDate,
        onDateHover,
        onDateSelect,
        onDateFocus,
        goToPreviousMonths,
        goToNextMonths
      } = props;

    // function handleDateChange(data) {
    //   console.log(data, 'inside component')
    //   //props.handleDateChange()
    //   if (!data.focusedInput) {
    //     setState({ ...data, focusedInput: START_DATE });
    //   } else {
    //     setState(data);
    //   }
    // }

    return (
        <DatepickerContext.Provider
          value={{
            focusedDate,
            isDateFocused,
            isDateSelected,
            isDateHovered,
            isDateBlocked,
            isFirstOrLastSelectedDate,
            onDateSelect,
            onDateFocus,
            onDateHover
          }}>

        <div className="calendar-card d-flex align-items-center">
          <div
            className="calendar-wrap"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${activeMonths.length}, 100%)`,
              gridGap: "0 10px",
              justifyItems: 'center',
              width: `calc(100%/${props.numberOfMonths})`
            }}>
            <button className="month-toggle back" type="button" onClick={goToPreviousMonths}>
              <ChevronLeft />
            </button>
            <button className="month-toggle forward" type="button" onClick={goToNextMonths}>
              <ChevronRight />
            </button>

            {activeMonths.map(month => (
              <Month
                key={`${month.year}-${month.month}`}
                year={month.year}
                month={month.month}
                firstDayOfWeek={firstDayOfWeek}
                disabled={props.disabled}
              />
            ))}
          </div>
        </div>
      </DatepickerContext.Provider>
    )
}

export default Calendar