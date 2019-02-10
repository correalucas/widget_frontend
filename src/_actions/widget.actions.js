import { widgetConstants } from '../_constants';
import { widgetService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const widgetActions = {
  widgets,
  visibles,
  myWidgets,
  userWidgets,
  create,
  update,
  destroy
};

function widgets() {
  return dispatch => {
    widgetService.widgets()
      .then(
        widget => {
          dispatch(success(widget));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  }
  function request(widget) { return { type: widgetConstants.WIDGETS_REQUEST, widget } }
  function success(widget) { return { type: widgetConstants.WIDGETS_SUCCESS, widget } }
  function failure(error) { return { type: widgetConstants.WIDGETS_FAILURE, error } }
}

function visibles(params) {
  return dispatch => {
    widgetService.visibles(params)
      .then(
        widget => {
          dispatch(success(widget));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  }
  function request(widget) { return { type: widgetConstants.VISIBLES_REQUEST, widget } }
  function success(widget) { return { type: widgetConstants.VISIBLES_SUCCESS, widget } }
  function failure(error) { return { type: widgetConstants.VISIBLES_FAILURE, error } }
}

function myWidgets(params) {
  return dispatch => {
    widgetService.myWidgets(params)
      .then(
        widget => {
          dispatch(success(widget));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  }
  function request(widget) { return { type: widgetConstants.MY_WIDGETS_REQUEST, widget } }
  function success(widget) { return { type: widgetConstants.MY_WIDGETS_SUCCESS, widget } }
  function failure(error) { return { type: widgetConstants.MY_WIDGETS_FAILURE, error } }
}

function userWidgets(id, params) {
  return dispatch => {
    dispatch(request({ params }));

    widgetService.userWidgets(id, params)
      .then(
        widget => {
          dispatch(success(widget));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(widget) { return { type: widgetConstants.SHOW_REQUEST, widget } }
  function success(widget) { return { type: widgetConstants.SHOW_SUCCESS, widget } }
  function failure(error) { return { type: widgetConstants.SHOW_FAILURE, error } }
}

function create(params) {
  return dispatch => {
    dispatch(request({ params }));

    widgetService.create(params)
      .then(
        widget => {
          dispatch(success(widget));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(widget) { return { type: widgetConstants.CREATE_REQUEST, widget } }
  function success(widget) { return { type: widgetConstants.CREATE_SUCCESS, widget } }
  function failure(error) { return { type: widgetConstants.CREATE_FAILURE, error } }
}

function update(id, params) {
  return dispatch => {
    dispatch(request({ params }));

    widgetService.update(id, params)
      .then(
        widget => {
          dispatch(success(widget));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(widget) { return { type: widgetConstants.UPDATE_REQUEST, widget } }
  function success(widget) { return { type: widgetConstants.UPDATE_SUCCESS, widget } }
  function failure(error) { return { type: widgetConstants.UPDATE_FAILURE, error } }
}

function destroy(params) {
  return dispatch => {
    dispatch(request({ params }));

    widgetService.destroy(params)
      .then(
        widget => {
          dispatch(success(widget));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(widget) { return { type: widgetConstants.DELETE_REQUEST, widget } }
  function success(widget) { return { type: widgetConstants.DELETE_SUCCESS, widget } }
  function failure(error) { return { type: widgetConstants.DELETE_FAILURE, error } }
}