import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { RootStackParams } from '../../../navigation/stackParams';

type Props = NativeStackScreenProps<RootStackParams, 'List'>;

const List: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>List </Text>
      <Button
        title="go to detail"
        onPress={() => {
          navigation.navigate('Detail', { name: 'this a note' });
        }}
      />
    </View>
  );
};

export { List };
