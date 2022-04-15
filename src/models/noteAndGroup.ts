import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

interface Note {
  id?: string;
  title: string;
  desc: string;
  image: string;
  createAt?: FirebaseFirestoreTypes.Timestamp;
}

interface Group {
  id?: string;
  title: string;
  desc: string;
  createAt?: FirebaseFirestoreTypes.Timestamp;
}

interface OnGetGroupsPayload {
  isReload: boolean;
}

interface OnGetNotesPayload {
  isReload: boolean;
}

interface GetGroupsSuccessPayload {
  groups: Group[];
  lastGroupVisible?: FirebaseFirestoreTypes.QueryDocumentSnapshot;
  isReload: boolean;
  totalGroup: number;
}

interface GetNotesSuccessPayload {
  notes: Note[];
  lastNoteVisible?: FirebaseFirestoreTypes.QueryDocumentSnapshot;
  isReload: boolean;
  totalNote: number;
}

interface GroupPayload {
  group: Group;
}

interface NotePayload {
  note: Note;
  groupId: string;
}

interface SelectGroupPayload {
  group?: Group;
}

interface SelectNotePayload {
  note?: Note;
}

interface GroupIdPayload {
  groupId: string;
}

interface NoteIdPayload {
  noteId: string;
  groupId: string;
}

// this is for saga return type
interface GetGroupsReturn {
  groups: Group[];
  lastGroupVisible?: FirebaseFirestoreTypes.QueryDocumentSnapshot;
}

interface GetNotesReturn {
  notes: Note[];
  lastNoteVisible?: FirebaseFirestoreTypes.QueryDocumentSnapshot;
}

export type {
  Group,
  Note,
  OnGetGroupsPayload,
  OnGetNotesPayload,
  GetGroupsSuccessPayload,
  GetNotesSuccessPayload,
  GroupPayload,
  NotePayload,
  GroupIdPayload,
  NoteIdPayload,
  SelectGroupPayload,
  SelectNotePayload,
  GetGroupsReturn,
  GetNotesReturn,
};
