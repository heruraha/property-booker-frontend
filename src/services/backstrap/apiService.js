import request from './request';
import { ENDPOINTS } from 'config';

const signIn = (username, password) => {
  return request({
    url: `${ENDPOINTS.SIGN_IN}`,
    method: 'POST',
    data: {
      username,
      password,
    },
  });
};

const signUp = (profile) => {
  return request({
    url: `${ENDPOINTS.SIGN_UP}`,
    method: 'POST',
    data: profile,
  });
};

const forgotPassword = (email) => {
  return request({
    url: `${ENDPOINTS.FORGOT_PASSWORD}`,
    method: 'POST',
    data: {
      email,
    },
  });
};

const resetPassword = (data) => {
  return request({
    url: `${ENDPOINTS.RESET_PASSWORD}`,
    method: 'POST',
    data: data,
  });
};

const checkToken = (token) => {
  return request({
    url: `${ENDPOINTS.CHECK_TOKEN}`,
    method: 'GET',
    headers: {
      cgo_api_key: token,
    },
  });
};

const getProfile = (token) => {
  return request({
    url: `${ENDPOINTS.GET_PROFILE}`,
    method: 'GET',
    headers: {
      cgo_api_key: token,
    },
  });
};

const getProfileById = (token, id) => {
  return request({
    url: `${ENDPOINTS.GET_USER_PROFILE}?user_id=${id}`,
    method: 'GET',
    headers: {
      cgo_api_key: token,
    },
  });
};

const getProfileDocument = (token, document_id) => {
  return request({
    url: `${ENDPOINTS.GET_PROFILE_DOCUMENT}`,
    method: 'GET',
    headers: {
      cgo_api_key: token,
    },
    data: {
      document_id,
    },
  });
};

const getProfileDocuments = (token, user_id) => {
  return request({
    url: `${ENDPOINTS.GET_PROFILE_DOCUMENT}`,
    method: 'GET',
    headers: {
      cgo_api_key: token,
    },
    data: {
      user_id,
    },
  });
};

const postProfileImage = (token, file) => {
  return request({
    url: `${ENDPOINTS.POST_PROFILE_IMAGE}`,
    method: 'POST',
    headers: {
      cgo_api_key: token,
      'Access-Control-Allow-Origin': '*', //todo: wait for backend fix
    },
    data: {
      file: file,
    },
  });
};

const patchProfile = (token, profile) => {
  return request({
    url: `${ENDPOINTS.PATCH_PROFILE}`,
    method: 'PATCH',
    headers: {
      cgo_api_key: token,
      'Access-Control-Allow-Origin': '*', //todo: wait for backend fix
    },
    data: profile,
  });
};

const getListing = (token, property_id) => {
  return request({
    url: `${ENDPOINTS.GET_LISTING}?property_id=${property_id}`,
    method: 'GET',
    headers: {
      cgo_api_key: token,
    },
  });
};

const postListing = (token, listing) => {
  return request({
    url: `${ENDPOINTS.POST_LISTING}`,
    method: 'POST',
    headers: {
      cgo_api_key: token,
      'Access-Control-Allow-Origin': '*', //todo: wait for backend fix
    },
    data: listing,
  });
};

const patchListing = (token, listing) => {
  return request({
    url: `${ENDPOINTS.PATCH_LISTING}`,
    method: 'PATCH',
    headers: {
      cgo_api_key: token,
      'Access-Control-Allow-Origin': '*', //todo: wait for backend fix
    },
    data: listing,
  });
};

const postListingPhoto = (token, body) => {
  return request({
    url: `${ENDPOINTS.POST_LISTING_PHOTO}`,
    method: 'POST',
    headers: {
      cgo_api_key: token,
      'Access-Control-Allow-Origin': '*', //todo: wait for backend fix
    },
    data: body,
  });
};

const deleteListingPhoto = (token, body) => {
  return request({
    url: `${ENDPOINTS.POST_LISTING_PHOTO}?photo_id=${body.photo_id}`,
    method: 'DELETE',
    headers: {
      cgo_api_key: token,
      'Access-Control-Allow-Origin': '*', //todo: wait for backend fix
    },
  });
};

const getProperties = (token) => {
  return request({
    url: `${ENDPOINTS.GET_PROPERTIES}`,
    method: 'GET',
    headers: {
      cgo_api_key: token,
    },
  });
};

const deleteDocument = (token, property_id) => {
  return request({
    url: `${ENDPOINTS.GET_LISTING}?property_id=${property_id}`,
    method: 'GET',
    headers: {
      cgo_api_key: token,
    },
  });
};

const getPropertyAttributes = (token, attr) => {
  return request({
    url: `${ENDPOINTS.GET_PROPERTY_ATTR}?attribute_type=${attr}`,
    method: 'GET',
    headers: {
      cgo_api_key: token,
    },
  });
};

const patchPropertyAttributes = (token, attr) => {
  return request({
    url: `${ENDPOINTS.PATCH_PROPERTY_ATTR}`,
    method: 'PATCH',
    headers: {
      cgo_api_key: token,
      'Access-Control-Allow-Origin': '*', //todo: wait for backend fix
    },
    data: attr,
  });
};

const postPropertyGeocode = (token, body) => {
  return request({
    url: `${ENDPOINTS.POST_PROPERTY_GEOJSON}`,
    method: 'POST',
    headers: {
      cgo_api_key: token,
    },
    data: body,
  });
};

const postNewLease = (token, body) => {
  return request({
    url: `${ENDPOINTS.POST_NEW_LEASE}`,
    method: 'POST',
    headers: {
      cgo_api_key: token,
    },
    data: body,
  });
};

const respondToLeaseRequest = (token, body) => {
  return request({
    url: `${ENDPOINTS.POST_LEASE_RESPONSE}`,
    method: 'POST',
    headers: {
      cgo_api_key: token,
    },
    data: body,
  });
};

const cancelLeaseRequest = (token, body) => {
  return request({
    url: `${ENDPOINTS.CANCEL_LEASE_RESPONSE}`,
    method: 'POST',
    headers: {
      cgo_api_key: token,
    },
    data: body,
  });
};

const getLeaseDetail = (token, lease_id) => {
  return request({
    url: `${ENDPOINTS.GET_LEASE_DETAIL}?lease_id=${lease_id}`,
    method: 'GET',
    headers: {
      cgo_api_key: token,
    },
  });
};

const getPriceEstimate = (token, body) => {
  return request({
    url: `${ENDPOINTS.POST_GET_PRICE_ESTIMATE}`,
    method: 'POST',
    headers: {
      cgo_api_key: token,
    },
    data: body,
  });
};

const getLessorLeases = (token) => {
  return request({
    url: `${ENDPOINTS.GET_LESSOR_LEASES}`,
    method: 'GET',
    headers: {
      cgo_api_key: token,
    },
  });
};

const getLesseeLeases = (token) => {
  return request({
    url: `${ENDPOINTS.GET_LESSEE_LEASES}`,
    method: 'GET',
    headers: {
      cgo_api_key: token,
    },
  });
};

const APIService = {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
  checkToken,
  getProfile,
  getProfileById,
  getProfileDocument,
  getProfileDocuments,
  patchProfile,
  postProfileImage,
  deleteListingPhoto,
  getListing,
  postListing,
  patchListing,
  postListingPhoto,
  getProperties,
  deleteDocument,
  getPropertyAttributes,
  patchPropertyAttributes,
  postPropertyGeocode,
  postNewLease,
  respondToLeaseRequest,
  cancelLeaseRequest,
  getLeaseDetail,
  getPriceEstimate,
  getLessorLeases,
  getLesseeLeases,
};

export default APIService;
