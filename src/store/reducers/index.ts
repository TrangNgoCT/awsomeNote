import { AuthReducer } from './authReducer';
import { combineReducers } from 'redux';
import { GroupReducer } from './groupReducer';
import { NoteReducer } from './noteReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  group: GroupReducer,
  note: NoteReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };
