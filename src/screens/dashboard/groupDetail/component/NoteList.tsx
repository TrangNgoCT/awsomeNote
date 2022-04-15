import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NoteCard } from '../../../../components/NoteCard';
import { Note } from '../../../../models';
import { ApplicationState, onGetNotes } from '../../../../store';
import { globalStyles } from '../../../../styles/global';

const NoteList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const { loadingAll, loadingPartial, notes, totalNotes } = useSelector(
    (state: ApplicationState) => state.note
  );

  const handleLoadMoteNotes = () => {
    if (totalNotes > notes.length) {
      dispatch(onGetNotes({ isReload: false }));
    }
  };

  const renderItem = ({ item }: { item: Note }) => <NoteCard note={item} />;

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={[globalStyles.input, styles.input]}
        placeholder="Search Note ...."
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
            data={notes}
            renderItem={renderItem}
            keyExtractor={(note) => note.id ?? '1'}
            onEndReached={handleLoadMoteNotes}
          />
          {loadingPartial && (
            <View style={styles.loadingPartial}>
              <ActivityIndicator size="large" color="skyblue" />
              <Text style={{ marginTop: 20, textAlign: 'center' }}>plz wait ... </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: { backgroundColor: 'white', marginTop: 20 },
  loadingPartial: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export { NoteList };
