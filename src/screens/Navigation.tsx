import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { RootStackParams } from '../navigation/stackParams';
import { ForgotPassword, Login, Register } from './auth';
import { Home } from './dashboard';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState, loggingByToken } from '../store';
import { getAccessToken } from '../hooks/localStorage';

const RootStack = createNativeStackNavigator<RootStackParams>();

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: ApplicationState) => state.auth.user);
  useEffect(() => {
    const loadApp = async () => {
      const token = await getAccessToken();
      if (token) {
        console.log(token);
        dispatch(loggingByToken(token));
      }
    };
    loadApp();
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user != undefined ? (
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
