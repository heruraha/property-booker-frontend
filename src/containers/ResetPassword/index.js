import React, { useState, useEffect } from 'react';
import * as QueryString from 'query-string';
import { CTX } from 'store';
import { Redirect } from 'react-router-dom';

import APIService from 'services/backstrap/apiService';
import Toast from 'components/Toast/Toast';
import Header from 'components/Header/Header';
import ResetPasswordForm from 'components/ResetPasswordForm/ResetPasswordForm';



const ResetPassword = (props) => {

    document.title = `Forgot Password - Trekker`;

    const [appState, dispatch] = React.useContext(CTX);
    const params = QueryString.parse(props.location.search);

    const [state, setState] = useState({token: '', password: '', confirmPassword: ''})

    const handleChange = e => setState({ ...state, [e.target.name]: e.target.value})

    const handleFormSubmit = (e) => {
      e.preventDefault();
      dispatch({type: 'LOADING_ENABLED'})
      const body = {
        token: state.token,
        password: state.password,
      }
      APIService.resetPassword(body)
      .then((res) => {
        console.log(res, 'reset password')
        dispatch({type: 'LOADING_DISABLED'})
        setMsg({active: true, type: 'info', data: 'Success updating password! Redirecting...'})
        setTimeout(() => props.history.push('/'), 1000)
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
      if(params && params.token) {
        setState({...state, token: params.token})
      }
    }, [])

    return (
      <>
      {!appState.isAuthenticated ?
      <>
      <Header props={props} />
      <div className="container full-center">

        <div className="col-sm-6">

          <h3 className="mb-5">
            Reset Password
          </h3>

          <div className="mt-3 d-flex flex-column justify-content-center">
            { state.token ? 
              <ResetPasswordForm
                onSubmit={handleFormSubmit}
                onChange={handleChange}
                password={state.password}
                confirmPassword={state.confirmPassword}
                token={state.token}
                />
              :
              <p>Invalid token. Please make sure you have a valid link</p>
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

export default ResetPassword;
