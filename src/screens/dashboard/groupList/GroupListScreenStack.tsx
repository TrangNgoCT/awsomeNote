import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { GroupDetail, GroupList, NoteDetail } from '..';
import { GroupListStackParams } from '../../../constants/stackParams';
import { AddNote } from '../addNote/AddNote';

const ListStack = createNativeStackNavigator<GroupListStackParams>();

const GroupListScreenStack = () => {
  return (
    <ListStack.Navigator
      initialRouteName="GroupList"
      screenOptions={{ headerTitleAlign: 'center' }}>
      <ListStack.Screen
        name="GroupList"
        component={GroupList}
        options={{
          title: 'All Groups',
        }}
      />
      <ListStack.Screen
        name="GroupDetail"
        component={GroupDetail}
        options={{ headerShown: false }}
      />
      <ListStack.Screen
        name="NoteDetail"
        component={NoteDetail}
        options={{ headerShown: false }}
      />
      <ListStack.Screen
        name="AddNote"
        component={AddNote}
        options={{ headerShown: false }}
      />
    </ListStack.Navigator>
  );
};

export { GroupListScreenStack };
