import axios from 'axios';

import {
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER
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

// Set the profile state to loading
export const profileLoading = () => {
  return { type: PROFILE_LOADING };
};
