/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Navigation from './screens/Navigation';
import { store } from './store';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '162659043264-nkan8hs420e11cnqaeec1bv8tb3ll27c.apps.googleusercontent.com',
    });
  }, []);

  // this a fake function to create fake init data to firestore
  // useEffect(() => {
  //   const fakeGroups: Group[] = [
  //     {
  //       title: 'group title 1',
  //       desc: 'group desc 1',
  //     },
  //     {
  //       title: 'group title 2',
  //       desc: 'group desc 2',
  //     },
  //     {
  //       title: 'group title 3',
  //       desc: 'group desc 3',
  //     },
  //     {
  //       title: 'group title 4',
  //       desc: 'group desc 4',
  //     },
  //     {
  //       title: 'group title 5',
  //       desc: 'group desc 5',
  //     },
  //     {
  //       title: 'group title 6',
  //       desc: 'group desc 6',
  //     },
  //     {
  //       title: 'group title 7',
  //       desc: 'group desc 7',
  //     },
  //     {
  //       title: 'group title 8',
  //       desc: 'group desc 8',
  //     },
  //     {
  //       title: 'group title 9',
  //       desc: 'group desc 9',
  //     },
  //     {
  //       title: 'group title 10',
  //       desc: 'group desc 10',
  //     },
  //     {
  //       title: 'group title 11',
  //       desc: 'group desc 11',
  //     },
  //     {
  //       title: 'group title 12',
  //       desc: 'group desc 12',
  //     },
  //     {
  //       title: 'group title 13',
  //       desc: 'group desc 13',
  //     },
  //     {
  //       title: 'group title 14',
  //       desc: 'group desc 14',
  //     },
  //     {
  //       title: 'group title 15',
  //       desc: 'group desc 15',
  //     },
  //     {
  //       title: 'group title 16',
  //       desc: 'group desc 16',
  //     },
  //     {
  //       title: 'group title 17',
  //       desc: 'group desc 17',
  //     },
  //     {
  //       title: 'group title 18',
  //       desc: 'group desc 18',
  //     },
  //     {
  //       title: 'group title 19',
  //       desc: 'group desc 19',
  //     },
  //     {
  //       title: 'group title 20',
  //       desc: 'group desc 20',
  //     },
  //   ];
  //   const fakeNotes: Note[] = [
  //     {
  //       title: 'note title 1',
  //       desc: 'note desc 1',
  //       image:
  //         'https://firebasestorage.googleapis.com/v0/b/note-app-training-8f8e4.appspot.com/o/BQl0GgRhOfXjfJvdZTGln6GmWpK2%2F2020-12-26%20(12).png?alt=media&token=8a815986-ff20-4de5-bb78-7f2982b6f178',
  //     },
  //     {
  //       title: 'note title 2',
  //       desc: 'note desc 2',
  //       image:
  //         'https://firebasestorage.googleapis.com/v0/b/note-app-training-8f8e4.appspot.com/o/BQl0GgRhOfXjfJvdZTGln6GmWpK2%2FphucAvatar.jpg?alt=media&token=f7ede2be-982d-4d86-ab8c-f1caf1935b2e',
  //     },
  //     {
  //       title: 'note title 3',
  //       desc: 'note desc 3',
  //       image:
  //         'https://firebasestorage.googleapis.com/v0/b/note-app-training-8f8e4.appspot.com/o/BQl0GgRhOfXjfJvdZTGln6GmWpK2%2FtrangAvatar.jpg?alt=media&token=077e90ad-8623-400b-b491-f0322daea594',
  //     },
  //   ];
  //   const addGroups = async () => {
  //     for (const group of fakeGroups) {
  //       await fireStore.addGroupNote(group);
  //     }
  //   };
  //   const addNotes = async (groupId: string) => {
  //     for (const note of fakeNotes) {
  //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //       await fireStore.addNoteToGroup(note, groupId!);
  //     }
  //   };
  //   const initFakeData = async () => {
  //     await addGroups();
  //     const groups = await fireStore.getGroupNotes();
  //     for (const group of groups) {
  //       await addNotes(group.id!);
  //     }
  //   };
  //   const getResult = async () => {
  //     const result = await fireStore.getGroupNotes();
  //     console.log(result as Group[]);
  //   };

  //   // initFakeData();
  //   // getResult();
  // }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
