import { getLocales } from 'expo-localization';
import { CountryCode } from '../consts/regions';

export function getDefaultRegion(filteredCountryCodes: CountryCode[]): CountryCode {
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
