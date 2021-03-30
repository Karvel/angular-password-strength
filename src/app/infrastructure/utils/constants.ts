interface Constants {
  readonly DIGIT_REGEX: RegExp;
  readonly SYMBOL_REGEX: RegExp;
}

export const CONSTANTS: Constants = {
  DIGIT_REGEX: /[0-9]/,
  SYMBOL_REGEX: /[-+_!@#$%^&*,.?]/,
};
