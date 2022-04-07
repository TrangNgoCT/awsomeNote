/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import ExploreIcon from './assests/icons/ExploreIcon';
import PlusIcon from './assests/icons/PlusIcon';
import ProfileIcon from './assests/icons/ProfileIcon';
import { RootStackParams } from './navigation/stackParams';
import { Home, ListScreenStack, Profile } from './screens/dashboard';

const RootStack = createBottomTabNavigator<RootStackParams>();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="ListStack"
          component={ListScreenStack}
          options={{
            tabBarIcon: ({ color, size }) => <ExploreIcon color={color} size={size} />,
            tabBarLabel: 'Notes',
          }}
        />
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => <PlusIcon color={color} size={size} />,
            tabBarLabel: 'Notes',
          }}
        />
        <RootStack.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => <ProfileIcon color={color} size={size} />,
            tabBarLabel: 'Profile',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
