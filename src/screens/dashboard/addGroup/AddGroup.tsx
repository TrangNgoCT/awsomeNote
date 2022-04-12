import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { HomeStackParams } from '../../../navigation/stackParams';

type Props = NativeStackScreenProps<HomeStackParams, 'AddGroup'>;

const AddGroup: React.FC<Props> = ({ navigation }) => {
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
      <Text>Home Screen</Text>
      <Button
        title="go to list"
        onPress={() => {
          navigation.navigate('GroupListStack', {
            screen: 'GroupDetail',
            params: { name: 'this is from profile' },
          });
        }}
      />
    </View>
  );
};

export { AddGroup };
