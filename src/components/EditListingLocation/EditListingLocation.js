import React from 'react';
import Downshift from 'downshift'
import matchSorter from 'match-sorter'

import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';
import { validateField } from 'services/util';
import { USAStates, Countries } from 'services/util.js';


const EditListingLocation = (props) => {
    const [state, setState] = React.useState({isOpen: false,itemsToShow: USAStates})
    const [country, setCountry] = React.useState({isOpen: false,itemsToShow: Countries})
    const itemToStringLabel = i => i ? i.label : ''
    const itemToStringVal = i => i ? i.value : ''
    const getItemsToShow = (value, arr, key) =>  value ? matchSorter(arr, value, {keys: [key] }) : arr;
    const handleSelectChange = (changes, downshiftState) => {
      if (changes.hasOwnProperty('isOpen')) {
        setState( ({isOpen, itemsToShow}) => {
          isOpen = changes.type === Downshift.stateChangeTypes.mouseUp ? isOpen : changes.isOpen
          if (isOpen) { itemsToShow = getItemsToShow(downshiftState.inputValue, USAStates, 'value') }
          return {isOpen, itemsToShow}
        })
      } else if (changes.hasOwnProperty('inputValue')) {
        setState({ ...state, itemsToShow: getItemsToShow(downshiftState.inputValue, USAStates, 'value'),
        })
      }
    }
    const handleCountryChange = (changes, downshiftState) => {
      if (changes.hasOwnProperty('isOpen')) {
        setCountry( ({isOpen, itemsToShow}) => {
          isOpen = changes.type === Downshift.stateChangeTypes.mouseUp ? isOpen : changes.isOpen
          if (isOpen) { itemsToShow = getItemsToShow(downshiftState.inputValue, Countries, 'label') }
          return {isOpen, itemsToShow}
        })
      } else if (changes.hasOwnProperty('inputValue')) {
        setCountry({ ...state, itemsToShow: getItemsToShow(downshiftState.inputValue, Countries, 'label'),
        })
      }
    }
    const handleToggleClick = (field) =>  field === 'state' ? setState({ ...state, isOpen: !state.isOpen}) : setCountry({ ...country, isOpen: !country.isOpen}) 

    return (
      <>
      <form onSubmit={props.onSubmit}>

        <h4 className="mb-5">Location Description</h4>
        <TextInput
          className="mb-3"
          id="name"
          placeholder="Listing Name"
          label="Listing Name"
          onChange={props.onChange}
          value={props.name}
        />

        <TextInput
          className="mb-5"
          id="description"
          placeholder="description"
          label="description"
          onChange={props.onChange}
          value={props.description}
          multiline={true}
        />

        <h4 className="mb-5">Land Location</h4>
        <TextInput
          className="mb-3"
          id="addr_street"
          placeholder="Street Address"
          label="Street Address"
          onChange={props.onChange}
          value={props.addr_street}
        />

        <div className="row">
          <TextInput
            className="mb-3 col-sm-6"
            id="addr_city"
            placeholder="city"
            label="city"
            onChange={props.onChange}
            value={props.addr_city}
            autoComplete={false}
          />

          <Select
            id="State"
            label="State"
            className="mb-3 col-sm-3 px-sm-0"
            isOpen={state.isOpen}
            onChange={props.onAddrStateChange}
            onStateChange={handleSelectChange}
            onToggleState={() => handleToggleClick('state')}
            items={state.itemsToShow}
            itemToString={itemToStringVal}
            placeholder={'State'}
            autoComplete={false}
            initialSelectedItem={props.addr_state}
          />

          <TextInput
            className="mb-3 col-sm-3"
            type="number"
            id="addr_zip"
            placeholder="zip"
            label="zip"
            onChange={props.onChange}
            value={props.addr_zip}
            hasError={false}
            errorMessage={'Please enter a valid zip'}
            autoComplete={false}
          />
        </div>

        <Select
            id="Country"
            label="Country"
            className="mb-3"
            isOpen={country.isOpen}
            onChange={props.onAddrCountryChange}
            onStateChange={handleCountryChange}
            onToggleState={() => handleToggleClick('country')}
            items={country.itemsToShow}
            itemToString={itemToStringLabel}
            placeholder={'Select Country'}
            autoComplete={false}
            initialSelectedItem={props.addr_country}
          />

        <TextInput
          className="mb-5"
          id="entrance_info"
          placeholder="Entrance 1, Entrance 2..."
          label="Entrance Locations"
          onChange={props.onChange}
          value={props.entrance_info}
        />

        <Button
          className="mb-5"
          type="submit"
          variant="primary"
          block={true}
          label="Continue" 
          size="lg"
          disabled={props.addr_street !== '' && props.addr_city !== '' && props.addr_state !== '' && props.addr_zip !== '' && props.addr_city !== '' && props.name !== '' ? false : true}
        />

      </form>
      </>
    )
}

export default EditListingLocation