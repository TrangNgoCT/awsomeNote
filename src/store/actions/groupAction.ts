import {
  GetGroupsPayload,
  GetGroupSuccessPayload,
  Group,
  GroupIdPayload,
  GroupPayload,
  OnGetGroupsPayload,
  SelectGroupPayload,
} from '../../models';

enum GroupActionType {
  ON_GET_GROUPS = 'ON_GET_GROUPS',
  GET_GROUPS_SUCCESS = 'GET_GROUPS_SUCCESS',
  SELECT_GROUP = 'SELECT_GROUP',
  ON_UPDATE_GROUP = 'ON_UPDATE_GROUP',
  UPDATE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS',
  ON_DELETE_GROUP = 'ON_DELETE_GROUP',
  DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS',
  ON_ADD_GROUP = 'ON_ADD_GROUP',
  ADD_GROUP_SUCCESS = 'ADD_GROUP_SUCCESS',
}

export { GroupActionType };

export interface OnGetGroups {
  readonly type: GroupActionType.ON_GET_GROUPS;
  payload: OnGetGroupsPayload;
}

export interface GetGroupsSuccess {
  readonly type: GroupActionType.GET_GROUPS_SUCCESS;
  payload: GetGroupSuccessPayload;
}

export interface SelectGroup {
  readonly type: GroupActionType.SELECT_GROUP;
  payload: SelectGroupPayload;
}

export interface OnAddGroup {
  readonly type: GroupActionType.ON_ADD_GROUP;
  payload: GroupPayload;
}

export interface AddGroupSuccess {
  readonly type: GroupActionType.ADD_GROUP_SUCCESS;
  payload: GetGroupsPayload;
}

export interface OnDeleteGroup {
  readonly type: GroupActionType.ON_DELETE_GROUP;
  payload: GroupIdPayload;
}

export interface DeleteGroupSuccess {
  readonly type: GroupActionType.DELETE_GROUP_SUCCESS;
  payload: GetGroupsPayload;
}

export interface OnUpdateGroup {
  readonly type: GroupActionType.ON_UPDATE_GROUP;
  payload: GroupPayload;
}

export interface UpdateGroupSuccess {
  readonly type: GroupActionType.UPDATE_GROUP_SUCCESS;
  payload: { group: Group };
}

export type GroupAction =
  | OnGetGroups
  | GetGroupsSuccess
  | SelectGroup
  | OnAddGroup
  | AddGroupSuccess
  | OnDeleteGroup
  | DeleteGroupSuccess
  | OnUpdateGroup
  | UpdateGroupSuccess;
