import auth from '@react-native-firebase/auth';
import { LoginPayload } from '../models';

const useFirebaseAuth = {
  login(payload: LoginPayload) {
    return auth().signInWithEmailAndPassword(payload.email, payload.password);
  },
  loginByToken(token: string) {
    return auth().signInWithCustomToken(token);
  },
  register(payload: LoginPayload) {
    return auth().createUserWithEmailAndPassword(payload.email, payload.password);
  },
  logout() {
    if (auth().currentUser) {
      return auth().signOut();
    }
  },
  getToken() {
    if (auth().currentUser) {
      return auth().currentUser?.getIdToken(true);
    } else {
      return undefined;
    }
  },
};
export { useFirebaseAuth };
