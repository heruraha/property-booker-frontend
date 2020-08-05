import React from 'react'
import PropTypes from 'prop-types'
import { WithContext as ReactTags } from 'react-tag-input';
import { X, ChevronDown } from 'react-feather'
import './TagsInput.scss'

const TagsInput = (props) => {
    return (
    <div className="form-group">
    <label>{props.label}</label>
    <ReactTags
      tags={props.tags}
      suggestions={props.suggestions}
      delimiters={[188,13]}
      handleDelete={props.handleDelete}
      handleDrag={()=>console.log('dragged')}
      handleAddition={props.handleAddition}
      handleTagClick={props.handleTagClick}
      inputFieldPosition="top"
      classNames={{
        tags: 'tags-input-wrap',
        selected: 'tags-input-div mb-2',
        tagInput: 'form-group',
        tagInputField: 'form-control',
        tag: 'selected-tag mr-2 px-2',
        remove: 'remove-btn px-1',
        suggestions: 'select-menu',
        activeSuggestion: 'active'
        }}/>
    </div>
    )
}
TagsInput.propTypes = {
    hasError: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    handleDelete: PropTypes.func.isRequired,
    handleAddition: PropTypes.func.isRequired,
    handleTagClick: PropTypes.func.isRequired,
    className: PropTypes.string,
  };
  TagsInput.defaultProps = {
    hasError: false,
    disabled: false,
  };
    
export default TagsInput