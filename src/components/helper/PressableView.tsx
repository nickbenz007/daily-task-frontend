import React from 'react';
import {GestureResponderEvent, TouchableOpacity} from 'react-native';
import {Box, Text} from '../../utils/theme';

type PressableViewProps = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  uppercase?: boolean;
};

const PressableView = ({
  uppercase,
  onPress,
  label,
  onLongPress,
  disabled,
}: PressableViewProps) => {
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      disabled={disabled}
      onPress={onPress}>
      <Box
        backgroundColor={disabled ? 'gray200' : 'white'}
        width={250}
        alignItems={'center'}
        borderWidth={3}
        borderStyle={'dotted'}
        borderRadius={'rounded-7xl'}
        elevation={5}
        shadowOffset={{width: 0, height: 2}}
        shadowOpacity={0.25}
        shadowRadius={3.84}
        shadowColor={'gray500'}
        px={'5'}
        py={'3'}>
        <Text
          variant={'textSm'}
          color={'black'}
          textTransform={uppercase ? 'uppercase' : 'none'}
          fontWeight={'800'}
          textAlign={'center'}>
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default PressableView;
