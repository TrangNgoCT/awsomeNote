import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FieldError, FormProvider, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { groupSchema } from '../constants/yupGlobal';
import { Group } from '../models';
import { onAddGroup, onUpdateGroup } from '../store';
import { globalStyles } from '../styles/global';
import { TextInputController } from './TextInputController';

type Props = { group?: Group; callback?: () => void };

const EditAddGroup = (props: Props) => {
  const { group, callback } = props;
  const dispatch = useDispatch();

  const defaultValues: Group = group
    ? {
        title: group.title,
        desc: group.desc,
      }
    : {
        title: '',
        desc: '',
      };

  const formHanlers = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(groupSchema),
  });

  const handleSubmit = (data: Group) => {
    if (group) {
      dispatch(onUpdateGroup({ group: { ...data, id: group.id } }));
    } else {
      dispatch(onAddGroup({ group: data }));
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

        <TouchableOpacity onPress={formHanlers.handleSubmit(handleSubmit)}>
          <Text style={[globalStyles.btn, globalStyles.btnPrimary, styles.btn]}>
            {group ? 'Update' : 'Submit'}
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

export { EditAddGroup };
