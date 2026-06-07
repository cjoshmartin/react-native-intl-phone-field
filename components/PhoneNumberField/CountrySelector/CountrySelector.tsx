import { useEffect, useMemo, useState } from 'react';
import { CountryCode } from '../consts/regions';
import { Modal, Pressable, Text } from 'react-native';

// button for opening the country selector modal
interface CountrySelectorButtonProps extends React.ComponentProps<typeof Pressable> {
  value: CountryCode | null;
  underlineButton?: typeof Pressable | null;
  isOpen?: boolean;
}

//

function CountrySelectorButton(props: CountrySelectorButtonProps) {
  const Button = useMemo(() => {
    if (props.underlineButton) {
      console.debug('Using custom button for CountrySelectorButton');
      return props.underlineButton;
    }
    console.debug('Using default Pressable for CountrySelectorButton');
    return Pressable;
  }, [props.underlineButton]);
  return (
    // This could be a simple button that, when pressed, opens the country selector modal
    <Button {...props}>
      <Text>{props.value ? props.value.flag : '🏴‍☠️'}</Text>
      {/*chevron down icon */}
      <Text>{props.isOpen ? '▲' : '▼'}</Text>
    </Button>
  );
}

interface CountrySelectorModalProps extends React.ComponentProps<typeof Modal> {
  underlineModal?: typeof Modal | null;
  value: CountryCode | null;
  filtredCountryCodes?: CountryCode[] | null;
  onSelectCountry: (country: CountryCode) => void;
}

function CountrySelectorModal(props: CountrySelectorModalProps) {
  // This would be the modal that shows the list of countries to select from

  const UserModal = useMemo(() => {
    if (props.underlineModal) {
      return props.underlineModal;
    }
    return undefined;
  }, [props.underlineModal]);

  if (UserModal) {
    return <UserModal {...props} />;
  }
  return (
    <Modal {...props}>
      <Text>Country Selector Modal</Text>
    </Modal>
  );
}

export interface CountrySelectorProps extends React.ComponentProps<typeof CountrySelectorButton> {
  filtedredCountryCodes?: CountryCode[] | null;
  onSelectCountry?: (country: CountryCode) => void;
  value: CountryCode | null;
  underlineButton?: typeof Pressable | null;
  underlineModal?: typeof Modal | null;
}
export function CountrySelector(props: CountrySelectorProps) {
  // Implementation for CountrySelector component
  const [internalValue, setInternalValue] = useState(props.value);
  const [isOpen, setIsOpen] = useState(false);
  const { filtedredCountryCodes, onSelectCountry } = props;

  useEffect(() => {
    // Update internal value when prop value changes
    setInternalValue(props.value);
  }, [props.value]);

  return (
    // Render the country selector UI here
    // This could include a button to open a modal with the list of countries, and the logic to handle selection
    <>
      <CountrySelectorButton
        {...props}
        underlineButton={props.underlineButton}
        value={internalValue}
        isOpen={isOpen}
        onPress={() => setIsOpen((prev) => !prev)}
      />
      {/*<CountrySelectorModal
        value={internalValue}
        onSelectCountry={onSelectCountry}
        filtredCountryCodes={filtedredCountryCodes}
      />*/}
    </>
  );
}
