import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
  signup,
  changePassword,
  checkEmail,
  resetPassword,
  myProfile,
  update,
  show
};

function signup(params) {
  return dispatch => {
    dispatch(request({ params }));

    userService.signup(params)
      .then(
        user => {
          dispatch(success(user));
          dispatch(alertActions.success(user.message.toString()));
          history.push('/');
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) { return { type: userConstants.SIGNUP_REQUEST, user } }
  function success(user) { return { type: userConstants.SIGNUP_SUCCESS, user } }
  function failure(error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}

function changePassword(params) {
  return dispatch => {
    dispatch(request({ params }));

    userService.changePassword(params)
      .then(
        user => {
          dispatch(success(user));
          history.push('/');
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) { return { type: userConstants.CHANGE_PASSWORD_REQUEST, user } }
  function success(user) { return { type: userConstants.CHANGE_PASSWORD_SUCCESS, user } }
  function failure(error) { return { type: userConstants.CHANGE_PASSWORD_FAILURE, error } }
}

function checkEmail(params) {
  return dispatch => {
    dispatch(request({ params }));

    userService.checkEmail(params)
      .then(
        user => {
          dispatch(success(user));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) { return { type: userConstants.CHECK_EMAIL_REQUEST, user } }
  function success(user) { return { type: userConstants.CHECK_EMAIL_SUCCESS, user } }
  function failure(error) { return { type: userConstants.CHECK_EMAIL_FAILURE, error } }
}

function resetPassword(params) {
  return dispatch => {
    dispatch(request({ params }));

    userService.resetPassword(params)
      .then(
        user => {
          dispatch(success(user));
          dispatch(alertActions.success(user.message.toString()));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };
  function request(user) { return { type: userConstants.RESET_PASSWORD_REQUEST, user } }
  function success(user) { return { type: userConstants.RESET_PASSWORD_SUCCESS, user } }
  function failure(error) { return { type: userConstants.RESET_PASSWORD_FAILURE, error } }
}

function myProfile() {
  return dispatch => {
    userService.myProfile()
      .then(
        user => {
          dispatch(success(user));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  }
  function request(user) { return { type: userConstants.MY_PROFILE_REQUEST, user } }
  function success(user) { return { type: userConstants.MY_PROFILE_SUCCESS, user } }
  function failure(error) { return { type: userConstants.MY_PROFILE_FAILURE, error } }
}

function update(params) {
  return dispatch => {
    dispatch(request({ params }));

    userService.update(params)
      .then(
        user => {
          dispatch(success(user));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
  function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
  function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

function show(params) {
  return dispatch => {
    dispatch(request({ params }));

    userService.show(params)
      .then(
        user => {
          dispatch(success(user));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) { return { type: userConstants.SHOW_REQUEST, user } }
  function success(user) { return { type: userConstants.SHOW_SUCCESS, user } }
  function failure(error) { return { type: userConstants.SHOW_FAILURE, error } }
}