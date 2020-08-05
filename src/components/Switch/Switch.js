import React from 'react'
import PropTypes from 'prop-types'
import Toggle from 'react-toggle'
import { Check, X } from 'react-feather'
import './Switch.scss'

const Switch = (props) => {  
  const inputWrapClass = `
    form-group  
    ${props.className && props.className}`;
  
    const ToggleBtn = <Toggle
      id={props.id}
      name={props.id}
      defaultChecked={props.defaultChecked}
      icons={props.icons ? {checked: <Check size="16" />, unchecked: <X size="16" />} : false}
      onChange={props.onChange}
      disabled={props.disabled}
      />

      return (
        <div className={inputWrapClass}>
          {props.label ?
          <>
          <label htmlFor={props.id}>{props.label}</label>
          <div className="d-flex">
            {ToggleBtn}
          </div>
          </>
          :
          ToggleBtn
          }
          {props.helpText && <small className="form-text text-muted">{props.helpText}</small>}
        </div>
      );

}

Switch.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool
}
  
export default Switch;