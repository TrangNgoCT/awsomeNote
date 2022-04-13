import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Detail, GroupList } from '..';
import { GroupListStackParams } from '../../../constants/stackParams';

const ListStack = createNativeStackNavigator<GroupListStackParams>();

const GroupListScreenStack = () => {
  return (
    <ListStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="GroupList">
      <ListStack.Screen name="GroupList" component={GroupList} />
      <ListStack.Screen name="GroupDetail" component={Detail} />
    </ListStack.Navigator>
  );
};

export { GroupListScreenStack };
