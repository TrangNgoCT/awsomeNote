import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, GestureResponderEvent, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { RootStackParams } from '../../../constants/stackParams';
import { logging, loginWithgoogle, logout } from '../../../store';

type Props = NativeStackScreenProps<RootStackParams, 'Login'>;

const Login: React.FC<Props> = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(
      logging({
        email: 'trangngo@gmail.com',
        password: 'abc123',
      })
    );
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  const onGoogleButtonPress = (e: GestureResponderEvent) => {
    e.preventDefault();
    dispatch(loginWithgoogle());
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login screen</Text>
      <Button title="logout" onPress={handleLogoutClick} />

      <Button title="login" onPress={handleLoginClick} />
      <Button title="Google Sign In" onPress={onGoogleButtonPress} />
      <Button title="go to register" onPress={() => navigation.replace('Register')} />
      <Button
        title="go to forgot password"
        onPress={() => navigation.replace('ForgotPassword')}
      />
    </View>
  );
};

export { Login };
