import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebaseAuth } from '../api/FirebaseAuth';
import { RootStackParams } from '../constants/stackParams';
import { ApplicationState, loginSuccess } from '../store';
import { ForgotPassword, Login, Register } from './auth';
import { Loading } from './commons';
import { Home } from './dashboard';

const RootStack = createNativeStackNavigator<RootStackParams>();

const Navigation = () => {
  const dispatch = useDispatch();
  const [appLoading, setAppLoading] = useState(true);
  const user = useSelector((state: ApplicationState) => state.auth.user);

  useEffect(() => {
    const loadApp1 = () =>
      new Promise((res) => {
        setTimeout(() => {
          useFirebaseAuth.handleIsLoggedIn((user) => {
            if (user != null) {
              dispatch(
                loginSuccess({
                  email: user.email ?? '',
                  id: user.uid,
                })
              );
            }
          });
          res(true);
        }, 1500);
      });

    const loadApp2 = async () => {
      await loadApp1();
      setAppLoading(false);
    };

    loadApp2();
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {appLoading ? (
          <RootStack.Screen name="Loading" component={Loading} />
        ) : user != undefined ? (
          <RootStack.Screen name="Home" component={Home} />
        ) : (
          <>
            <RootStack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Login',
              }}
            />
            <RootStack.Screen
              name="Register"
              component={Register}
              options={{
                title: 'Register',
              }}
            />
            <RootStack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
                title: 'forgot password',
              }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
