import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

class Button extends React.Component {
    static propTypes = {
      hasError: PropTypes.bool,
      id: PropTypes.string,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      type: PropTypes.oneOf(['button', 'submit']),
      onClick: PropTypes.func,
      className: PropTypes.string,
      size: PropTypes.string,
      icon: PropTypes.object,
    };
    static defaultProps = {
      hasError: false,
      type: 'button',
      disabled: false,
      size: 'md'
    };
  
    render() {
      const { id, label, type, size, variant, block, disabled, hasError, onClick, className, icon, helpText, ...buttonProps } = this.props;

      const buttonClass = `
        btn
        btn-component
        ${variant ? 'btn-'+variant : 'btn-default'}
        ${block === true ? 'btn-block' : ''}
        ${hasError ? 'btn-error' : ''}
        ${className ? className : ''}
        ${size === 'lg' ? 'lg' : ''}
        ${icon ? 'btn-icon' : ''}
      `;
  
      return (
        <>
        <button
          id={id}
          type={type}
          className={buttonClass}
          disabled={disabled ? true : false}
          onClick={onClick}
          {...buttonProps}
          >
          {icon && icon}
          {!icon ? label : <span>{label}</span>}
        </button>
        {helpText && <small className="form-text text-muted text-center">{helpText}</small>}
        </>
      );
    }
  }
  
export default Button;