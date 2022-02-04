export interface RgValidator {
  validate(rg: RgValidator.Params): RgValidator.Result;
}

export namespace RgValidator {
  export type Params = string;
  export type Result = boolean;
}
