import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { RootStackParams } from '../../../navigation/stackParams';

type Props = NativeStackScreenProps<RootStackParams, 'Home'>;

const Home: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="go to list"
        onPress={() => {
          navigation.navigate('ListStack');
        }}
      />
    </View>
  );
};

export { Home };
