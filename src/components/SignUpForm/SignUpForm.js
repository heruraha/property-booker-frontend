import React from 'react';
import './SignUpForm.scss';

import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';

import {validateField} from 'services/util';

const SignUpForm = (props) => {
    return (
      <form onSubmit={props.onSubmit}>

        <div className="row">
          <TextInput
            className="mb-3 col-sm-6"
            id="first"
            placeholder="First Name"
            onChange={props.onChange}
            value={props.first}
            autoFocus={true}
          />
          <TextInput
            className="mb-3 col-sm-6"
            id="last"
            placeholder="Last Name"
            onChange={props.onChange}
            value={props.last}
          />
        </div>

        <TextInput
          className="mb-3"
          type="email"
          id="email"
          placeholder="Email"
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
          hasError={validateField('password', props.password)}
          errorMessage={'Password field must have a minimum of 4 characters'}
        />

        <TextInput
          className="mb-3"
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={props.onChange}
          value={props.confirmPassword}
          hasError={validateField('confirmPassword', [props.password, props.confirmPassword])}
          errorMessage={'Make sure your passwords match'}
        />

        <Button
          type="submit"
          variant="primary"
          block={true}
          size="lg"
          disabled={props.password && props.confirmPassword && props.email ? false : true}
          label="Sign Up" 
        />

        {  props.logInLink &&
          <div className="text-center text-muted mt-4">
              Already have an account? <span className="btn-link" onClick={props.logInLink}>Log In</span>
          </div>
        }


      </form>
    )
}

export default SignUpForm