import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { GetGroupsReturn, Group, Note } from '../models';
import { firebaseAuth } from './';

const CollectionName = {
  NOTES: 'notes',
  CREATE_AT: 'createAt',
};

const fireStore = {
  async getGroupNotes() {
    // this function only run for fake DATA, dont use it
    const uid = firebaseAuth.getUid();
    if (uid) {
      const result = await firestore()
        .collection(uid)
        .orderBy(CollectionName.CREATE_AT, 'desc')
        .limit(20)
        .get();

      return result.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Group[];
    }
    return [];
  },
  async getTotalGroups() {
    const uid = firebaseAuth.getUid();
    if (uid) {
      const result = await firestore().collection(uid).get();
      return result.docs.length;
    }
    return 0;
  },
  async getGroups(
    lastGroupVisible?: FirebaseFirestoreTypes.QueryDocumentSnapshot
  ): Promise<GetGroupsReturn> {
    const uid = firebaseAuth.getUid();
    if (uid) {
      let result;
      if (lastGroupVisible) {
        result = await firestore()
          .collection(uid)
          .orderBy(CollectionName.CREATE_AT, 'desc')
          .startAfter(lastGroupVisible)
          .limit(6)
          .get();
      } else {
        result = await firestore()
          .collection(uid)
          .orderBy(CollectionName.CREATE_AT, 'desc')
          .limit(6)
          .get();
      }
      const newLastGroupVisible = result.docs[result.docs.length - 1];
      const groups = result.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Group[];
      return {
        lastGroupVisible: newLastGroupVisible,
        groups,
      };
    }

    return {
      groups: [],
      lastGroupVisible: undefined,
    };
  },
  async addGroupNote(group: Group) {
    const uid = firebaseAuth.getUid();
    if (uid) {
      if (!group.createAt) {
        group.createAt = firestore.Timestamp.now();
      }
      await firestore().collection(uid).add(group);
    }
  },
  async deleteGroup(groupId: string) {
    const uid = firebaseAuth.getUid();
    if (uid) {
      await firestore().collection(uid).doc(groupId).delete();
    }
  },
  async updateGroup(group: Group) {
    const uid = firebaseAuth.getUid();
    if (uid) {
      const updateInfo: Group = {
        title: group.title,
        desc: group.desc,
        createAt: firestore.Timestamp.now(),
      };
      await firestore().collection(uid).doc(group.id).update(updateInfo);
      return {
        ...updateInfo,
        id: group.id,
      };
    }
  },
  async addNoteToGroup(note: Note, groupId: string) {
    const uid = firebaseAuth.getUid();
    if (uid) {
      if (note.id) {
        await firestore()
          .collection(uid)
          .doc(groupId)
          .collection(CollectionName.NOTES)
          .doc(note.id)
          .set({
            title: note.title,
            desc: note.desc,
            image: note.image,
            createAt: new Date(),
          });
      } else {
        await firestore()
          .collection(uid)
          .doc(groupId)
          .collection(CollectionName.NOTES)
          .add({
            ...note,
            createAt: new Date(),
          });
      }
    }
  },
  async deleteNoteToGroup(noteId: string, groupId: string) {
    const uid = firebaseAuth.getUid();
    if (uid) {
      await firestore()
        .collection(uid)
        .doc(groupId)
        .collection(CollectionName.NOTES)
        .doc(noteId)
        .delete();
    }
  },
  // TODO delete note out of group (noteId, groupId)
};

export { fireStore };
