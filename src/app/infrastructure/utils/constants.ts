interface Constants {
  readonly DIGIT_REGEX: RegExp;
  initialCopyrightYear: number;
  readonly SYMBOL_REGEX: RegExp;
}

export const CONSTANTS: Constants = {
  DIGIT_REGEX: /[0-9]/,
  initialCopyrightYear: 2021,
  SYMBOL_REGEX: /[-+_!@#$%^&*,.?]/,
};
