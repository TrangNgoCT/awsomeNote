import { View, Text, Button } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../navigation/stackParams';

type Props = NativeStackScreenProps<RootStackParams, 'Home'>;

const Profile: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Profile</Text>
      <Button
        title="go to detail name ..."
        onPress={() => {
          navigation.navigate('ListStack', {
            screen: 'Detail',
            params: { name: 'this is from profile' },
          });
        }}
      />
    </View>
  );
};

export { Profile };
