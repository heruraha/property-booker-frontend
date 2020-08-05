import React, { useState } from 'react';
import { CTX } from 'store';
import { Redirect } from 'react-router-dom';

import APIService from 'services/backstrap/apiService';
import Toast from 'components/Toast/Toast';
import Header from 'components/Header/Header';
import SignUpForm from 'components/SignUpForm/SignUpForm';


const SignUp = (props) => {

    document.title = `Sign Up - Trekker`;

    const [appState, dispatch] = React.useContext(CTX);

    const [signUpState, setSignUpState] = useState({
      first: '',
      last: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    const handleSignUpChange = e => setSignUpState({ ...signUpState, [e.target.name]: e.target.value}) 
    const handleFormSubmit = e => {
      e.preventDefault();
      dispatch({type: 'LOADING_ENABLED'})
      const data = {
        email: signUpState.email,
        password: signUpState.password,
        first: signUpState.first,
        last: signUpState.last
      }
      APIService.signUp(data)
      .then(() => {
        dispatch({type: 'LOADING_DISABLED'})
        APIService.signIn(signUpState.email, signUpState.password)
        .then((res) => {
          console.log(res, 'res')
          dispatch({type: 'LOADING_DISABLED'})
          dispatch({type: 'SIGN_IN_SUCCESS', payload: res});
          dispatch({type: 'GET_PROFILE_DETAILS', payload: res})
          localStorage.setItem('cgo_api_key', res.cgo_api_key);
          localStorage.setItem('profile', JSON.stringify(res));
        })
        .then(() => props.history.push('/profile/edit'))
        .catch((err) => { 
          err && err.data ? 
          setMsg({active: true, type: 'danger', data: err.data.message}) : 
          setMsg({active: true, type: 'danger', data: 'Error Signing In'})
          dispatch({type: 'LOADING_DISABLED'})
        })
      })
      .catch((err) => { 
        err && err.data ? 
        setMsg({active: true, type: 'danger', data: err.data.message}) : 
        setMsg({active: true, type: 'danger', data: 'Error Signing Up'})
        dispatch({type: 'LOADING_DISABLED'})
      })  
    }

    const [msg, setMsg] = React.useState({active: false, type: null, data: null})
    
    //useEffect(() => dispatch({type: 'LOADING_DISABLED'}), [])

    return (
      <>
      {!appState.isAuthenticated ?
        <>
        <Header props={props} />
        <div className="container full-center m-header">

          <div className="col-sm-6">
            <h3 className="mb-5">
              Create an Account 
            </h3>
            <div className="mt-3 d-flex flex-column justify-content-center">
              <SignUpForm
                onSubmit={handleFormSubmit}
                onChange={handleSignUpChange}
                first={signUpState.first}
                last={signUpState.last}
                email={signUpState.email}
                password={signUpState.password}
                confirmPassword={signUpState.confirmPassword}
                logInLink={() => props.history.push('/sign-in')}
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

export default SignUp;
