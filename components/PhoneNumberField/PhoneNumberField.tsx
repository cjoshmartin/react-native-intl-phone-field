import { useCallback, useEffect, useMemo, useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

import { CountryCode, countryCodeList } from './consts/regions';

// props to this compoent
// whitelist of country codes of what is allowed to be entered in the phone number field. default is null
// blacklist of countries that shouldn't appear in the list. default is null
// underlining of the input field. default is false
export interface PhoneNumberFieldProps extends React.ComponentProps<typeof TextInput> {
  allowedCountryCodes?: string[] | null;
  disallowedCountryCodes?: string[] | null;
  underlineInput?: React.ReactNode | null;
}

export default function PhoneNumberField(props: PhoneNumberFieldProps) {
  const { allowedCountryCodes, disallowedCountryCodes, underlineInput, value, ...textInputProps } =
    props;
  const [internalValue, setinternalValue] = useState('');
  const [country, setCountry] = useState<CountryCode | null>(null);

  useEffect(() => {
    // onload set the internal value to the prop value if it exists
    if (value) {
      setinternalValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Input = useMemo(() => {
    if (!underlineInput) {
      return TextInput;
    }
    return underlineInput;
  }, [underlineInput]);

  const filteredCountryCodes = useMemo(() => {
    return (
      countryCodeList
        .filter(({ id }) => {
          if (allowedCountryCodes && !allowedCountryCodes.includes(id)) {
            return false;
          }
          if (disallowedCountryCodes && disallowedCountryCodes.includes(id)) {
            return false;
          }
          return true;
        })
        // sort by longer country codes first to ensure that we match the most specific country code when parsing the phone number
        .sort((a, b) => b.code.length - a.code.length)
    );
  }, [allowedCountryCodes, disallowedCountryCodes]);

  const onChangeText = useCallback(
    (_value: string) => {
      const cleanedValue = _value.replace(/\D/g, ''); // remove non-digit characters
      console.log('cleanedValue', cleanedValue);
      setinternalValue(cleanedValue);
      textInputProps.onChangeText?.(cleanedValue);

      // parse the country code from the phone number and set the country state
      if (cleanedValue.length < 4){
        const matchedCountry = filteredCountryCodes.find(({ code }) => {
          // intentional to use _value here instead of cleanedValue because we want to match against the raw input value that includes the '+' sign and any formatting characters, since country codes are typically prefixed with a '+' and may be followed by formatting characters like dashes or parentheses. Using cleanedValue would remove these characters and could lead to incorrect matching of country codes.
          const result = _value.startsWith(code);
          console.log('checking code', code, 'against cleanedValue', cleanedValue, 'result', result);
          return result;
        });
        console.log('matchedCountry', matchedCountry);
        setCountry(matchedCountry || null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textInputProps.onChangeText, setinternalValue, filteredCountryCodes]
  );

  return (
    <View>
      <Input
        {...textInputProps}
        style={styles.input}
        placeholder="+1-(317)-652-8413"
        value={'+' + internalValue}
        onChangeText={onChangeText}
      />

      <View>
        {country ? (
          <View>
            <Text>Country: {country.name}</Text>
            <Text>Country Code: {country.code}</Text>
            <Text>Flag: {country.flag}</Text>
          </View>
        ) : (
          <Text>No country matched</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
