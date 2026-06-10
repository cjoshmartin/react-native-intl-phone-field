import React, { memo, useMemo } from 'react';
import { KEYBOARD_LAYOUT, KEYPAD_KEY } from '../consts/KEYBOARD_LAYOUT';
import KeypadRow from './KeypadRow';
import { Pressable, View, StyleSheet, Dimensions } from 'react-native';
import { Portal } from 'react-native-teleport';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export interface KeyboardProps {
  onKeyPress: (_value: KEYPAD_KEY) => void;
}

function Keyboard(props: KeyboardProps) {
  const isOpen = useSharedValue(true);
  const height = useSharedValue(0);
  const progress = useDerivedValue(() => withTiming(isOpen.value ? 0 : 1, { duration: 250 }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * 2 * height.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value ? 1 : withDelay(250, withTiming(-1, { duration: 0 })),
  }));

  const layout = useMemo(() => {
    console.log('--Rerender Keyboard--');
    return KEYBOARD_LAYOUT.map((row, i) => {
      return <KeypadRow row={row} key={'row-' + i} onPress={props.onKeyPress} />;
    });
  }, [props.onKeyPress]);

  const { height: screenHeight } = Dimensions.get('window');

  return (
    <Portal hostName="ipad-keyboard">
      {/*<Pressable
        style={[StyleSheet.absoluteFillObject, { zIndex: 0 }]}
        onPress={() => (isOpen.value = false)}
      />*/}

      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[sheetStyles.sheet, { height: screenHeight / 2.5 }, sheetStyle, backdropStyle]}>
        <View
        // className="flex-1 pb-14 px-4 bg-gray-200"
        >
          {/*<KeyboardToolbar isOpen={isOpen} />*/}
          <View style={{ flex: 1 }}>{layout}</View>
        </View>
      </Animated.View>
    </Portal>
  );
}

export default memo(Keyboard);

const sheetStyles = StyleSheet.create({
  sheet: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 3,
    gap: 12,
  },
});
