import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { AddGroup, GroupListScreenStack, Profile } from '.';
import ExploreIcon from '../../assests/icons/ExploreIcon';
import PlusIcon from '../../assests/icons/PlusIcon';
import ProfileIcon from '../../assests/icons/ProfileIcon';
import { HomeStackParams } from '../../constants/stackParams';

const HomeStack = createBottomTabNavigator<HomeStackParams>();
interface TabBarIconProps {
  color: string;
  size: number;
  focused?: boolean;
}

const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="GroupListStack"
        component={GroupListScreenStack}
        options={{
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <ExploreIcon color={color} size={size} />
          ),
          tabBarLabel: 'Groups',
        }}
      />
      <HomeStack.Screen
        name="AddGroup"
        component={AddGroup}
        options={{
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <PlusIcon color={color} size={size} />
          ),
          tabBarLabel: 'Add Group',
        }}
      />
      <HomeStack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <ProfileIcon color={color} size={size} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </HomeStack.Navigator>
  );
};

export { Home };
