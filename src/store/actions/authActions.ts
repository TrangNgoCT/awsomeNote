import { LoginPayload, RegisterPayload, User } from '../../models';

enum AuthActionType {
  ON_LOGIN_SUCCESS = 'ON_LOGIN_SUCCESS',
  ON_REGISTER = 'ON_REGISTER',
  ON_LOGGING = 'ON_LOGGING',
  ON_ERROR = 'ON_ERROR',
  ON_LOGOUT = 'ON_LOGOUT',
  ON_LOGIN_GOOGLE = 'ON_LOGIN_GOOGLE',
}
export { AuthActionType };

export interface LoggingAction {
  readonly type: AuthActionType.ON_LOGGING;
  payload: LoginPayload;
}

export interface OnLoginGooleAction {
  readonly type: AuthActionType.ON_LOGIN_GOOGLE;
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
  | OnLoginGooleAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction
  | OnRegisterAction;
