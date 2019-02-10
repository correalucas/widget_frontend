import { userConstants } from '../_constants';

const initialState = {
  data: {},
  loading: false
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.MY_PROFILE_REQUEST:
      return {
        loading: true,
        data: action.user.user
      };
    case userConstants.MY_PROFILE_SUCCESS:
      return {
        loading: false,
        data: action.user.user
      };
    case userConstants.MY_PROFILE_FAILURE:
      return {};
    case userConstants.UPDATE_SUCCESS:
      return {
        updated: true,
        data: action.user.user
      };
    case userConstants.SHOW_SUCCESS:
    return {
        loading: false,
        data: action.user.user
      };
    default:
      return state
  }
}