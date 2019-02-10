import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { userReducer } from './user.reducer';
import { widgetReducer } from './widget.reducer';

const rootReducer = combineReducers({
  authentication,
  userReducer,
  widgetReducer,
  alert
});

export default rootReducer;