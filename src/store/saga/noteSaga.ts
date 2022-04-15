import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { put, select, takeEvery, takeLeading } from 'redux-saga/effects';
import { ApplicationState } from '..';
import { fireStore } from '../../api';
import { GetNotesReturn, GetNotesSuccessPayload, Note } from '../../models';
import { getNotesSuccess, onGetNotes, updateNoteSuccess } from '../actionCreators';
import {
  GroupActionType,
  NoteActionType,
  OnAddNote,
  OnDeleteNote,
  OnGetNotes,
  OnUpdateNote,
} from '../actions';

function* handleLoadData() {
  yield put(onGetNotes({ isReload: true }));
}

function* handleGetNotes(action: OnGetNotes) {
  const groupId: string | undefined = yield select(
    (state: ApplicationState) => state.group.selectedGroup?.id
  );
  if (action.payload.isReload) {
    // reload is true: get all
    const result: GetNotesReturn = yield fireStore.getNotes(groupId ?? '');
    const totalNote: number = yield fireStore.getTotalNotes(groupId ?? '');
    yield put(
      getNotesSuccess({
        notes: result.notes,
        lastNoteVisible: result.lastNoteVisible,
        isReload: true,
        totalNote,
      })
    );
  } else {
    const lastNoteVisible:
      | FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
      | undefined = yield select((state: ApplicationState) => state.note.lastNoteVisible);
    const result: GetNotesReturn = yield fireStore.getNotes(
      groupId ?? '',
      lastNoteVisible
    );
    yield put(
      getNotesSuccess({
        notes: result.notes,
        lastNoteVisible: result.lastNoteVisible,
        isReload: false,
        totalNote: 0,
      })
    );
  }
}

function* reloadNotes(groupId: string) {
  const result: GetNotesSuccessPayload = yield fireStore.getNotes(groupId ?? '');
  yield put(getNotesSuccess({ ...result, isReload: true }));
}

function* handleAddNote(action: OnAddNote) {
  yield fireStore.addNote(action.payload.note, action.payload.groupId);
  yield reloadNotes(action.payload.groupId);
}

function* handleDeleteNote(action: OnDeleteNote) {
  yield fireStore.deleteNote(action.payload.noteId, action.payload.groupId);
  yield reloadNotes(action.payload.groupId);
}

function* handleUpdateNote(action: OnUpdateNote) {
  const updatedNote: Note = yield fireStore.updateNote(
    action.payload.note,
    action.payload.groupId
  );
  yield put(updateNoteSuccess({ note: updatedNote, groupId: action.payload.groupId }));
}

export function* watchAllNoteAction() {
  yield takeEvery(GroupActionType.SELECT_GROUP, handleLoadData);
  yield takeLeading(NoteActionType.ON_GET_NOTES, handleGetNotes);
  yield takeEvery(NoteActionType.ON_ADD_NOTE, handleAddNote);
  yield takeEvery(NoteActionType.ON_DELETE_NOTE, handleDeleteNote);
  yield takeEvery(NoteActionType.ON_UPDATE_NOTE, handleUpdateNote);
}
