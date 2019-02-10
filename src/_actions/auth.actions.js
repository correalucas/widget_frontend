import { authConstants } from '../_constants';
import { authService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const authActions = {
  login,
  logout,
  refresh
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    authService.login(username, password)
      .then(
        auth => {
          dispatch(success(auth));
          history.push('/');
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(auth) { return { type: authConstants.LOGIN_REQUEST, auth } }
  function success(auth) { return { type: authConstants.LOGIN_SUCCESS, auth } }
  function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

function refresh() {
  return dispatch => {

    authService.refresh()
      .then(
        auth => {
          dispatch(success(auth));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(auth) { return { type: authConstants.REFRESH_LOGIN_REQUEST, auth } }
  function success(auth) { return { type: authConstants.REFRESH_LOGIN_SUCCESS, auth } }
  function failure(error) { return { type: authConstants.REFRESH_LOGIN_FAILURE, error } }
}

function logout() {
  authService.logout()
    .then(resp => {
      history.push('/');
    }
  );
  return { type: authConstants.LOGOUT };
}