import {
  GetNotesSuccessPayload,
  NoteIdPayload,
  NotePayload,
  OnGetNotesPayload,
  SelectNotePayload,
} from '../../models';

enum NoteActionType {
  ON_GET_NOTES = 'ON_GET_NOTES',
  GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS',
  SELECT_NOTE = 'SELECT_NOTE',
  ON_UPDATE_NOTE = 'ON_UPDATE_NOTE',
  UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS',
  ON_DELETE_NOTE = 'ON_DELETE_NOTE',
  DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS',
  ON_ADD_NOTE = 'ON_ADD_NOTE',
  ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS',
}

export { NoteActionType };

export interface OnGetNotes {
  readonly type: NoteActionType.ON_GET_NOTES;
  payload: OnGetNotesPayload;
}

export interface GetNotesSuccess {
  readonly type: NoteActionType.GET_NOTES_SUCCESS;
  payload: GetNotesSuccessPayload;
}

export interface SelectNote {
  readonly type: NoteActionType.SELECT_NOTE;
  payload: SelectNotePayload;
}

export interface OnAddNote {
  readonly type: NoteActionType.ON_ADD_NOTE;
  payload: NotePayload;
}

export interface OnDeleteNote {
  readonly type: NoteActionType.ON_DELETE_NOTE;
  payload: NoteIdPayload;
}

export interface OnUpdateNote {
  readonly type: NoteActionType.ON_UPDATE_NOTE;
  payload: NotePayload;
}

export interface UpdateNoteSuccess {
  readonly type: NoteActionType.UPDATE_NOTE_SUCCESS;
  payload: NotePayload;
}

export type NoteAction =
  | OnGetNotes
  | GetNotesSuccess
  | SelectNote
  | OnAddNote
  | OnDeleteNote
  | OnUpdateNote
  | UpdateNoteSuccess;
