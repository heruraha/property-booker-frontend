import React from 'react';
import Downshift from 'downshift'
import matchSorter from 'match-sorter'

import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';
import { validateField } from 'services/util';
import { USAStates } from 'services/util.js';


const EditProfileForm = (props) => {
    const [state, setState] = React.useState({isOpen: false,itemsToShow: USAStates})

    const itemToString = i => i ? i.value : ''
    const getItemsToShow = (value) => {
        return value
          ? matchSorter(USAStates, value, {
              keys: ['value'],
            })
          : USAStates
    }
    const handleStateChange = (changes, downshiftState) => {
        if (changes.hasOwnProperty('isOpen')) {
          // downshift is saying that isOpen should change, so let's change it...
          setState(({isOpen, itemsToShow}) => {
            // if it's changing because the user's clicking outside of the downshift
            // component, then we actually don't want to change the isOpen state
            isOpen =
              changes.type === Downshift.stateChangeTypes.mouseUp
                ? isOpen
                : changes.isOpen
            if (isOpen) {
              // if the menu is going to be open, then we should limit the results
              // by what the user has typed in, otherwise, we'll leave them as they
              // were last...
              itemsToShow = getItemsToShow(downshiftState.inputValue)
            }
            return {isOpen, itemsToShow}
          })
        } else if (changes.hasOwnProperty('inputValue')) {
          // downshift is saying that the inputValue is changing. Since we don't
          // control that, we'll just use that information to update the items
          // that we should show.
          setState({
            ...state,
            itemsToShow: getItemsToShow(downshiftState.inputValue),
          })
        }
    }
    const clearSelection = () => setState({isOpen: false,itemsToShow: USAStates})
    const handleToggleClick = () => setState({ ...state, isOpen: !state.isOpen})

    return (
      <form onSubmit={props.onSubmit}>

        <div className="row">
          <TextInput
            className="mb-3 col-sm-6"
            id="first"
            placeholder="First Name"
            label="First Name"
            onChange={props.onChange}
            value={props.first}

          />
          <TextInput
            className="mb-3 col-sm-6"
            id="last"
            placeholder="Last Name"
            label="Last Name"
            onChange={props.onChange}
            value={props.last}
          />
        </div>

        <TextInput
          className="mb-3"
          type="email"
          id="email"
          placeholder="Email"
          label="Email"
          onChange={props.onChange}
          value={props.email}
          hasError={validateField('email', props.email)}
          errorMessage={'Please enter a valid email'}
        />

        <TextInput
          className="mb-3"
          type="tel"
          id="phone"
          placeholder="Phone"
          label="Phone"
          onChange={props.onChange}
          value={props.phone}
          hasError={validateField('phone', props.phone)}
          errorMessage={'Please enter a valid phone number (numbers only)'}
        />

        <TextInput
          className="mb-3"
          id="addr_street"
          placeholder="Street Name"
          label="Street Name"
          onChange={props.onChange}
          value={props.addr_street}
          autoFocus={true}
        />

        <div className="row mb-4">
          <TextInput
            className="mb-3 col-sm-6"
            id="addr_city"
            placeholder="city"
            label="city"
            onChange={props.onChange}
            value={props.addr_city}

          />

          <Select
            id="State"
            label="State"
            className="mb-3 col-sm-3 px-0"
            isOpen={state.isOpen}
            onChange={props.onAddrStateChange}
            onStateChange={handleStateChange}
            onToggleState={handleToggleClick}
            clearSelection={clearSelection}
            items={state.itemsToShow}
            itemToString={itemToString}
            placeholder={'State'}
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
            />
        </div>

        <Button
          type="submit"
          variant="primary"
          block={true}
          label="Save" 
          size="lg"
        />

      </form>
    )
}

export default EditProfileForm