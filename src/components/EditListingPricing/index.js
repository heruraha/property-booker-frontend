import React from 'react'
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';

const EditListingPricing = (props) => {

    return (
        <form onSubmit={props.onSubmit}>
        <h4 className="mb-3">Pricing</h4>
        <p className="mb-5">Set the daily rate of your listing</p>
        <TextInput
          type="number"
          step="1"
          className="mb-4"
          id="daily_rate_usd"
          placeholder="0.00"
          label="Price per day"
          onChange={props.onChange}
          value={props.price}
          currency
        />

        <Button
          className="mt-3 mb-5"
          type="submit"
          variant="primary"
          block={true}
          label="Save Pricing" 
          size="lg"
        />

        </form>
    )
}

export default EditListingPricing