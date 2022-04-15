import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FieldError, FormProvider, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TextInputController } from '.';
import { noteSchema } from '../constants/yupGlobal';
import { Note } from '../models';
import { ApplicationState, onAddNote, onUpdateNote } from '../store';
import { globalStyles } from '../styles/global';

type Props = { note?: Note; callback?: () => void };

const EditAddNote = (props: Props) => {
  const { note, callback } = props;
  const groupId =
    useSelector((state: ApplicationState) => state.group.selectedGroup?.id) ?? '';
  const dispatch = useDispatch();

  const defaultValues: Note = note
    ? {
        title: note.title,
        desc: note.desc,
        image: note.image,
      }
    : {
        title: '',
        desc: '',
        image:
          'https://firebasestorage.googleapis.com/v0/b/note-app-training-8f8e4.appspot.com/o/no-image.png?alt=media&token=0488d482-8a4a-4635-898b-2e80d51fc370',
      };

  const formHanlers = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(noteSchema),
  });

  const handleSubmit = (data: Note) => {
    if (note) {
      dispatch(onUpdateNote({ note: { ...data, id: note.id }, groupId }));
    } else {
      dispatch(onAddNote({ note: data, groupId }));
      formHanlers.reset(defaultValues);
    }
    callback?.();
  };

  return (
    <SafeAreaView>
      <FormProvider {...formHanlers}>
        <TextInputController
          specialProps={(error: FieldError | undefined) => ({
            autoCapitalize: 'none',
            style: error
              ? [globalStyles.input, globalStyles.inputError]
              : globalStyles.input,
          })}
          name="title"
          placeholder="Group title"
        />

        <TextInputController
          specialProps={(error: FieldError | undefined) => ({
            autoCapitalize: 'none',
            style: error
              ? [globalStyles.input, globalStyles.inputError, { height: 100 }]
              : [globalStyles.input, { height: 100 }],
            multiline: true,
          })}
          name="desc"
          placeholder="Group description"
        />

        <TextInputController
          specialProps={(error: FieldError | undefined) => ({
            autoCapitalize: 'none',
            style: error
              ? [
                  globalStyles.input,
                  globalStyles.inputError,
                  { height: 100, marginTop: 40 },
                ]
              : [globalStyles.input, { height: 100, marginTop: 40 }],
            multiline: true,
            editable: false,
          })}
          name="image"
          placeholder="Group description"
        />

        <TouchableOpacity onPress={formHanlers.handleSubmit(handleSubmit)}>
          <Text style={[globalStyles.btn, globalStyles.btnPrimary, styles.btn]}>
            {note ? 'Update' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </FormProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: {
    textAlign: 'right',
    marginLeft: 'auto',
    marginTop: 12,
  },
});

export { EditAddNote };
