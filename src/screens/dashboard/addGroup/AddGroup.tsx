import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { EditAddGroup } from '../../../components';
import { HomeStackParams } from '../../../constants/stackParams';
import { globalStyles } from '../../../styles/global';

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
    <SafeAreaView style={[globalStyles.container, styles.center]}>
      <EditAddGroup
        callback={() => {
          navigation.navigate('GroupListStack', {
            screen: 'GroupList',
          });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center' },
});

export { AddGroup };
