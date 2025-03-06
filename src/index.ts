export const validate = async (
  validations: { fn: (input: string) => { message: string; value: string }; input: string }[]
) => {
  const results = await Promise.allSettled(
    validations.map(
      ({ fn, input }) =>
        new Promise((resolve, reject) => {
          try {
            resolve(fn(input));
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

export const IsEmail = (email: string) => {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (regex.test(email)) return { message: "Valid email", value: email };
  throw { message: "Invalid email", value: email };
};

export const IsBi = (bi: string) => {
  let regex = /^\d{9}[A-Z]{2}\d{3}$/;
  if (regex.test(bi)) return { message: "Valid identity card", value: bi };
  throw { message: "Invalid identity card", value: bi };
};

export const IsIban = (iban: string) => {
  let regex = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/;
  if (regex.test(iban)) return { message: "Valid Iban", value: iban };
  throw { message: "Invalid Iban", value: iban };
};

export const IsPassport = (passport: string) => {
  let regex = /^[A-Z]{1,2}[0-9]{6,9}$/;
  if (regex.test(passport)) return { message: "Valid passport", value: passport };
  throw { message: "Invalid passport", value: passport };
};
