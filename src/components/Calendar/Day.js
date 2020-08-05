import React, { useRef, useContext } from "react";
import { useDay } from "@datepicker-react/hooks";
import DatepickerContext from "./datePickerContext";

function Day({ day, date, disabled }) {
  const dayRef = useRef(null);
  const {
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover
  } = useContext(DatepickerContext);

  const {
    isSelected,
    isSelectedStartOrEnd,
    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex
  } = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef
  });

  if (!day) {
    return <div />;
  }

  return (
    <button
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      type="button"
      ref={dayRef}
      disabled={disabled}
      className={isSelected || isSelectedStartOrEnd ? 'selected' : null }
    >
      <span className={isSelected || isSelectedStartOrEnd ? 'selected' : null }>{day}</span>
    </button>
  );
}

export default Day;
