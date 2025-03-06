# 🚀 validate-kaike-js

A modern and lightweight library for validating **emails, identity cards (ID), IBANs, passports, and phone numbers**. ✅

## 📦 Installation

Install the library using your favorite package manager:

```sh
# Using npm
npm install validate-kaike-js

# Using yarn
yarn add validate-kaike-js

# Using pnpm
pnpm add validate-kaike-js
```

## 🚀 How to Use

The `validate` function **must always be used** for both single and multiple validations, ensuring consistency and simplicity in implementation.

### 🎯 Single Validation

```ts
import {
  validate,
  validateEmail,
  validateIdentityCard,
  validateIban,
  validatePassport,
  validatePhoneCountryCode,
} from "validate-kaike-js";

validate([{ fn: validateEmail, input: "test@email.com", provider: "GMAIL" }])
  .then(console.log)
  .catch(console.error);

validate([{ fn: validateIdentityCard, input: "123456789LA001", country: "AO" }])
  .then(console.log)
  .catch(console.error);
```

If the input is invalid, an error will be thrown:

```ts
validate([{ fn: validateEmail, input: "invalid_email", provider: "GMAIL" }]).catch(console.error);
```

Output:

```ts
[{ message: "Invalid email", value: "invalid_email" }];
```

---

### 🔄 Multiple Validation

Validate multiple inputs simultaneously with `validate()`:

```ts
validate([
  { fn: validateEmail, input: "test@email.com", provider: "GMAIL" },
  { fn: validateIdentityCard, input: "123456789LA001", country: "AO" },
  { fn: validateIban, input: "AO06123456789012345678901", country: "AO" },
  { fn: validatePassport, input: "A1234567", country: "US" },
  { fn: validatePhoneCountryCode, input: "+244923456789", phoneCountryCode: "+244" },
])
  .then(console.log)
  .catch(console.error);
```

✅ **If all validations pass**, the return will be an array with the results:

```ts
[
  { message: "Valid email", value: "test@email.com" },
  { message: "Valid identity card", value: "123456789LA001" },
  { message: "Valid IBAN", value: "AO06123456789012345678901" },
  { message: "Valid Passport", value: "A1234567" },
  { message: "Valid phone country code", value: "+244923456789" },
];
```

❌ **If any validation fails**, `validate` rejects the promise with an array of errors:

```ts
validate([{ fn: validateEmail, input: "invalid_email", provider: "GMAIL" }]).catch(console.error);
```

Output:

```ts
[{ message: "Invalid email", value: "invalid_email" }];
```

---

## 📜 Available Methods

| Method                     | Validates          | Valid Example               | Invalid Example | Additional Argument                       |
| -------------------------- | ------------------ | --------------------------- | --------------- | ----------------------------------------- |
| `validateEmail`            | Email              | `test@email.com`            | `invalid_email` | `provider` (only for this method)         |
| `validateIdentityCard`     | Identity card      | `123456789LA001`            | `12345ABC`      | `country` (only for this method)          |
| `validateIban`             | IBAN               | `AO06123456789012345678901` | `123456`        | `country` (only for this method)          |
| `validatePassport`         | Passport           | `A1234567`                  | `XYZ12`         | `country` (only for this method)          |
| `validatePhoneCountryCode` | Phone country code | `+244923456789`             | `+000000000000` | `phoneCountryCode` (only for this method) |

---

## 🎓 License

MIT © 2025 - [Kaike Bartolomeu](https://github.com/kaike2003)
