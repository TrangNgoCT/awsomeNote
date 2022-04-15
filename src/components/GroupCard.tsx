import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { HomeStackParams } from '../constants/stackParams';
import { Group } from '../models';
import { selectGroup } from '../store';
import { groupCardStyles } from '../styles/global';
import { Divider } from './';

type Props = NativeStackNavigationProp<HomeStackParams, 'GroupList'>;

type groupCardProps = {
  group: Group;
};

const GroupCard = ({ group }: groupCardProps) => {
  const navigation = useNavigation<Props>();
  const dispatch = useDispatch();
  const handleClickGroup = (e: GestureResponderEvent) => {
    e.preventDefault();
    dispatch(selectGroup({ group }));
    navigation.navigate('GroupDetail');
  };

  return (
    <TouchableOpacity onPress={handleClickGroup} style={groupCardStyles.card}>
      <Text style={groupCardStyles.title}>{group.title}</Text>
      <Divider />
      <Text numberOfLines={2} ellipsizeMode="tail" style={groupCardStyles.desc}>
        {group.desc}
      </Text>
      <Text style={groupCardStyles.time}>
        {group.createAt?.toDate().toLocaleTimeString('en-US')}
      </Text>
    </TouchableOpacity>
  );
};

export { GroupCard };
