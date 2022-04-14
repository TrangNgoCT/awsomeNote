import { AuthReducer } from './authReducer';
import { combineReducers } from 'redux';
import { GroupReducer } from './groupReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  group: GroupReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };
