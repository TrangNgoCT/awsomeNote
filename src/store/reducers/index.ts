import { AuthReducer } from './authReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: AuthReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };
