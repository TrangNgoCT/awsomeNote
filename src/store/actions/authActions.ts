import { LoginPayload, RegisterPayload, User } from '../../models';
import { AuthActionType } from '../actionTypes';

export interface LoggingAction {
  readonly type: AuthActionType.ON_LOGGING;
  payload: LoginPayload;
}

export interface LoggingByTokenAction {
  readonly type: AuthActionType.ON_LOGGING_BY_TOKEN;
  payload: string;
}

export interface LoginSuccessAction {
  readonly type: AuthActionType.ON_LOGIN_SUCCESS;
  payload: User;
}

export interface LoginErrorAction {
  readonly type: AuthActionType.ON_ERROR;
  payload: string;
}

export interface LogoutAction {
  readonly type: AuthActionType.ON_LOGOUT;
}

export interface OnRegisterAction {
  readonly type: AuthActionType.ON_REGISTER;
  payload: RegisterPayload;
}

export type AuthAction =
  | LoggingAction
  | LoggingByTokenAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction
  | OnRegisterAction;
