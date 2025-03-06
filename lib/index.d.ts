export declare const validate: (validations: {
    fn: (input: string) => {
        message: string;
        value: string;
    };
    input: string;
}[]) => Promise<{
    message: string;
    value: string;
}[]>;
export declare const IsEmail: (email: string) => {
    message: string;
    value: string;
};
export declare const IsBi: (bi: string) => {
    message: string;
    value: string;
};
export declare const IsIban: (iban: string) => {
    message: string;
    value: string;
};
export declare const IsPassport: (passport: string) => {
    message: string;
    value: string;
};
