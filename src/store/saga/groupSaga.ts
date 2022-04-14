import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { all, debounce, put, select, takeEvery } from 'redux-saga/effects';
import { fireStore } from '../../api';
import { GetGroupsReturn, GetGroupSuccessPayload, Group } from '../../models';
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
    if (result.groups) {
      yield put(
        getGroupsSuccess({
          groups: result.groups,
          lastGroupVisible: result.lastGroupVisible,
          isReload: true,
          totalGroup,
        })
      );
    }
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
  const result: GetGroupSuccessPayload = yield fireStore.getGroups();
  yield put(getGroupsSuccess({ ...result, isReload: true }));
}

function* handleAddGroup(action: OnAddGroup) {
  yield fireStore.addGroupNote(action.payload.group);
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
  yield all([
    debounce(1000, GroupActionType.ON_GET_GROUPS, handleGetGroups), // ??
    takeEvery(GroupActionType.ON_ADD_GROUP, handleAddGroup),
    takeEvery(GroupActionType.ON_DELETE_GROUP, handleDeleteGroup),
    takeEvery(GroupActionType.ON_UPDATE_GROUP, handleUpdateGroup),
    takeEvery(AuthActionType.ON_LOGIN_SUCCESS, handleLoadData),
  ]);
}
