export interface UuidValidator {
  validate(uuid: UuidValidator.Params): UuidValidator.Result;
}

export namespace UuidValidator {
  export type Params = string;
  export type Result = boolean;
}
