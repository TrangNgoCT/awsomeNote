import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { GestureResponderEvent, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Divider } from '.';
import { HomeStackParams } from '../constants/stackParams';
import { Note } from '../models';
import { selectNote } from '../store';
import { noteCardStyles } from '../styles/global';

type Props = NativeStackNavigationProp<HomeStackParams, 'GroupList'>;

type noteCardProps = {
  note: Note;
};

const NoteCard = ({ note }: noteCardProps) => {
  const navigation = useNavigation<Props>();
  const dispatch = useDispatch();
  const handleClickNote = (e: GestureResponderEvent) => {
    e.preventDefault();
    dispatch(selectNote({ note }));
    navigation.navigate('NoteDetail');
  };

  return (
    <TouchableOpacity onPress={handleClickNote} style={noteCardStyles.card}>
      <Text style={noteCardStyles.title}>{note.title}</Text>
      <Divider />
      <View style={noteCardStyles.wrapper}>
        <View style={noteCardStyles.leftWrapper}>
          <Text numberOfLines={5} ellipsizeMode="tail" style={noteCardStyles.desc}>
            {note.desc}
          </Text>
          <Text style={noteCardStyles.time}>
            {note.createAt?.toDate().toLocaleTimeString('en-US')}
          </Text>
        </View>
        <Image style={[noteCardStyles.image]} source={{ uri: note.image }} />
      </View>
    </TouchableOpacity>
  );
};

export { NoteCard };
