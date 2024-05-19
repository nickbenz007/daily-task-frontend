import React from 'react';
import {GestureResponderEvent, Pressable} from 'react-native';
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
    <Pressable onLongPress={onLongPress} disabled={disabled} onPress={onPress}>
      <Box
        backgroundColor={disabled ? 'gray200' : 'white'}
        width={250}
        alignItems={'center'}
        borderWidth={1}
        borderStyle={'dashed'}
        borderRadius={'rounded-7xl'}
        px={'5'}
        py={'3'}>
        <Text
          variant={'textSm'}
          color={'black'}
          textTransform={uppercase ? 'uppercase' : 'none'}
          fontWeight={'500'}
          textAlign={'center'}>
          {label ? label : ''}
        </Text>
      </Box>
    </Pressable>
  );
};

export default PressableView;
