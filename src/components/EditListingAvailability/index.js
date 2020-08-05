import React from 'react'
import { Edit } from 'react-feather';
import * as moment from 'moment'
import TextInput from 'components/TextInput/TextInput';
import Button from 'components/Button/Button';
import Calendar from 'components/Calendar'

const EditListingAvailability = (props) => {
    const [state, setState] = React.useState({active: props.startDate && props.endDate ? false : true})
    return (
        <form onSubmit={props.onSubmit}>
        <h4 className="mb-3">Availability</h4>
        <p className="mb-5">Choose the dates your property is <strong>not available</strong></p>
        
        {state.active === true  ?  
        <div className="position-relative">
          <Calendar
            numberOfMonths="2"
            startDate={props.startDate}
            endDate={props.endDate}
            handleDateChange={props.onChange}
            firstDayOfWeek={props.firstDayOfWeek}
            activeMonths={props.activeMonths}
            isDateSelected={props.isDateSelected}
            isDateHovered={props.isDateHovered}
            isFirstOrLastSelectedDate={props.isFirstOrLastSelectedDate}
            isDateBlocked={props.isDateBlocked}
            isDateFocused={props.isDateFocused}
            focusedDate={props.focusedDate}
            onDateHover={props.onDateHover}
            onDateSelect={props.onDateSelect}
            onDateFocus={props.onDateFocus}
            goToPreviousMonths={props.goToPreviousMonths}
            goToNextMonths={props.goToNextMonths}
          />
        </div>
        :
        <div className="d-flex align-items-center justify-content-between mb-3">
          <p className="m-0"><strong>Date unavailable: </strong> {moment(props.startDate).format('MM-DD-YYYY')} to {moment(props.endDate).format('MM-DD-YYYY')}</p>
          <button className="btn btn-link" onClick={()=>setState({active: true})}><Edit /> Edit Dates</button>
        </div>
        }

        <div className="row">
        <TextInput
          className="my-3 col-sm-6"
          id="checkin_time"
          placeholder="00:00"
          label="Check in time"
          type="time"
          onChange={props.onTimeChange}
          value={props.checkInTime}
        />

        <TextInput
          className="my-3 col-sm-6"
          id="checkout_time"
          placeholder="00:00"
          label="Check out time"
          type="time"
          onChange={props.onTimeChange}
          value={props.checkOutTime}
        />
        </div>

        <Button
          className="my-5"
          type="submit"
          variant="primary"
          block={true}
          label="Save Booking Options" 
          size="lg"
        />

        </form>
    )
}

export default EditListingAvailability