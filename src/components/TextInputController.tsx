import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { globalStyles } from '../styles/global';

type objectAny = {
  [index: string]: any;
};

type Props = {
  name: string;
  placeholder?: string;
  specialProps?: (error: FieldError | undefined) => objectAny;
};

const TextInputController = ({ name, placeholder, specialProps }: Props) => {
  const formHandlers = useFormContext();

  const { control } = formHandlers;

  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <>
          <TextInput
            {...specialProps?.(error)}
            placeholder={placeholder}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
          {error && <Text style={globalStyles.textError}>{error.message}</Text>}
        </>
      )}
      name={name}
    />
  );
};

export { TextInputController };
