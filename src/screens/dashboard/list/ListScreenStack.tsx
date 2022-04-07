import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Detail, List } from '..';

export type ListStackParams = {
  List: undefined;
  Detail: {
    name: string;
  };
};

const ListStack = createNativeStackNavigator<ListStackParams>();

const ListScreenStack = () => {
  return (
    <ListStack.Navigator initialRouteName="List">
      <ListStack.Screen name="List" component={List} />
      <ListStack.Screen name="Detail" component={Detail} />
    </ListStack.Navigator>
  );
};

export { ListScreenStack };
