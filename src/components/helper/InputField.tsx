import React from 'react';
import {TextInput, TextInputProps} from 'react-native';
import theme, {Box, Text} from '../../utils/theme';
import {FieldError, FieldErrorsImpl} from 'react-hook-form';

type InputFieldProps = {
  label: string;
  error?: FieldError | FieldErrorsImpl;
} & TextInputProps;

const InputField = ({placeholder, label, error, ...props}: InputFieldProps) => {
  return (
    <Box flexDirection={'column'} mb={'6'}>
      <Text variant={'textSm'} textTransform={'uppercase'}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        style={{
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderColor: error ? theme.colors.red500 : theme.colors.gray1,
          borderStyle: 'dashed',
          borderWidth: 1,
          borderRadius: theme.borderRadii['rounded-7xl'],
        }}
        {...props}
      />
      {error && (
        <Text mt="3.5" color="rose500">
          {label} is required.!
        </Text>
      )}
    </Box>
  );
};

export default InputField;
