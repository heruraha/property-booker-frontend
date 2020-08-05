import React from 'react'
import TagsInput from 'components/TagsInput/TagsInput';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import Switch from 'components/Switch/Switch';

const EditListingAdditionalInfo = (props) => {

    return (
        <form onSubmit={props.onSubmit}>
        <h4 className="mb-3">Additional Info</h4>
        <p className="mb-5">Add amenities and parking instructions</p>
        
        <TagsInput
          label="Amenities"
          tags={props.selectedAmenities}
          suggestions={props.amenities}
          handleDelete={props.deleteAmenity}
          handleAddition={props.addAmenity}
          handleTagClick={props.amenityClicked}
        />
        
        <TextInput
          className="mb-5"
          id="parking_info"
          placeholder="parking info"
          label="Parking Information"
          onChange={props.onChange}
          value={props.parking_info}
          multiline={true}
        />

        <Switch
          id="ohvs_permitted"
          className="mb-4"
          label="OHVs allowed?"
          icons="true"
          defaultChecked={props.ohvs_permitted}
          onChange={props.onSwitch}
          helpText="Off Highway Vehicles (OHVs) allowed on this property?"
          />

        <Switch
          id="pets_permitted"
          className="mb-5"
          label="Pets allowed?"
          icons="true"
          defaultChecked={props.pets_permitted}
          onChange={props.onSwitch}
          helpText="Pets allowed on this property?"
          />

        <Button
          className="mt-4 mb-5"
          type="submit"
          variant="primary"
          block={true}
          label="Save Listing" 
          size="lg"
        />

        </form>
    )
}

export default EditListingAdditionalInfo