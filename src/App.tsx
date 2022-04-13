/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Navigation from './screens/Navigation';
import { store } from './store';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '162659043264-nkan8hs420e11cnqaeec1bv8tb3ll27c.apps.googleusercontent.com',
    });
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
