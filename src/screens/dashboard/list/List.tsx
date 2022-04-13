import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, GestureResponderEvent, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { HomeStackParams } from '../../../constants/stackParams';
import { logout } from '../../../store/actionCreators';

type Props = NativeStackScreenProps<HomeStackParams, 'GroupList'>;

const GroupList: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const onClickLogout = (e: GestureResponderEvent) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>List </Text>
      <Button
        title="go to detail group"
        onPress={() => {
          navigation.navigate('GroupDetail', { name: 'this a note' });
        }}
      />
      <Button title="logout" onPress={onClickLogout} />
    </View>
  );
};

export { GroupList };
