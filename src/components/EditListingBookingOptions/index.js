import React from 'react'
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import Switch from 'components/Switch/Switch';

const EditListingBookingOptions = (props) => {

    return (
        <form onSubmit={props.onSubmit}>
        <h4 className="mb-3">Booking Options</h4>
        <p className="mb-5">Select your booking options</p>
        <TextInput
          type="number"
          step="1"
          className="mb-4"
          id="min_booking_days"
          placeholder="0 Days"
          label="Minimum Booking Duration in Days"
          onChange={props.onChange}
          value={props.minBookingDays}
        />

        <TextInput
          type="number"
          step="1"
          className="mb-4"
          id="sportsman_capacity"
          placeholder="0"
          label="Max Number of Guests"
          onChange={props.onChange}
          value={props.sportsmanCapacity}
        />

        <Switch
          id="autobooking_on"
          className="mb-4"
          label="Auto Booking"
          icons="true"
          defaultChecked={props.autoBooking}
          onChange={props.onSwitch}
          helpText="Approve booking requests automatically"
          />

        {/*needs endpoint */}
        <Switch
          id="overnight"
          className="mb-4"
          label="Overnight allowed?"
          icons="true"
          defaultChecked={props.overnightAllowed}
          onChange={props.onSwitch}
          />

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

export default EditListingBookingOptions