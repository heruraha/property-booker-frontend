import React from 'react';
import './Modal.scss';

const Modal = (props) => {

    return (
        <div className="modal d-flex" tabIndex="-1" role="dialog" onClick={props.close}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.close}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {props.img ? <img src={props.img} alt=""/> : null}
                    <h4 className="modal-title text-center p-3">{props.title}</h4>
                    <p>{props.body}</p>
                </div>
                {
                props.confirm ? 
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={props.confirm}>Confirm</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={props.cancel} >Cancel</button>
                </div>
                :
                <div className="modal-footer help">
                    Need help? &nbsp; <a href="#" target="_blank">Contact Us.</a>
                </div>
                }
                </div>
            </div>
        </div>
    )
}

export default Modal;