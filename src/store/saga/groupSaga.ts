import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { put, select, takeEvery, takeLeading } from 'redux-saga/effects';
import { fireStore } from '../../api';
import { GetGroupsReturn, GetGroupsSuccessPayload, Group } from '../../models';
import { getGroupsSuccess, onGetGroups, updateGroupSuccess } from '../actionCreators';
import {
  AuthActionType,
  GroupActionType,
  OnAddGroup,
  OnDeleteGroup,
  OnGetGroups,
  OnUpdateGroup,
} from '../actions';
import { ApplicationState } from '../reducers';

function* handleGetGroups(action: OnGetGroups) {
  if (action.payload.isReload) {
    // reload is true: get all
    const result: GetGroupsReturn = yield fireStore.getGroups();
    const totalGroup: number = yield fireStore.getTotalGroups();
    yield put(
      getGroupsSuccess({
        groups: result.groups,
        lastGroupVisible: result.lastGroupVisible,
        isReload: true,
        totalGroup,
      })
    );
  } else {
    const lastGroupVisible:
      | FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
      | undefined = yield select(
      (state: ApplicationState) => state.group.lastGroupVisible
    );
    const result: GetGroupsReturn = yield fireStore.getGroups(lastGroupVisible);
    yield put(
      getGroupsSuccess({
        groups: result.groups,
        lastGroupVisible: result.lastGroupVisible,
        isReload: false,
        totalGroup: 0,
      })
    );
  }
}

function* reloadGroups() {
  const result: GetGroupsSuccessPayload = yield fireStore.getGroups();
  yield put(getGroupsSuccess({ ...result, isReload: true }));
}

function* handleAddGroup(action: OnAddGroup) {
  yield fireStore.addGroup(action.payload.group);
  yield reloadGroups();
}

function* handleDeleteGroup(action: OnDeleteGroup) {
  yield fireStore.deleteGroup(action.payload.groupId);
  yield reloadGroups();
}

function* handleUpdateGroup(action: OnUpdateGroup) {
  const updatedGroup: Group = yield fireStore.updateGroup(action.payload.group);
  yield put(updateGroupSuccess({ group: updatedGroup }));
}

function* handleLoadData() {
  yield put(onGetGroups({ isReload: true }));
}

export function* watchAllGroupAction() {
  yield takeLeading(GroupActionType.ON_GET_GROUPS, handleGetGroups);
  yield takeEvery(GroupActionType.ON_ADD_GROUP, handleAddGroup);
  yield takeEvery(GroupActionType.ON_DELETE_GROUP, handleDeleteGroup);
  yield takeEvery(GroupActionType.ON_UPDATE_GROUP, handleUpdateGroup);
  yield takeEvery(AuthActionType.ON_LOGIN_SUCCESS, handleLoadData);
}
