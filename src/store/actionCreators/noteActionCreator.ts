import {
  GetNotesSuccessPayload,
  NoteIdPayload,
  NotePayload,
  OnGetNotesPayload,
  SelectNotePayload,
} from '../../models';
import { NoteAction, NoteActionType } from '../actions';

export const onGetNotes = ({ isReload = false }: OnGetNotesPayload): NoteAction => {
  return {
    type: NoteActionType.ON_GET_NOTES,
    payload: {
      isReload,
    },
  };
};

export const getNotesSuccess = ({
  notes,
  lastNoteVisible,
  isReload = false,
  totalNote,
}: GetNotesSuccessPayload): NoteAction => {
  return {
    type: NoteActionType.GET_NOTES_SUCCESS,
    payload: {
      notes,
      lastNoteVisible,
      isReload,
      totalNote,
    },
  };
};

export const selectNote = (payload: SelectNotePayload): NoteAction => {
  return {
    type: NoteActionType.SELECT_NOTE,
    payload,
  };
};

export const onAddNote = (payload: NotePayload): NoteAction => {
  return {
    type: NoteActionType.ON_ADD_NOTE,
    payload,
  };
};

export const onDeleteNote = (payload: NoteIdPayload): NoteAction => {
  return {
    type: NoteActionType.ON_DELETE_NOTE,
    payload,
  };
};

export const onUpdateNote = (payload: NotePayload): NoteAction => {
  return {
    type: NoteActionType.ON_UPDATE_NOTE,
    payload,
  };
};

export const updateNoteSuccess = (payload: NotePayload): NoteAction => {
  return {
    type: NoteActionType.UPDATE_NOTE_SUCCESS,
    payload,
  };
};
