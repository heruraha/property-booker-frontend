import React from 'react'
import PropTypes from 'prop-types'
import './TitleBar.scss'

const TitleBar = (props) => {
    return (
    <div className="mb-4 p-4 bg-primary d-flex flex-row title-bar">
        <h3>{props.title}</h3>
        <div className="d-flex title-bar-inner">
            {props.buttonSecondary && props.buttonSecondary}
            {props.buttonPrimary && props.buttonPrimary}
        </div>
    </div>
    )
}

TitleBar.propTypes = {
    title: PropTypes.string.isRequired,
    buttonPrimary: PropTypes.object,
    buttonSecondary: PropTypes.object,
  }
  
  export default TitleBar