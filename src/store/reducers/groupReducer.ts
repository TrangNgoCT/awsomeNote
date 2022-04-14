import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Group } from '../../models';
import { GroupAction, GroupActionType } from '../actions';

type GroupState = {
  loadingAll: boolean;
  loadingPartial: boolean;
  totalGroups: number;
  groups: Group[];
  selectedGroup?: Group;
  lastGroupVisible?: FirebaseFirestoreTypes.QueryDocumentSnapshot;
};

const initialState = {
  loadingAll: false,
  loadingPartial: false,
  selectedGroup: undefined,
  totalGroups: 0,
  groups: [],
  lastGroupVisible: undefined,
};

const GroupReducer = (
  state: GroupState = initialState,
  action: GroupAction
): GroupState => {
  switch (action.type) {
    case GroupActionType.ON_GET_GROUPS:
      if (action.payload.isReload) {
        // mean reload all: get groups: page: 1
        return {
          ...state,
          loadingAll: true,
        };
      }
      // get next page

      return {
        ...state,
        loadingPartial: true,
      };
    case GroupActionType.GET_GROUPS_SUCCESS: {
      if (action.payload.isReload) {
        return {
          ...initialState,
          groups: action.payload.groups,
          lastGroupVisible: action.payload.lastGroupVisible,
          totalGroups: action.payload.totalGroup,
        };
      }
      // else call to get more group; paginate next page
      if (action.payload.groups.length > 0 && action.payload.lastGroupVisible) {
        const newGroups: Group[] = [...state.groups, ...action.payload.groups];
        return {
          ...state,
          loadingPartial: false,
          loadingAll: false,
          groups: newGroups,
          lastGroupVisible: action.payload.lastGroupVisible,
        };
      }
      return {
        ...state,
        loadingPartial: false,
        loadingAll: false,
      };
    }
    case GroupActionType.SELECT_GROUP:
      return {
        ...state,
        selectedGroup: action.payload.group,
      };
    case GroupActionType.ON_ADD_GROUP:
    case GroupActionType.ON_DELETE_GROUP:
      return {
        ...initialState,
        loadingAll: true,
      };
    case GroupActionType.ON_UPDATE_GROUP:
      return {
        ...state,
        loadingAll: true,
        selectedGroup: undefined,
      };
    case GroupActionType.UPDATE_GROUP_SUCCESS: {
      const newGroups: Group[] = state.groups.map((group) => {
        if (group.id === action.payload.group.id) {
          return action.payload.group;
        }
        return group;
      });
      return {
        ...state,
        groups: newGroups,
        selectedGroup: action.payload.group,
        loadingAll: false,
      };
    }
    default:
      return state;
  }
};

export { GroupReducer };
