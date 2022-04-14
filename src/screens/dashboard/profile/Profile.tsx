import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { GestureResponderEvent, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HomeStackParams } from '../../../constants/stackParams';
import { ApplicationState, logout } from '../../../store';
import { globalStyles } from '../../../styles/global';

type Props = NativeStackScreenProps<HomeStackParams, 'AddGroup'>;

const Profile: React.FC<Props> = () => {
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
  const email = useSelector((state: ApplicationState) => state.auth.user?.email);

  const handleClickLogout = (e: GestureResponderEvent) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <SafeAreaView style={[globalStyles.container, globalStyles.center]}>
      <Text style={[globalStyles.titleText, styles.title]}>{email}</Text>
      <Text
        style={[globalStyles.btn, globalStyles.btnPrimary]}
        onPress={handleClickLogout}>
        Log out
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 30,
  },
});

export { Profile };
