import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { HomeStackParams } from '../../../constants/stackParams';
import { ApplicationState, onDeleteNote } from '../../../store';
import { globalStyles, noteCardStyles } from '../../../styles/global';
import { EditAddNote } from '../groupDetail/component';

type Props = NativeStackScreenProps<HomeStackParams, 'GroupDetail'>;

const NoteDetail: React.FC<Props> = ({ navigation }) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const groupId =
    useSelector((state: ApplicationState) => state.group.selectedGroup?.id) ?? '';
  const { selectedNote, loadingAll } = useSelector(
    (state: ApplicationState) => state.note
  );

  const onClickMove = (e: GestureResponderEvent) => {
    e.preventDefault();
    // TODO
  };

  const onClickEdit = (e: GestureResponderEvent) => {
    e.preventDefault();
    setEdit(true);
  };

  const onClickDelete = (e: GestureResponderEvent) => {
    e.preventDefault();
    dispatch(onDeleteNote({ noteId: selectedNote?.id ?? '', groupId }));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {edit ? (
        <ScrollView style={{ flex: 1 }}>
          <Text style={[globalStyles.titleText, { marginBottom: 20 }]}>EDIT NOTE</Text>
          <EditAddNote
            note={selectedNote}
            callback={() => {
              setEdit(false);
            }}
          />
        </ScrollView>
      ) : !selectedNote || loadingAll ? (
        <View style={[globalStyles.center, globalStyles.container]}>
          <ActivityIndicator size="large" color="skyblue" />
        </View>
      ) : (
        <>
          {/* Actions btn groups */}
          <View style={styles.actionBtns}>
            <TouchableOpacity onPress={onClickMove}>
              <Text style={[globalStyles.btn, globalStyles.btnPrimary, styles.btn]}>
                Move Note
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClickEdit}>
              <Text style={[globalStyles.btn, globalStyles.btnInfo, styles.btn]}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClickDelete}>
              <Text style={[globalStyles.btn, globalStyles.btnError, styles.btn]}>
                Delete note
              </Text>
            </TouchableOpacity>
          </View>
          {/* note info */}
          <View style={noteCardStyles.card}>
            <Text style={[globalStyles.titleText, noteCardStyles.title]}>
              {selectedNote.title}
            </Text>
            <Text style={[noteCardStyles.desc, { marginTop: 12 }]}>
              {selectedNote.desc}
            </Text>
            <Text style={noteCardStyles.time}>
              {selectedNote.createAt?.toDate().toLocaleDateString('en-US')}
            </Text>
          </View>

          <View style={noteCardStyles.card}>
            <Image style={[styles.image]} source={{ uri: selectedNote.image }} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export { NoteDetail };

const styles = StyleSheet.create({
  image: { height: 300, left: 0, right: 0 },
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
