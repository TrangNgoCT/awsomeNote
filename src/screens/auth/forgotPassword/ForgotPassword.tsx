import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParams } from '../../../constants/stackParams';

type Props = NativeStackScreenProps<RootStackParams, 'ForgotPassword'>;

const ForgotPassword: React.FC<Props> = ({ route, navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ForgotPassword screen</Text>
      <Button title="go to register" onPress={() => navigation.replace('Register')} />
      <Button title="go to Login" onPress={() => navigation.replace('Login')} />
    </View>
  );
};

export { ForgotPassword };
