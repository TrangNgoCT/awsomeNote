import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Detail, GroupList } from '..';
import { GroupListStackParams } from '../../../constants/stackParams';

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
        component={Detail}
        options={{ headerShown: false }}
      />
    </ListStack.Navigator>
  );
};

export { GroupListScreenStack };
