import React, { useEffect, useState } from 'react';
import { CTX } from 'store';
import * as moment from 'moment'
import { HelpCircle, CheckCircle, XCircle } from 'react-feather'
import './SideModal.scss';
import APIService from 'services/backstrap/apiService';
import Button from 'components/Button/Button';
import CardProperty from 'components/CardProperty';

const SideModal = () => {
  const [appState, dispatch] = React.useContext(CTX)
  const token = appState.bs_user.cgo_api_key;

  const closeModal = () =>   dispatch({type: 'TOGGLE_SIDEMODAL', payload: { 
    title: '',
    data: null,
    open: !appState.sideModalOpen
  } });
  const data = appState.sideModalOpen.data

  const [state, setState] = useState({

  })
  const responseToRequest = (id, response) => {
    const body = {
      request_id: id,
      approve_request: response
    }
    APIService.respondToLeaseRequest(token, body)
    .then(res => console.log(res, 'success responding to lease'))
    .catch(err => console.log(err, 'error responding to lease request'))
  }

  return (
    <>

    <div className={'sidenav ' + (appState.sideModalOpen.open ? 'show' : 'hide')}>
      <div className="wrap">
        <h3 className="mt-4 mb-5">{appState.sideModalOpen.title}</h3>

        { appState.sideModalOpen.view === 'view_request' &&
          <div className="row mx-0">
            <div className="col-sm-6">
              <p>
                <strong className="mr-2">Start Date:</strong> 
                {moment(data.start_date).format('MM/DD/YYYY')}
              </p>
              <p>
                <strong className="mr-2">End Date:</strong> 
                {moment(data.end_date).format('MM/DD/YYYY')}
              </p>
              <p>
                <strong className="mr-2">Status:</strong> 
                {data.status}
              </p>
            </div>
            <div className="col-sm-6">
              <p>
                <strong className="mr-2">Subtotal:</strong>
                ${data.cost_data.subtotal.toLocaleString("en-US", {style:"currency", currency:"USD"})}
              </p>
              <p>
                <strong className="mr-2">Service Fee:</strong>
                ${data.cost_data.service_fee.toLocaleString("en-US", {style:"currency", currency:"USD"})}
              </p>
              <p>
                <strong className="mr-2">Total Cost:</strong>
                ${data.cost_data.total_cost.toLocaleString("en-US", {style:"currency", currency:"USD"})}
              </p>
            </div>

            <div className="col-sm-12">
              <div className="alert alert-info my-3 text-center"><HelpCircle /> Would you like to approve this booking request?</div>
              <div className="row my-4">
                <div className="col-sm-6">
                  <Button 
                    variant="primary" 
                    label="Approve" 
                    block={true} 
                    icon={<CheckCircle/>} 
                    onClick={() => responseToRequest(data.id, true)}
                  />
                </div>
                <div className="col-sm-6">
                  <Button 
                    variant="outline-danger" 
                    label="Decline" 
                    block={true} 
                    icon={<XCircle/>} 
                    onClick={() => responseToRequest(data.id, false)}
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-12">
              <CardProperty
                name={data.listing.name}
                description={data.listing.description}
                img={data.listing.img ? data.listing.img : null}
                photos={data.listing.photos}
              />
            </div>
          
          </div>
        }
        
      </div>
      
      <button className="close-menu" onClick={closeModal}>
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path d="M2.22-12.375l6.61-6.61,1.363-1.363a.516.516,0,0,0,0-.729L8.735-22.536a.516.516,0,0,0-.729,0L.032-14.563l-7.973-7.974a.516.516,0,0,0-.729,0l-1.459,1.459a.516.516,0,0,0,0,.729l7.974,7.974L-10.129-4.4a.516.516,0,0,0,0,.729l1.459,1.459a.516.516,0,0,0,.729,0L.032-10.187l6.61,6.61L8.006-2.214a.516.516,0,0,0,.729,0l1.459-1.459a.516.516,0,0,0,0-.729Z" transform="translate(10.28 22.687)" fill="#ddd"/>
        </svg>
      </button>


    </div>
    </>
  )
}

export default SideModal;
