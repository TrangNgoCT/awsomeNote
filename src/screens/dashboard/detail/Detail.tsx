import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { HomeStackParams, RootStackParams } from '../../../constants/stackParams';

type Props = NativeStackScreenProps<HomeStackParams, 'GroupDetail'>;

const Detail: React.FC<Props> = ({ route, navigation }) => {
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
      <Text>Detail screen</Text>
      <Text>{route.params.name}</Text>
      <Button title="go back home" onPress={() => navigation.navigate('GroupList')} />
    </View>
  );
};

export { Detail };
