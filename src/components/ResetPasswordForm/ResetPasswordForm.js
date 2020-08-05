import React from 'react';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';

import {validateField} from 'services/util';

const ResetPasswordForm = (props) => {
    return (
      <form onSubmit={props.onSubmit}>
        <TextInput
          className="mb-3"
          id="token"
          placeholder="token"
          onChange={props.onChange}
          value={props.token}
          disabled={true}
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
          autoFocus={true}
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
          disabled={props.password !== '' ? false : true}
          label="Reset Password" 
        />

      </form>
    )
}

export default ResetPasswordForm