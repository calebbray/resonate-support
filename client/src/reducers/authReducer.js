import { SET_CURRENT_USER, SET_ADMIN_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        isAdmin: false,
        user: action.payload
      };
    case SET_ADMIN_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        isAdmin: true,
        user: action.payload
      };
    default:
      return state;
  }
}
