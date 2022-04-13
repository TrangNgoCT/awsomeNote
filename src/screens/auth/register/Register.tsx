import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { RootStackParams } from '../../../constants/stackParams';
import { register } from '../../../store';

type Props = NativeStackScreenProps<RootStackParams, 'Register'>;

const Register: React.FC<Props> = ({ navigation }) => {
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

  const handleRegisterClick = () => {
    dispatch(
      register({
        username: 'trang ngo',
        email: 'trangngo@gmail.com',
        password: 'abc123',
      })
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Register screen</Text>
      <Button title="register" onPress={handleRegisterClick} />

      <Button title="go to login" onPress={() => navigation.replace('Login')} />
      <Button
        title="go to forgot password"
        onPress={() => navigation.replace('ForgotPassword')}
      />
    </View>
  );
};

export { Register };
