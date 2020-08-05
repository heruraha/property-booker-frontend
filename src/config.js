const environment = process.env.ENVIRONMENT;

export const API_URL = () => {
  switch (environment) {
    case 'dev':
      return 'http://localhost:3000';
    case 'staging':
      return 'http://trekker-dev-api.us-east-1.elasticbeanstalk.com';
    case 'production':
      return 'https://production-dev.link';
    default:
      throw Error('no environment specified');
  }
};

export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const ENDPOINTS = {
  SIGN_IN: '/common/accounts/signIn/1.0.0',
  SIGN_UP: '/api/accounts/sign_up/1.0.0',
  FORGOT_PASSWORD: '/common/accounts/forgotPassword/1.0.0',
  RESET_PASSWORD: '/common/accounts/resetPassword/1.0.0',
  CHECK_TOKEN: '/common/accounts/checkToken/1.0.0',
  GET_PROFILE: '/api/accounts/profile/1.0.0',
  GET_USER_PROFILE: '/api/accounts/user_profile/1.0.0',
  GET_PROFILE_DOCUMENT: '/api/accounts/profile_document/1.0.0',
  GET_PROFILE_DOCUMENTS: '/api/accounts/profile_documents/1.0.0',
  POST_PROFILE_IMAGE: '/api/accounts/profile_image/1.0.0',
  POST_PROFILE_DOCUMENT: '/api/accounts/profile_document/1.0.0',
  DELETE_PROFILE_DOCUMENT: '/api/accounts/profile_document/1.0.0',
  PATCH_PROFILE: '/api/accounts/profile/1.0.0',
  GET_LISTING: '/api/property/listing/1.0.0',
  POST_LISTING: '/api/property/listing/1.0.0',
  PATCH_LISTING: '/api/property/listing/1.0.0',
  PATCH_LISTING_ATTR: '/api/property/attributes/1.0.0',
  SEARCH_LISTINGS: '/api/property/search/1.0.0',
  POST_LISTING_PHOTO: '/api/property/photo/1.0.0',
  GET_PROPERTIES: '/api/accounts/properties/1.0.0',
  GET_PROPERTY_ATTR: '/api/property/attributes/1.0.0',
  PATCH_PROPERTY_ATTR: '/api/property/attributes/1.0.0',
  POST_PROPERTY_GEOJSON: '/api/property/geojson/1.0.0',
  POST_NEW_LEASE: '/api/lease/new/1.0.0',
  GET_LEASE_DETAIL: '/api/lease/lease_detail/1.0.0',
  POST_LEASE_RESPONSE: '/api/lease/request_response/1.0.0',
  CANCEL_LEASE_RESPONSE: '/api/lease/cancel_request/1.0.0',
  POST_GET_PRICE_ESTIMATE: '/api/lease/price_estimate/1.0.0',
  GET_LESSOR_LEASES: '/api/accounts/lessor_leases/1.0.0',
  GET_LESSEE_LEASES: '/api/accounts/lessee_leases/1.0.0',
};
