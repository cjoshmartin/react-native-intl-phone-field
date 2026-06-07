import { useEffect, useMemo, useState } from 'react';
import { CountryCode } from '../consts/regions';
import { CountryId } from '../enum/CountryIds';
import { generateCountryCodeList } from '../utils/generateCountryCodeList';
import { getDefaultRegion } from '../utils/getDefaultRegion';
import { onPressReturn } from '../PhoneNumberField';

interface usePhoneFieldStateParams {
  allowedCountryCodes?: CountryId[] | null;
  disallowedCountryCodes?: CountryId[] | null;
}

interface usePhoneFieldStateReturn {
  country?: CountryCode;
  filteredCountryCodes?: CountryCode[];
}

export function usePhoneFieldState({
  allowedCountryCodes,
  disallowedCountryCodes,
}: usePhoneFieldStateParams): usePhoneFieldStateReturn {
  const [country, setCountry] = useState<CountryCode | undefined>(undefined);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<onPressReturn | undefined>(undefined);
  const filteredCountryCodes = useMemo(
    () =>
      !!allowedCountryCodes && !!disallowedCountryCodes
        ? generateCountryCodeList(allowedCountryCodes, disallowedCountryCodes)
        : [],
    [allowedCountryCodes, disallowedCountryCodes]
  );

  useEffect(() => {
    const defaultRegion = getDefaultRegion(filteredCountryCodes);
    setCountry(defaultRegion);

    //for now:
    setPhoneNumber(defaultRegion?.code);
    // onChangeText(defaultRegion.code); // set the default country code in the input field on load
  }, [filteredCountryCodes]);

  return {
    country,
    filteredCountryCodes,
  };
}
