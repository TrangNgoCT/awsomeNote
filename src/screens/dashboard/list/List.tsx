import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { GroupCard } from '../../../components';
import { HomeStackParams } from '../../../constants/stackParams';
import { Group } from '../../../models';
import { ApplicationState, onGetGroups } from '../../../store';
import { globalStyles } from '../../../styles/global';

type Props = NativeStackScreenProps<HomeStackParams, 'GroupList'>;

const GroupList: React.FC<Props> = () => {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const { loadingAll, loadingPartial, groups, totalGroups } = useSelector(
    (state: ApplicationState) => state.group
  );
  const handleLoadMoreGroups = () => {
    if (totalGroups > groups.length) {
      dispatch(onGetGroups({ isReload: false }));
    }
  };

  const renderItem = ({ item }: { item: Group }) => <GroupCard group={item} />;
  return (
    <SafeAreaView style={globalStyles.container}>
      <TextInput
        style={[globalStyles.input, styles.input]}
        placeholder="Search Group ...."
        value={search}
        onChangeText={(e) => setSearch(e.trim())}
      />
      {loadingAll ? (
        <View style={[globalStyles.container, globalStyles.center]}>
          <ActivityIndicator size="large" color="skyblue" />
          <Text style={{ marginTop: 20 }}>plz wait ... </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={groups}
            renderItem={renderItem}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            keyExtractor={(group) => group.id!}
            onEndReached={handleLoadMoreGroups}
          />
          {loadingPartial && (
            <View style={styles.loadingPartial}>
              <ActivityIndicator size="large" color="skyblue" />
              <Text style={{ marginTop: 20, textAlign: 'center' }}>plz wait ... </Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: { backgroundColor: 'white' },
  loadingPartial: {
    marginTop: 12,
  },
});

export { GroupList };
