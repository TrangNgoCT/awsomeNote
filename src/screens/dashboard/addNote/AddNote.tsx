import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { HomeStackParams } from '../../../constants/stackParams';
import { globalStyles } from '../../../styles/global';
import { EditAddNote } from '../groupDetail/component';

type Props = NativeStackScreenProps<HomeStackParams, 'GroupDetail'>;

const AddNote: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={[globalStyles.container, styles.center]}>
      <EditAddNote
        callback={() => {
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export { AddNote };

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center' },
});
