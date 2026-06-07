import { useCallback, useEffect, useMemo, useState } from 'react';
import { TextInput } from 'react-native';
import { getLocales } from 'expo-localization';

import { CountryCode, countryCodeList } from './consts/regions';

function getDefaultRegion(filteredCountryCodes: CountryCode[]): CountryCode {
  const localization = getLocales();
  // console.debug('localization', JSON.stringify(localization, null, 2));
  const id = localization?.[0]?.regionCode;
  if (id) {
    const matchedCountry = filteredCountryCodes.find((country) => country.id === id);
    if (matchedCountry) {
      return matchedCountry;
    }
  }
  return filteredCountryCodes[0];
}

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
  const { underlineInput, value, onPress, ...textInputProps } = props;
  const [internalValue, setinternalValue] = useState('');
  const [country, setCountry] = useState<CountryCode | null>(null);

  useEffect(() => {
    console.debug('PhoneNumberField useEffect Firing');
    // onload set the internal value to the prop value if it exists
    if (value) {
      setinternalValue(value);
    }

    // const defaultRegion = getDefaultRegion(filteredCountries);
    // setCountry(defaultRegion);
    // onChangeText(defaultRegion.code); // set the default country code in the input field on load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Input = useMemo(() => {
    if (!underlineInput) {
      console.log('Using default TextInput');
      return TextInput;
    }
    console.log("Using User's input");
    return underlineInput;
  }, [underlineInput]);

  const onChangeText = useCallback(
    (_value: string) => {
      const cleanedValue = _value.replace('+', ''); // remove non-digit characters

      // parse the country code from the phone number and set the country state
      let matchedCountry = null;
      // matchedCountry = filteredCountryCodes.find(({ code }) => {
      //   // intentional to use _value here instead of cleanedValue because we want to match against the raw input value that includes the '+' sign and any formatting characters, since country codes are typically prefixed with a '+' and may be followed by formatting characters like dashes or parentheses. Using cleanedValue would remove these characters and could lead to incorrect matching of country codes.
      //   const result = _value.startsWith(code);
      //   // console.debug(
      //   //   'checking code',
      //   //   code,
      //   //   'against cleanedValue',
      //   //   cleanedValue,
      //   //   'result',
      //   //   result
      //   // );
      //   return result;
      // });
      console.log('matchedCountry', matchedCountry);
      setCountry(matchedCountry || null);

      if (!!matchedCountry && cleanedValue.length >= 2) {
        // apply masking to the phone number based on the matched country code
        console.debug('---------------');
        const countryCode = matchedCountry?.code.replace('+', '');
        const mask = matchedCountry.mask;

        console.debug('mask', mask, '\n');

        const justDigits = cleanedValue.replace(/\D/g, '');
        const restOfNumber = justDigits.slice(countryCode.length, justDigits.length);
        let digitIndex = 0;
        let maskedPart = '';

        for (const char of mask) {
          console.debug(
            'char',
            char,
            'digitIndex',
            digitIndex,
            'restOfNumber',
            restOfNumber,
            'restOfNumber[digitIndex]',
            restOfNumber[digitIndex],
            'Output',
            maskedPart
          );

          if (digitIndex >= restOfNumber.length) break;
          if (char === '#') {
            maskedPart += restOfNumber[digitIndex++];
          } else {
            maskedPart += char;
          }
        }
        console.debug('---------------');
        const output = countryCode + maskedPart;
        const ouputWthOutMask = output.replace(/\D/g, '');
        console.debug(output, ouputWthOutMask);
        setinternalValue(output);
        if (textInputProps?.onInputChange) {
          const correctLength = (matchedCountry.code + matchedCountry.mask).length;
          textInputProps?.onInputChange({
            countryDetails: matchedCountry || null,
            phoneNumber: ouputWthOutMask,
            isValid: !!matchedCountry && cleanedValue.length + 1 === correctLength,
            correctLength,
          });
        }
      } else {
        setinternalValue(cleanedValue);
        if (textInputProps?.onInputChange) {
          const correctLength = ((matchedCountry?.code ?? '') + (matchedCountry?.mask ?? ''))
            .length;
          textInputProps.onInputChange({
            countryDetails: matchedCountry || null,
            phoneNumber: cleanedValue,
            isValid: !!matchedCountry && cleanedValue.length + 1 === correctLength,
            correctLength,
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textInputProps.onChangeText, setinternalValue]
  );
  return (
    <>
      <Input
        {...textInputProps}
        placeholder={country?.mask.replace('#', '_')}
        value={'+' + internalValue}
        onChangeText={onChangeText}
      />
    </>
  );
}
