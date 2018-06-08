import axios from 'axios';

import {
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES
} from './types';

// Creates a profile for a user
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payloard: err.response.data
      })
    );
};

// Gets the current profile of the user logged in
export const getMyProfile = () => dispatch => {
  dispatch(profileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(profileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add a Supporter to a profile
export const addSupporter = supporterData => dispatch => {
  axios
    .post('/api/profile/pledge_supporter', supporterData)
    .then(res => dispatch(getMyProfile()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add a support occurance to a profile
export const addSupport = supportData => dispatch => {
  axios
    .post('/api/profile/support_occurance', supportData)
    .then(res => dispatch(getMyProfile()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set the profile state to loading
export const profileLoading = () => {
  return { type: PROFILE_LOADING };
};

// Clear the profile from the store
export const clearProfile = () => {
  return { type: CLEAR_CURRENT_PROFILE };
};
