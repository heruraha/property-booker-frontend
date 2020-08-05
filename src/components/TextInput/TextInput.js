import React from 'react'
import PropTypes from 'prop-types'
import './TextInput.scss'

class TextInput extends React.Component {
    static propTypes = {
      hasError: PropTypes.bool,
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      disabled: PropTypes.bool,
      type: PropTypes.oneOf(['button', 'submit', 'email', 'hidden', 'email', 'password', 'search', 'tel', 'url', 'number', 'text', 'time']),
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
      multiline: PropTypes.bool,
      autoFocus: PropTypes.bool,
      autoComplete: PropTypes.bool,
      className: PropTypes.string,
      errorMessage: PropTypes.string
    };
    static defaultProps = {
      hasError: false,
      type: 'text',
      disabled: false,
      multiline: false,
      autoComplete: true
    };
  
    render() {
      const { id, label, type, value, placeholder, disabled, hasError, errorMessage, onChange, onBlur, className, multiline, autoFocus, autoComplete, currency, ...inputProps } = this.props;

      const inputClass = `
        form-control
        ${hasError && 'is-invalid'}
      `;

      const inputWrapClass = `
        form-group  
        ${className && className}
      `
  
      return (
        <>
        <div className={inputWrapClass}>
          {label && <label htmlFor={id}>{label}</label>}
          { 
            !multiline ? 
              !currency ?
              <input
                id={id}
                name={id}
                type={type}
                className={inputClass}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                autoFocus={autoFocus ? true : false}
                autoComplete={autoComplete ? 'on' : 'off'}
                disabled={disabled === true ? true : false}
                {...inputProps}
                />
                :
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text nb rounded-0 px-3">$</div>
                  </div>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    className={inputClass}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoFocus={autoFocus ? true : false}
                    autoComplete={autoComplete ? 'on' : 'off'}
                    disabled={disabled === true ? true : false}
                    {...inputProps}
                    />
                </div>
            :
            <textarea
              id={id}
              name={id}
              className={inputClass}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              autoFocus={autoFocus ? true : false}
              rows={3}
              {...inputProps}
            />
          }

          {hasError && <div className="invalid-feedback">{errorMessage ? errorMessage : 'Invalid field'}</div> }
        </div>
        </>
      );
    }
  }
  
export default TextInput;