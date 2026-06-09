import { memo, useMemo } from 'react';
import { KEYBOARD_LAYOUT, KEYPAD_KEY } from '../consts/KEYBOARD_LAYOUT';
import KeypadRow from './KeypadRow';
import { View } from 'react-native';

export interface KeyboardProps {
  onKeyPress: (_value: KEYPAD_KEY) => void;
}

function Keyboard(props: KeyboardProps) {
  const layout = useMemo(() => {
    console.log('--Rerender Keyboard--');
    return KEYBOARD_LAYOUT.map((row, i) => {
      return <KeypadRow row={row} key={'row-' + i} onPress={props.onKeyPress} />;
    });
  }, [props.onKeyPress]);

  return (
    <View
      style={{
        height: 300,
      }}>
      {layout}
    </View>
  );
}

export default memo(Keyboard);
