// Opinionated all-in-one component
export { PhoneCountryInput } from './PhoneCountryInput/PhoneCountryInput';
export type { PhoneCountryInputProps } from './PhoneCountryInput/PhoneCountryInput';

// Individual pieces
export { PhoneNumberField } from './PhoneNumberField';
export type { PhoneNumberFieldProps, PhoneFieldOutcome } from './PhoneNumberField';

export { CountrySelector } from './CountrySelector/CountrySelector';
export type { CountrySelectorProps } from './CountrySelector/CountrySelector';

export { CountrySelectorModal } from './CountrySelector/CountrySelectorModal';
export type { CountrySelectorModalProps } from './CountrySelector/CountrySelectorModal';

export { default as Keyboard } from './Keyboard/Keyboard';
export type { KeyboardProps, PasteErrorModalProps, CopySuccessModalProps } from './Keyboard/Keyboard';

// State management hook
export { usePhoneFieldState } from './hooks/UsePhoneFieldState';
export type {
  usePhoneFieldStateParams,
  usePhoneFieldStateReturn,
} from './hooks/UsePhoneFieldState';

// Types for advanced users
export type { CountryCode } from './consts/regions';
export { CountryId } from './enum/CountryIds';
