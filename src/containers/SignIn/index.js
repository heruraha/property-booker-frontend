import React, { useState, useEffect } from 'react';
import { CTX } from 'store';
import { Redirect } from 'react-router-dom';

import APIService from 'services/backstrap/apiService';
import Toast from 'components/Toast/Toast';
import Header from 'components/Header/Header';
import SignInForm from 'components/SignInForm/SignInForm';


const SignIn = (props) => {

    document.title = `Sign In - Trekker`;

    const [appState, dispatch] = React.useContext(CTX);

    const [signInState, setSignInState] = useState({
      email: '',
      password: '',
    })

    const handleSignInChange = e => setSignInState({ ...signInState, [e.target.name]: e.target.value})

    const handleFormSubmit = (e) => {
      e.preventDefault();
      dispatch({type: 'LOADING_ENABLED'})
      APIService.signIn(signInState.email, signInState.password)
      .then((res) => {
        dispatch({type: 'LOADING_DISABLED'})
        dispatch({type: 'SIGN_IN_SUCCESS', payload: res});
        localStorage.setItem('cgo_api_key', res.cgo_api_key);
        return res
      })
      .then((res) => {
        APIService.getProfile(res.cgo_api_key)
        .then(res => {
          dispatch({type: 'GET_PROFILE_DETAILS', payload: res})
          localStorage.setItem('profile', JSON.stringify(res));
          props.history.push('/');
        })
        .catch(err =>  { console.log(err, 'error getting profile'); props.history.push('/'); })
      })
      .catch((err) => { 
        err && err.data ? 
          setMsg({active: true, type: 'danger', data: err.data.message}) : 
          setMsg({active: true, type: 'danger', data: 'Error Signing In'})
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
      <div className="container full-center m-header">

        <div className="col-sm-6">

          <h3 className="mb-5">
            Log in to your account
          </h3>

          <div className="mt-3 d-flex flex-column justify-content-center">
            <SignInForm
              onSubmit={handleFormSubmit}
              onChange={handleSignInChange}
              email={signInState.email}
              password={signInState.password}
              forgotLink={() => props.history.push('/forgot-password')}
              signUpLink={() => props.history.push('/sign-up')}
              />
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

export default SignIn;
