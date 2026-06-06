import React from 'react';
import { View, Modal, Pressable } from 'react-native';
import { PhoneNumberField, PhoneNumberFieldProps } from '../PhoneNumberField';
import { CountrySelector } from '../CountrySelector/CountrySelector';
import { countryCodeList } from '../consts/regions';

interface OpinionatedPhoneNumberFieldProps extends PhoneNumberFieldProps {
  // This component is opinionated and will have the country selector and phone number field styled in a specific way. It will also have some default behavior such as only allowing US and CA country codes. The user can still pass in props to customize the behavior of the phone number field and country selector but the styling and layout will be fixed.
  // I want to make this component as easy to use as possible for common use cases while still allowing for customization when needed.
  underlineButton?: typeof Pressable | null;
  underlineModal?: typeof Modal | null;
}

export function OpinionatedPhoneNumberField({
  underlineButton,
  underlineModal,
  style,
  ...props
}: OpinionatedPhoneNumberFieldProps) {
  // TODO: Create a hook to manage the state of the country selector
  // and phone number field so that the user doesn't have to worry about it
  // when using this component.
  // The hook will handle the logic for updating the phone number field
  // when a country is selected and vice versa.
  // It will also handle any necessary formatting of the phone number
  // based on the selected country.

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: 5,
        },
        style,
      ]}>
      <CountrySelector
        value={null}
        onSelectCountry={props.onInputChange}
        underlineButton={underlineButton}
        underlineModal={underlineModal}
        filtedredCountryCodes={countryCodeList}
      />
      <PhoneNumberField {...props} />
    </View>
  );
}
