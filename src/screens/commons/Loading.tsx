import React from 'react';
import { View, Text } from 'react-native';

function Loading() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Loading screen</Text>
    </View>
  );
}

export { Loading };
