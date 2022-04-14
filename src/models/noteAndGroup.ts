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

interface GetGroupSuccessPayload {
  groups: Group[];
  lastGroupVisible?: FirebaseFirestoreTypes.QueryDocumentSnapshot;
  isReload: boolean;
  totalGroup: number;
}

interface GroupPayload {
  group: Group;
}

interface SelectGroupPayload {
  group?: Group;
}

interface GetGroupsPayload {
  groups: Group[];
}

interface GroupIdPayload {
  groupId: string;
}

interface GetGroupsReturn {
  groups: Group[];
  lastGroupVisible?: FirebaseFirestoreTypes.QueryDocumentSnapshot;
}

export type {
  OnGetGroupsPayload,
  GroupIdPayload,
  GroupPayload,
  SelectGroupPayload,
  GetGroupsPayload,
  Group,
  Note,
  GetGroupSuccessPayload,
  GetGroupsReturn,
};
