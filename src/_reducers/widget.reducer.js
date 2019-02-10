import { widgetConstants } from '../_constants';

const initialState = {
  data: [],
  loading: false
};

export function widgetReducer(state = initialState, action) {
  switch (action.type) {
    case widgetConstants.VISIBLES_REQUEST:
      return {
        loading: true,
        data: []
      };
    case widgetConstants.VISIBLES_SUCCESS:
      return {
        loading: false,
        data: action.widget.widgets
      };
    case widgetConstants.VISIBLES_FAILURE:
      return {};
    case widgetConstants.MY_WIDGETS_SUCCESS:
      return {
        loading: false,
        data: action.widget.widgets
      };
    case widgetConstants.SHOW_SUCCESS:
      return {
        loading: false,
        data: action.widget.widgets
      };
    case widgetConstants.CREATE_SUCCESS:
      return {
        created: true,
        data: action.widget
      };
    case widgetConstants.UPDATE_SUCCESS:
      return {
        updated: true,
        data: action.widget
      };
    default:
      return state
  }
}