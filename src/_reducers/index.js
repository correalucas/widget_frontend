import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { userReducer } from './user.reducer';

const rootReducer = combineReducers({
  authentication,
  userReducer,
  alert
});

export default rootReducer;