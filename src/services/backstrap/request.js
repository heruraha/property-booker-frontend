import axios from 'axios'
import { API_URL } from 'config';

const client = axios.create({
  baseURL: API_URL()
});

const request = (options) => {
  const onSuccess = function(response) {
    console.debug('Request Successful!', response);
    return response.data;
  }

  const onError = (error) => {
    console.error('Request Failed:', error.config);

    if (error.response) {
      // request was made but server responded with something other than 2xx
      console.error('Status:',  error.response.status);
      console.error('Data:',    error.response.data);
      console.error('Headers:', error.response.headers);

    } else {
      // Something else happened while setting up the request
      console.error('Error Message:', error.message);
    }
    return Promise.reject(error.response || error.message);
  }

  return client(options)
            .then(onSuccess)
            .catch(onError);
}

export default request;