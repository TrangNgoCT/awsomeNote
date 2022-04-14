import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { watchAllGroupAction } from './groupSaga';

export default function* rootSaga() {
  yield all([authSaga(), watchAllGroupAction()]);
}
