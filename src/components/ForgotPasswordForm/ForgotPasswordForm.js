import React from 'react';
import './ForgotPasswordForm.scss';

import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';

import {validateField} from 'services/util';

const ForgotPasswordForm = (props) => {
    return (
      <form onSubmit={props.onSubmit}>

        <TextInput
          className="mb-3"
          type="email"
          autoFocus={true}
          id="email"
          placeholder="Your Email Address"
          onChange={props.onChange}
          value={props.email}
          hasError={validateField('email', props.email)}
          errorMessage={'Please enter a valid email'}
        />

        <Button
          type="submit"
          variant="primary"
          block={true}
          size="lg"
          disabled={props.email !== '' ? false : true}
          label="Send Reset Link" 
        />

      </form>
    )
}

export default ForgotPasswordForm