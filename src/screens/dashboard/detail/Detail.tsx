import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { RootStackParams } from '../../../navigation/stackParams';

type Props = NativeStackScreenProps<RootStackParams, 'Detail'>;

const Detail: React.FC<Props> = ({ route, navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail screen</Text>
      <Text>{route.params.name}</Text>
      <Button title="go back home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export { Detail };
