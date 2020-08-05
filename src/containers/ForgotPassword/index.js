import React, { useState, useEffect } from 'react';
import { CTX } from 'store';
import { Redirect } from 'react-router-dom';

import APIService from 'services/backstrap/apiService';
import Toast from 'components/Toast/Toast';
import Header from 'components/Header/Header';
import ForgotPasswordForm from 'components/ForgotPasswordForm/ForgotPasswordForm';


const ForgotPassword = (props) => {

    document.title = `Forgot Password - Trekker`;

    const [appState, dispatch] = React.useContext(CTX);
    const [email, setEmail] = useState({email: '', state: 'ready'})

    const handleChange = e => setEmail({ ...email, [e.target.name]: e.target.value})

    const handleFormSubmit = (e) => {
      e.preventDefault();
      dispatch({type: 'LOADING_ENABLED'})
      APIService.forgotPassword(email.email)
      .then((res) => {
        console.log(res, 'forgot password')
        dispatch({type: 'LOADING_DISABLED'})
        setEmail({...email, state: 'sent'})
      })
      .catch((err) => { 
        console.log(err, 'error')
        err && err.data ? 
          setMsg({active: true, type: 'danger', data: err.data.message}) : 
          setMsg({active: true, type: 'danger', data: 'Error'})
        dispatch({type: 'LOADING_DISABLED'})
      })  
    }

    const [msg, setMsg] = React.useState({active: false, type: null, data: null})
    
    useEffect(() => {
      const loadingTimeout = setTimeout( () => dispatch({type: 'LOADING_DISABLED'}), 777 );
      return () => loadingTimeout
    }, [])

    return (
      <>
      {!appState.isAuthenticated ?
      <>
      <Header props={props} />
      <div className="container full-center">

        <div className="col-sm-6">

          <h3 className="mb-5">
            Forgot Password? Reset it here.
          </h3>

          <div className="mt-3 d-flex flex-column justify-content-center">
            { email.state === 'ready' ? 
              <ForgotPasswordForm
                onSubmit={handleFormSubmit}
                onChange={handleChange}
                email={email.email}
                />
              :
              <p>Please check your email to reset your password</p>
            }

          </div>

        </div>
      </div>

      { msg.active && 
        <Toast 
          message={msg.data} 
          type={msg.type} 
          active={msg.active} 
          close={() => setMsg({active: false, type: null, data: null})} 
          />
      }

      </>
      :
      <Redirect to="/" />
      }
      </>
    );

}

export default ForgotPassword;
