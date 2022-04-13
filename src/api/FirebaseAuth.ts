import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginPayload } from '../models';

const useFirebaseAuth = {
  login(payload: LoginPayload) {
    return auth().signInWithEmailAndPassword(payload.email, payload.password);
  },
  register(payload: LoginPayload) {
    return auth().createUserWithEmailAndPassword(payload.email, payload.password);
  },
  logout() {
    if (auth().currentUser) {
      return auth().signOut();
    }
  },
  async signInByGoogle() {
    // TODO
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  },
  getToken() {
    if (auth().currentUser) {
      return auth().currentUser?.getIdToken(true);
    } else {
      return undefined;
    }
  },
  handleIsLoggedIn(callback: (user: FirebaseAuthTypes.User | null) => void) {
    auth().onAuthStateChanged(callback);
  },
};
export { useFirebaseAuth };
