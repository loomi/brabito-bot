export interface NumberValidator {
  validate(number: NumberValidator.Params): NumberValidator.Result;
}

export namespace NumberValidator {
  export type Params = any;
  export type Result = boolean;
}
