import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Note } from '../../models';
import { NoteAction, NoteActionType } from '../actions';

type NoteState = {
  loadingAll: boolean;
  loadingPartial: boolean;
  totalNotes: number;
  notes: Note[];
  selectedNote?: Note;
  lastNoteVisible?: FirebaseFirestoreTypes.QueryDocumentSnapshot;
};

const initialState: NoteState = {
  loadingAll: true,
  loadingPartial: false,
  totalNotes: 0,
  notes: [],
  selectedNote: undefined,
  lastNoteVisible: undefined,
};

const NoteReducer = (state = initialState, action: NoteAction): NoteState => {
  switch (action.type) {
    case NoteActionType.ON_GET_NOTES:
      if (action.payload.isReload) {
        return {
          ...state,
          loadingAll: true,
        };
      }
      return {
        ...state,
        loadingPartial: true,
      };
    case NoteActionType.GET_NOTES_SUCCESS:
      if (action.payload.isReload) {
        return {
          ...initialState,
          loadingAll: false,
          notes: action.payload.notes,
          lastNoteVisible: action.payload.lastNoteVisible,
          totalNotes: action.payload.totalNote,
        };
      }
      if (action.payload.notes.length > 0 && action.payload.lastNoteVisible) {
        const newNotes = [...action.payload.notes, ...state.notes];
        return {
          ...state,
          loadingAll: false,
          loadingPartial: false,
          notes: newNotes,
          lastNoteVisible: action.payload.lastNoteVisible,
        };
      }
      return {
        ...state,
        loadingAll: false,
        loadingPartial: false,
      };
    case NoteActionType.SELECT_NOTE:
      return {
        ...state,
        selectedNote: action.payload.note,
      };
    case NoteActionType.ON_ADD_NOTE:
    case NoteActionType.ON_DELETE_NOTE:
      return {
        ...initialState,
        loadingAll: true,
      };
    case NoteActionType.ON_UPDATE_NOTE:
      return {
        ...state,
        loadingAll: true,
        selectedNote: undefined,
      };
    case NoteActionType.UPDATE_NOTE_SUCCESS: {
      const newNotes = state.notes.map((note) => {
        if (note.id === action.payload.note.id) {
          return action.payload.note;
        }
        return note;
      });
      return {
        ...state,
        notes: newNotes,
        selectedNote: action.payload.note,
        loadingAll: false,
      };
    }
    default:
      return state;
  }
};

export { NoteReducer };
