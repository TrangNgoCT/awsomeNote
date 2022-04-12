import { AuthActionType } from '../actionTypes';
import { AuthAction } from '../actions';
import { LoginPayload, RegisterPayload, User } from '../../models';

export const logging = (loginPayload: LoginPayload): AuthAction => {
  return { type: AuthActionType.ON_LOGGING, payload: loginPayload };
};

export const loggingByToken = (token: string): AuthAction => {
  return { type: AuthActionType.ON_LOGGING_BY_TOKEN, payload: token };
};

export const loginSuccess = (user: User): AuthAction => {
  return {
    type: AuthActionType.ON_LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginError = (error: string): AuthAction => {
  return { type: AuthActionType.ON_ERROR, payload: error };
};

export const logout = (): AuthAction => {
  return { type: AuthActionType.ON_LOGOUT };
};

export const register = (registerPayload: RegisterPayload): AuthAction => {
  return { type: AuthActionType.ON_REGISTER, payload: registerPayload };
};
