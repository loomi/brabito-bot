export interface PhoneValidator {
  validate(phone: PhoneValidator.Params): PhoneValidator.Result;
}

export namespace PhoneValidator {
  export type Params = string;
  export type Result = boolean;
}
