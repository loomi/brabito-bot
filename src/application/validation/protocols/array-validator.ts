export interface ArrayValidator {
  validate(params: ArrayValidator.Params): ArrayValidator.Result;
}

export namespace ArrayValidator {
  export type Params = any;
  export type Result = boolean;
}
