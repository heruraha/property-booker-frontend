import React from 'react'
import Button from 'components/Button/Button';
import Switch from 'components/Switch/Switch';
import MultiSelect from 'components/MultiSelect/MultiSelect'

const EditListingFeatures = (props) => {
  const itemToString = i => i ? i.name : ''

    return (
        <form onSubmit={props.onSubmit}>
        <h4 className="mb-3">Features</h4>
        <p className="mb-5">Select the features of your listing</p>

        <MultiSelect 
          className="mb-4"
          selectedItems={props.attributes.selectedTerrain}
          items={props.attributes.terrain}
          onChange={props.handleTerrainChange}
          onDelete={props.handleTagDelete}
          itemToString={itemToString}
          label="terrain"
          name="terrain"
          />

        <MultiSelect
          className="mb-4"
          selectedItems={props.attributes.selectedAnimals}
          items={props.attributes.animals}
          onChange={props.handleAnimalsChange}
          onDelete={props.handleTagDelete}
          itemToString={itemToString}
          label="animals"
          name="animals"
          /> 

        <MultiSelect
          className="mb-4"
          selectedItems={props.attributes.selectedActivities}
          items={props.attributes.activities}
          onChange={props.handleActivitiesChange}
          onDelete={props.handleTagDelete}
          itemToString={itemToString}
          label="activities"
          name="activities"
          /> 

        <MultiSelect
          className="mb-4"
          selectedItems={props.attributes.selectedWeapons}
          items={props.attributes.weapons}
          onChange={props.handleWeaponsChange}
          onDelete={props.handleTagDelete}
          itemToString={itemToString}
          label="weapons Allowed"
          name="weapons"
          />

        <Button
          className="my-5"
          type="submit"
          variant="primary"
          block={true}
          label="Save Features" 
          size="lg"
        />

        </form>
    )
}

export default EditListingFeatures