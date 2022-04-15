import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { watchAllGroupAction } from './groupSaga';
import { watchAllNoteAction } from './noteSaga';

export default function* rootSaga() {
  yield all([authSaga(), watchAllGroupAction(), watchAllNoteAction()]);
}
