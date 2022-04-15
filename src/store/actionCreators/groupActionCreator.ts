import {
  GetGroupsSuccessPayload,
  GroupIdPayload,
  GroupPayload,
  OnGetGroupsPayload,
  SelectGroupPayload,
} from '../../models';
import { GroupAction, GroupActionType } from '../actions';

export const onGetGroups = ({ isReload = false }: OnGetGroupsPayload): GroupAction => {
  return {
    type: GroupActionType.ON_GET_GROUPS,
    payload: {
      isReload,
    },
  };
};

export const getGroupsSuccess = ({
  groups,
  lastGroupVisible,
  isReload = false,
  totalGroup,
}: GetGroupsSuccessPayload): GroupAction => {
  return {
    type: GroupActionType.GET_GROUPS_SUCCESS,
    payload: {
      groups,
      lastGroupVisible,
      isReload,
      totalGroup,
    },
  };
};

export const selectGroup = (payload: SelectGroupPayload): GroupAction => {
  return {
    type: GroupActionType.SELECT_GROUP,
    payload,
  };
};

export const onAddGroup = (payload: GroupPayload): GroupAction => {
  return {
    type: GroupActionType.ON_ADD_GROUP,
    payload,
  };
};

export const onDeleteGroup = (payload: GroupIdPayload): GroupAction => {
  return {
    type: GroupActionType.ON_DELETE_GROUP,
    payload,
  };
};

export const onUpdateGroup = (payload: GroupPayload): GroupAction => {
  return {
    type: GroupActionType.ON_UPDATE_GROUP,
    payload,
  };
};

export const updateGroupSuccess = (payload: GroupPayload): GroupAction => {
  return {
    type: GroupActionType.UPDATE_GROUP_SUCCESS,
    payload,
  };
};
