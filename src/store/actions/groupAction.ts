import {
  GetGroupsSuccessPayload,
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
  ON_ADD_GROUP = 'ON_ADD_GROUP',
}

export { GroupActionType };

export interface OnGetGroups {
  readonly type: GroupActionType.ON_GET_GROUPS;
  payload: OnGetGroupsPayload;
}

export interface GetGroupsSuccess {
  readonly type: GroupActionType.GET_GROUPS_SUCCESS;
  payload: GetGroupsSuccessPayload;
}

export interface SelectGroup {
  readonly type: GroupActionType.SELECT_GROUP;
  payload: SelectGroupPayload;
}

export interface OnAddGroup {
  readonly type: GroupActionType.ON_ADD_GROUP;
  payload: GroupPayload;
}

export interface OnDeleteGroup {
  readonly type: GroupActionType.ON_DELETE_GROUP;
  payload: GroupIdPayload;
}

export interface OnUpdateGroup {
  readonly type: GroupActionType.ON_UPDATE_GROUP;
  payload: GroupPayload;
}

export interface UpdateGroupSuccess {
  readonly type: GroupActionType.UPDATE_GROUP_SUCCESS;
  payload: GroupPayload;
}

export type GroupAction =
  | OnGetGroups
  | GetGroupsSuccess
  | SelectGroup
  | OnAddGroup
  | OnDeleteGroup
  | OnUpdateGroup
  | UpdateGroupSuccess;
