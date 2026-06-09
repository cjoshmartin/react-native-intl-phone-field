import { memo, useCallback } from 'react';
import { KEYPAD_KEY } from '../consts/KEYBOARD_LAYOUT';
import KeypadButtonContainer from './KeypadButtonContainer';
import { Text } from 'react-native';

export interface KeypadButtonProps {
  currentKey: KEYPAD_KEY;
  onPress: (_key: KEYPAD_KEY) => void;
}

function KeypadButton({ currentKey, onPress }: KeypadButtonProps) {
  const handlePress = useCallback(() => onPress(currentKey), [onPress, currentKey]);

  return (
    <KeypadButtonContainer onPress={handlePress}>
      <Text style={{}}>
        {currentKey.main}
      </Text>
      {(currentKey?.subtext ?? '').length > 0 && <Text>{currentKey.subtext}</Text>}
    </KeypadButtonContainer>
  );
}

export { KeypadButton };
export default memo(KeypadButton);
