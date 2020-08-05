import React from 'react';
import './Toast.scss';

const Toast = (props) => {
    return (
        <div className={`${props.type ? props.type : ''} ${props.active ? ' on' : ''} toasty`}>
            <span className="close" tabIndex="0" onClick={props.close}>&times;</span>
            {props.message}
        </div>
    )
}

export default Toast;