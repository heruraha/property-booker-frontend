import React from 'react'
import PropTypes from 'prop-types'
import { X, ChevronDown } from 'react-feather'
import MultiDownshift from './MultiDownshift'
import { sortByKey } from 'services/util'
import './MultiSelect.scss'


const MultiSelect = (props) => {
  
  const {itemToString, items, hasError, className, id, placeholder, label, onDelete, name, ...rest} = props;

  const wrapClass = `
    multi-select-wrap
    ${className && className}
  `;

  const ArrowIcon = ({isOpen}) => {
    return (
      <svg
        viewBox="0 0 20 20"
        preserveAspectRatio="none"
        width={16}
        fill="transparent"
        stroke="#979797"
        strokeWidth="1.1px"
        transform={isOpen ? 'rotate(180)' : null}>
        <path d="M1,6 L10,15 L19,6" />
      </svg>
    )
  }

  const itemsSorted = sortByKey(items, 'name')

    return(
      <MultiDownshift 
        onChange={props.onChange} 
        selectedItems={props.selectedItems} 
        itemToString={props.itemToString}
        onDelete={onDelete}
        type={name}
        >
      {({
            getToggleButtonProps,
            getRemoveButtonProps,
            isOpen,
            selectedItems,
            getItemProps,
            highlightedIndex,
      }) => {
        return (
        <div className={wrapClass}>
          {label && <label htmlFor={id}>{label}</label>}
          <div className={`select-wrap-inner ${isOpen === true ? 'active' : ''} `}>
              <button className="controller-btn form-control" {...getToggleButtonProps()}>
                    <div className="d-flex mr-2 flex-wrap">
                    {selectedItems.length > 0
                    ? selectedItems.map(item => (
                        <div
                          key={item.id}
                          className="selected-tag mr-2 mb-1"
                        >
                          {item.name}{' '}
                          <span {...getRemoveButtonProps({item})}><X/></span>
                        </div>
                      ))
                    : 'Select a value'}                        
                    </div>
                    <ArrowIcon isOpen={isOpen} />
              </button>

          </div>
          {!isOpen ? null : (
            <div className="select-menu">
              {itemsSorted.map((item, index) => (
                <li
                  className={`select-item
                  ${highlightedIndex === index && 'active'}
                  ${selectedItems.includes(item) && 'selected'}
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
      )
                }
    }
    </MultiDownshift>
    )
    
  }

MultiSelect.propTypes = {
  hasError: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
MultiSelect.defaultProps = {
  hasError: false,
  disabled: false,
};
  
export default MultiSelect;