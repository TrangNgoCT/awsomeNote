import React from 'react';
import { View } from 'react-native';
import { LoadingModal } from '../../components';

function Loading() {
  return (
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22 }}>
      <LoadingModal size="large" text="Load App ...." />
    </View>
  );
}

export { Loading };
