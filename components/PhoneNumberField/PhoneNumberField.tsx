import { useMemo, useRef } from 'react';
import { TextInput } from 'react-native';

import { CountryCode } from './consts/regions';
import { useSharedValue } from 'react-native-reanimated';
import { KEYPAD_KEY } from './consts/KEYBOARD_LAYOUT';

export interface onPressReturn {
  countryDetails: CountryCode | null;
  phoneNumber: string;
  isValid: boolean;
  correctLength: number;
}

// props to this compoent
// whitelist of country codes of what is allowed to be entered in the phone number field. default is null
// blacklist of countries that shouldn't appear in the list. default is null
// underlining of the input field. default is false
export interface PhoneNumberFieldProps extends React.ComponentProps<typeof TextInput> {
  underlineInput?: typeof TextInput | React.ReactNode | null;
  onInputChange?: (outcome: onPressReturn) => void;
}

export function PhoneNumberField(props: PhoneNumberFieldProps) {
  const { underlineInput, ...textInputProps } = props;
  const isOpen = useSharedValue(false);
  const selectionRef = useRef({ start: 0, end: 0 });

  const Input = useMemo(() => {
    if (!underlineInput) {
      return TextInput;
    }
    return underlineInput;
  }, [underlineInput]);

  return (
    <Input
      {...textInputProps}
      value={'+' + props.value}
      showSoftInputOnFocus={false}
      onPressIn={() => (isOpen.value = true)}
      onSelectionChange={(e) => (selectionRef.current = e.nativeEvent.selection)}
    />
  );
}
