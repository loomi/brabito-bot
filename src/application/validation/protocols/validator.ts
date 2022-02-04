export interface Validator {
  validate: (input: Validator.Params) => Validator.Result;
}

export namespace Validator {
  export type Params = any;
  export type Result = boolean;
}
