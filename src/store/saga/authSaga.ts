import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { call, fork, put, take } from 'redux-saga/effects';
import { useFirebaseAuth } from '../../api/FirebaseAuth';
import {
  getAccessToken,
  removeAccessToken,
  storeData,
  StoreKeys,
} from '../../hooks/localStorage';
import { LoginPayload, RegisterPayload } from '../../models';
import { loginError, loginSuccess } from '../actionCreators';
import {
  LoggingAction,
  LoggingByTokenAction,
  LoginErrorAction,
  LogoutAction,
  OnRegisterAction,
} from '../actions';
import { AuthActionType } from '../actionTypes';

function* handleLogin(payload: LoginPayload) {
  try {
    const result: FirebaseAuthTypes.UserCredential | null = yield useFirebaseAuth.login(
      payload
    );
    // TODO call api get user info : {username}
    const token: string | undefined = yield useFirebaseAuth.getToken();
    if (token) {
      yield storeData({ key: StoreKeys.ACCESS_TOKEN, value: token });
      yield put(
        loginSuccess({
          id: result?.user.uid ?? '',
          username: 'trang ngo',
          email: payload.email,
        })
      );
    } else {
      yield put(loginError('ops, something went wrong'));
    }
  } catch (e) {
    yield put(loginError('Email/ password is wrong'));
  }
}

function* handleRegister(payload: RegisterPayload) {
  try {
    const result: FirebaseAuthTypes.UserCredential | null =
      yield useFirebaseAuth.register(payload);
    const token: string | undefined = yield useFirebaseAuth.getToken();
    if (token) {
      yield storeData({ key: StoreKeys.ACCESS_TOKEN, value: token });
      yield put(
        loginSuccess({
          id: result?.user.uid ?? '',
          username: payload.username,
          email: payload.email,
        })
      );
    } else {
      yield put(loginError('ops, something went wrong'));
    }
  } catch (e) {
    yield put(loginError('Ops, something wrong'));
  }
}

function* handleLoginByToken(token: string) {
  try {
    const result: FirebaseAuthTypes.UserCredential | null =
      yield useFirebaseAuth.loginByToken(token);
    console.log(result);
    // TODO call api get user info : {username}

    const newToken: string | undefined = yield useFirebaseAuth.getToken();
    console.log(token === newToken);

    if (token) {
      // yield storeData({ key: StoreKeys.ACCESS_TOKEN, value: token });
      yield put(
        loginSuccess({
          id: result?.user.uid ?? '',
          username: 'trang ngo',
          email: result?.user.email ?? '',
        })
      );
    } else {
      yield put(loginError('ops, something went wrong'));
    }
  } catch (e) {
    yield put(loginError('Email/ password is wrong'));
  }
}

function* handleLogout() {
  yield removeAccessToken();
  yield useFirebaseAuth.logout();
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn: string | undefined = yield getAccessToken();
    if (!isLoggedIn) {
      const action: LoggingAction | OnRegisterAction = yield take([
        AuthActionType.ON_LOGGING,
        AuthActionType.ON_REGISTER,
      ]);
      if (action.type === AuthActionType.ON_LOGGING) {
        yield fork(handleLogin, action.payload);
      } else {
        yield fork(handleRegister, action.payload);
      }
    }

    const action: LogoutAction | LoginErrorAction | LoggingByTokenAction = yield take([
      AuthActionType.ON_LOGOUT,
      AuthActionType.ON_ERROR,
      AuthActionType.ON_LOGGING_BY_TOKEN,
    ]);
    console.log(action);
    if (action.type === AuthActionType.ON_LOGGING_BY_TOKEN) {
      yield fork(handleLoginByToken, action.payload);
    } else {
      yield call(handleLogout);
    }
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
