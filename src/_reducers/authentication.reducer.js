import { authConstants } from '../_constants';

let auth = localStorage.getItem('auth') != 'undefined' ? JSON.parse(localStorage.getItem('auth')) : null;
const initialState = auth ? { loggedIn: true, auth } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        auth: action.auth
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        auth: action.auth
      };
    case authConstants.LOGIN_FAILURE:
      return {};
    case authConstants.LOGOUT:
      return {};
    default:
      return state
  }
}