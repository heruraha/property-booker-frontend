import React from 'react';
import './SignInForm.scss';

import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';

import {validateField} from 'services/util';

const SignInForm = (props) => {
    return (
      <form onSubmit={props.onSubmit}>

        <TextInput
          className="mb-3"
          type="email"
          autoFocus={true}
          id="email"
          placeholder="Email Address"
          onChange={props.onChange}
          value={props.email}
          hasError={validateField('email', props.email)}
          errorMessage={'Please enter a valid email'}
        />

        <TextInput
          className="mb-3"
          type="password"
          id="password"
          placeholder="Password"
          onChange={props.onChange}
          value={props.password}
          //hasError={validateField('password', props.password)}
          errorMessage={'Password field must have a minimum of 4 characters'}
        />

        {  props.forgotLink &&
          <div className="text-right mb-3">
              <span className="btn-link" onClick={props.forgotLink}>Forgot password?</span>
          </div>
        }

        <Button
          type="submit"
          variant="primary"
          block={true}
          size="lg"
          disabled={props.email !== '' && props.password !== '' ? false : true}
          label="Log In" 
        />

        <div className="separator my-4 text-center">
            <span>or</span>
        </div>

        <Button
          variant="outline-primary"
          block={true}
          size="lg"
          label="Sign Up"
          onClick={props.signUpLink && props.signUpLink}
        />

      </form>
    )
}

export default SignInForm