import { User } from '../../models';
import { AuthActionType } from '../actionTypes';
import { AuthAction } from '../actions';

type AuthState = {
  user?: User;
  error?: string;
  loading: boolean;
};

const initialState = {
  user: undefined,
  error: undefined,
  loading: false,
};

const AuthReducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionType.ON_LOGGING:
      return { ...state, loading: true };
    case AuthActionType.ON_LOGGING_BY_TOKEN:
      return { ...state, loading: true };
    case AuthActionType.ON_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case AuthActionType.ON_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case AuthActionType.ON_LOGOUT:
      return { ...initialState };
    case AuthActionType.ON_REGISTER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export { AuthReducer };
