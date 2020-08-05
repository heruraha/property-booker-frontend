import React from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import { X, ChevronDown } from 'react-feather'
import './Select.scss'

const Select = (props) => {
  
  const {itemToString, items, hasError, className, id, placeholder, label, initialSelectedItem, ...rest} = props;

  const wrapClass = `
    select-wrap
    ${className && className}
  `;

    return(
      <Downshift itemToString={itemToString} initialSelectedItem={initialSelectedItem} {...rest}>
      {({
        getInputProps,
        getToggleButtonProps,
        getItemProps,
        isOpen,
        toggleMenu,
        clearSelection,
        selectedItem,
        inputValue,
        highlightedIndex,
      }) => (
        <div className={wrapClass}>
          {label && <label htmlFor={id}>{label}</label>}
          <div className={`select-wrap-inner ${isOpen === true ? 'active' : ''} `}>
            <input 
              className={`
              select-input form-control
              ${isOpen === true ? 'active' : ''} 
            `}
              type="text"
              {...getInputProps({
                //isOpen,
                placeholder: initialSelectedItem || placeholder,
                }) }
              />
            {selectedItem ? (

              <button 
                type="button"
                className="btn-controller pt-1" 
                aria-label="clear selection" 
                onClick={clearSelection}>
                <span><X/></span>
              </button>

            ) : (
              <button 
                {...getToggleButtonProps()}
                className="btn-controller pt-1" 
                aria-label="clear selection" 
                onClick={props.onToggleState}>
                <span ><ChevronDown /></span>
              </button>
            )}
          </div>
          {!isOpen ? null : (
            <div className="select-menu">
              {items.map((item, index) => (
                <li
                  className={`select-item
                  ${highlightedIndex === index && 'active'}
                  ${selectedItem === item && 'selected'}
                  `}
                  key={index}
                  {...getItemProps({
                    item,
                    index,
                  })}
                >
                  {itemToString(item)}
                </li>
              ))}
            </div>
          )}
        </div>
      )}
    </Downshift>
    )
    
  }

Select.propTypes = {
  hasError: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  multiline: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.bool,
  className: PropTypes.string,
  errorMessage: PropTypes.string
};
Select.defaultProps = {
  hasError: false,
  type: 'text',
  disabled: false,
  autoComplete: true
};
  
export default Select;