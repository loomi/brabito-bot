export interface BooleanValidator {
  validate(boolean: BooleanValidator.Params): BooleanValidator.Result;
}

export namespace BooleanValidator {
  export type Params = any;
  export type Result = boolean;
}
