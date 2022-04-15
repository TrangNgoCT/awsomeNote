import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { EditAddGroup } from '../../../components';
import { HomeStackParams } from '../../../constants/stackParams';
import { ApplicationState, onDeleteGroup } from '../../../store';
import { globalStyles, groupCardStyles } from '../../../styles/global';
import { NoteList } from './component';

type Props = NativeStackScreenProps<HomeStackParams, 'GroupDetail'>;

const GroupDetail: React.FC<Props> = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        //
      };
    }, [])
  );

  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { selectedGroup, loadingAll: groupLoadingAll } = useSelector(
    (state: ApplicationState) => state.group
  );

  const onClickDeleteGroup = (e: GestureResponderEvent) => {
    e.preventDefault();
    dispatch(onDeleteGroup({ groupId: selectedGroup?.id ?? '' }));
    navigation.replace('GroupList');
  };

  const onClickEdit = (e: GestureResponderEvent) => {
    e.preventDefault();
    setEdit(true);
  };

  const onClickAddNote = (e: GestureResponderEvent) => {
    e.preventDefault();
    navigation.navigate('AddNote');
  };

  const GroupInfoAndActions = () => {
    if (!selectedGroup || groupLoadingAll) {
      return (
        <View style={[globalStyles.center, globalStyles.container]}>
          <ActivityIndicator size="large" color="skyblue" />
        </View>
      );
    }
    return (
      <>
        {/* Actions btn groups */}
        <View style={styles.actionBtns}>
          <TouchableOpacity onPress={onClickAddNote}>
            <Text style={[globalStyles.btn, globalStyles.btnPrimary, styles.btn]}>
              Add Note
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClickEdit}>
            <Text style={[globalStyles.btn, globalStyles.btnInfo, styles.btn]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClickDeleteGroup}>
            <Text style={[globalStyles.btn, globalStyles.btnError, styles.btn]}>
              Delete Group
            </Text>
          </TouchableOpacity>
        </View>
        {/* Group info */}
        <View style={groupCardStyles.card}>
          <Text style={[globalStyles.titleText, groupCardStyles.title]}>
            {selectedGroup.title}
          </Text>
          <Text style={groupCardStyles.desc}>{selectedGroup.desc}</Text>
          <Text style={groupCardStyles.time}>
            {selectedGroup.createAt?.toDate().toLocaleDateString('en-US')}
          </Text>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {edit ? (
        <>
          <View style={[styles.container]}>
            <Text style={[globalStyles.titleText, styles.title]}>EDIT GROUP</Text>
            <EditAddGroup
              group={selectedGroup}
              callback={() => {
                setEdit(false);
              }}
            />
          </View>
        </>
      ) : (
        <>
          <GroupInfoAndActions />
          <NoteList />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  title: { marginBottom: 20 },
  btn: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontWeight: '400',
    fontSize: 14,
  },
  actionBtns: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
});

export { GroupDetail };
