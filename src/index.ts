import { identityRegex } from "./data/bi";
import { emailRegexPatterns } from "./data/email";
import { ibanRegexPatterns } from "./data/iban";
import { passportRegexList } from "./data/passport";
import { phoneRegexList } from "./data/phone";
import { Country } from "./types/country";
import { EmailProvider } from "./types/email";
import { PhoneCountryCode } from "./types/phone";

type Props = {
  input: string;
  country?: Country;
  provider?: EmailProvider;
  phoneCountryCode?: PhoneCountryCode;
};

export const validate = async (
  validations: {
    fn: (props: Props) => { message: string; value: string };
    input: string;
    country?: Country;
    provider?: EmailProvider;
    phoneCountryCode?: PhoneCountryCode;
  }[]
) => {
  const results = await Promise.allSettled(
    validations.map(
      ({ fn, input, country, provider, phoneCountryCode }) =>
        new Promise((resolve, reject) => {
          try {
            resolve(fn({ input, country, provider, phoneCountryCode }));
          } catch (error) {
            reject(error);
          }
        })
    )
  );

  const errors = results.filter((r) => r.status === "rejected").map((r) => (r as PromiseRejectedResult).reason);

  return errors.length > 0
    ? Promise.reject(errors)
    : Promise.resolve(results.map((r) => (r as PromiseFulfilledResult<{ message: string; value: string }>).value));
};

export const validateEmail = ({ input, provider }: Props) => {
  const identity = emailRegexPatterns.find((e) => e.provider === provider);

  if (!identity) {
    throw { message: `${provider} not supported`, value: input };
  }

  if (identity.regex.test(input)) {
    return { message: `Valid ${provider}`, value: input };
  }

  throw { message: `Invalid ${provider}`, value: input };
};

export const validateIdentityCard = ({ input, country }: Props) => {
  const identity = identityRegex.find((e) => e.country === country);

  if (!identity) {
    throw { message: "Country not supported", value: input };
  }

  if (identity.regex.test(input)) {
    return { message: "Valid identity card", value: input };
  }

  throw { message: "Invalid identity card", value: input };
};

export const validateIban = ({ input, country }: Props) => {
  const identity = ibanRegexPatterns.find((e) => e.country === country);

  if (!identity) {
    throw { message: "Country not supported", value: input };
  }

  if (identity.regex.test(input)) {
    return { message: "Valid IBAN", value: input };
  }

  throw { message: "Invalid IBAN", value: input };
};

export const validatePassort = ({ input, country }: Props) => {
  const identity = passportRegexList.find((e) => e.country === country);

  if (!identity) {
    throw { message: "Country not supported", value: input };
  }

  if (identity.regex.test(input)) {
    return { message: "Valid Passport", value: input };
  }

  throw { message: "Invalid Passport", value: input };
};

export const validatePhoneCountryCode = ({ input, phoneCountryCode }: Props) => {
  const identity = phoneRegexList.find((e) => e.country === phoneCountryCode);

  if (!identity) {
    throw { message: "Phone country code not supported", value: input };
  }

  if (identity.regex.test(input)) {
    return { message: "Valid phone country code", value: input };
  }

  throw { message: "Invalid phone country code", value: input };
};
