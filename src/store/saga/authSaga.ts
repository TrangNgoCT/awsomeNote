import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { call, fork, put, take } from 'redux-saga/effects';
import { firebaseAuth } from '../../api';
import { getAccessToken, removeAccessToken } from '../../hooks/localStorage';
import { LoginPayload, RegisterPayload } from '../../models';
import { loginError, loginSuccess } from '../actionCreators';
import { AuthAction, AuthActionType } from '../actions';

function* handleLogin(payload: LoginPayload) {
  try {
    const result: FirebaseAuthTypes.UserCredential | null = yield firebaseAuth.login(
      payload
    );
    yield put(
      loginSuccess({
        id: result?.user.uid ?? '',
        email: payload.email,
      })
    );
  } catch (e) {
    console.log('ERROR LOGIN', e);
    yield put(loginError('Email/ password is wrong'));
  }
}

function* handleRegister(payload: RegisterPayload) {
  try {
    const result: FirebaseAuthTypes.UserCredential | null = yield firebaseAuth.register(
      payload
    );
    yield put(
      loginSuccess({
        id: result?.user.uid ?? '',
        email: payload.email,
      })
    );
  } catch (e) {
    console.log('ERROR REGISTER', e);
    yield put(loginError('Ops, something wrong'));
  }
}

function* handleLoginWithGoogle() {
  try {
    const result: FirebaseAuthTypes.UserCredential = yield firebaseAuth.signInByGoogle();
    yield put(
      loginSuccess({
        id: result.user.uid ?? '',
        email: result.user.email ?? '',
      })
    );
  } catch (e) {
    console.log('ERROR LOGIN WITH GOOGLE', e);
    yield put(loginError('Ops, something wrong, plz try again'));
  }
}

function* handleLogout() {
  yield removeAccessToken();
  yield firebaseAuth.logout();
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn: string | undefined = yield getAccessToken();
    if (!isLoggedIn) {
      const action: AuthAction = yield take([
        AuthActionType.ON_LOGGING,
        AuthActionType.ON_REGISTER,
        AuthActionType.ON_LOGIN_GOOGLE,
      ]);
      if (action.type === AuthActionType.ON_LOGGING) {
        yield fork(handleLogin, action.payload);
      } else if (action.type === AuthActionType.ON_REGISTER) {
        yield fork(handleRegister, action.payload);
      } else {
        yield fork(handleLoginWithGoogle);
      }
    }

    yield take([AuthActionType.ON_LOGOUT, AuthActionType.ON_ERROR]);
    yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
